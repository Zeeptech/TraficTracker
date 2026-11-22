import type { StopGroup } from "@trafictracker/shared/StopGroup";

const DUPLICATE_DISTANCE_METERS = 1000;

function distanceMeters(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const h =
    Math.sin(toRad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(toRad(b.lon - a.lon) / 2) ** 2;
  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
}

function areDuplicates(a: StopGroup, b: StopGroup): boolean {
  return (
    a.name === b.name &&
    a.stops.some((sa) =>
      b.stops.some((sb) => distanceMeters(sa, sb) <= DUPLICATE_DISTANCE_METERS),
    )
  );
}

export function dedupeStopGroups(groups: StopGroup[]): StopGroup[] {
  const busiestFirst = [...groups].sort(
    (a, b) => b.average_daily_stop_times - a.average_daily_stop_times,
  );
  const kept = new Set<StopGroup>();
  for (const group of busiestFirst) {
    if (![...kept].some((k) => areDuplicates(k, group))) kept.add(group);
  }
  return groups.filter((g) => kept.has(g));
}
