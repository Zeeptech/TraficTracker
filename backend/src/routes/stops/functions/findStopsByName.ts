import z from "zod";
import { trafiklab } from "../../../clients/trafiklab.js";
import type { LocatedStop } from "@trafictracker/shared/Stop";
import { stopGroupSchema } from "@trafictracker/shared/StopGroup";
import { locateStop } from "../../../lib/stopLocation.js";

const nameSearchSchema = z.object({
  timestamp: z.string(),
  query: z.object({
    queryTime: z.string(),
    query: z.string(),
  }),
  stop_groups: z.array(stopGroupSchema),
});

export async function findStopsByName(name: string) {
  const res = await trafiklab.get(`stops/name/${encodeURIComponent(name)}`);

  const { stop_groups } = nameSearchSchema.parse(await res.json());

  const stops: LocatedStop[] = stop_groups
    .filter((group) => group.stops.length > 0)
    .map((group) =>
      locateStop({ ...group.stops[0], id: group.id, name: group.name }),
    );

  return stops;
}
