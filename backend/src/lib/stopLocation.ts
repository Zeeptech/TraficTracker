import { readFileSync } from "node:fs";
import type { LocatedStop, Stop } from "@trafictracker/shared/Stop";

const dataUrl = (file: string) =>
  new URL(`../../data/${file}`, import.meta.url);

type Ring = [number, number][];
type Polygon = Ring[];
type Municipality = { code: string; name: string; polygons: Polygon[] };
type Place = [
  name: string,
  lat: number,
  lon: number,
  municipalityCode: string | null,
];

const municipalities: Municipality[] = JSON.parse(
  readFileSync(dataUrl("municipalities.geojson"), "utf8"),
).features.map(
  (f: {
    properties: { code: string; name: string };
    geometry: { type: string; coordinates: Polygon | Polygon[] };
  }) => ({
    code: f.properties.code,
    name: f.properties.name,
    polygons:
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates as Polygon]
        : (f.geometry.coordinates as Polygon[]),
  }),
);

const municipalityByCode = new Map(municipalities.map((m) => [m.code, m.name]));

const places: Place[] = JSON.parse(
  readFileSync(dataUrl("places.json"), "utf8"),
);

function inRing(lon: number, lat: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    ) {
      inside = !inside;
    }
  }
  return inside;
}

function inPolygon(
  lon: number,
  lat: number,
  [outer, ...holes]: Polygon,
): boolean {
  return (
    inRing(lon, lat, outer) && !holes.some((hole) => inRing(lon, lat, hole))
  );
}

function findNearestPlace(lat: number, lon: number): Place | null {
  const cosLat = Math.cos((lat * Math.PI) / 180);
  let nearest: Place | null = null;
  let best = Number.POSITIVE_INFINITY;
  for (const place of places) {
    const dLat = place[1] - lat;
    const dLon = (place[2] - lon) * cosLat;
    const d = dLat * dLat + dLon * dLon;
    if (d < best) {
      best = d;
      nearest = place;
    }
  }
  return nearest;
}

export function locateStop({ lat, lon, ...stop }: Stop): LocatedStop {
  const nearestPlace = findNearestPlace(lat, lon);
  const municipality =
    municipalities.find((m) => m.polygons.some((p) => inPolygon(lon, lat, p)))
      ?.name ??
    (nearestPlace?.[3] ? municipalityByCode.get(nearestPlace[3]) : undefined);

  return {
    ...stop,
    city: municipality ?? null,
    village: nearestPlace?.[0] ?? null,
  };
}
