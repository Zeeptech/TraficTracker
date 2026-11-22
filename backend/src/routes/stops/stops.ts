import { Hono, type Context } from "hono";
import { requireAuth } from "../../guards/auth.js";
import z from "zod";
import { stopGroupSchema } from "@trafictracker/shared/StopGroup";
import { locateStop } from "../../lib/stopLocation.js";
import type { LocatedStop } from "@trafictracker/shared/Stop";

export const stops = new Hono();

stops.get("/", requireAuth, async (c) => {
  const res = await fetch(
    `${process.env.TRAFIKLAB_URL}/stops/list/?key=${process.env.TRAFIKLAB_KEY}`,
    {
      method: "GET",
    },
  );

  const data = await res.json();
  return c.json({ message: data });
});

const nameSearchSchema = z.object({
  timestamp: z.string(),
  query: z.object({
    queryTime: z.string(),
    query: z.string(),
  }),
  stop_groups: z.array(stopGroupSchema),
});

stops.get("/name/:search", requireAuth, async (c) => {
  const { search } = c.req.param();

  const res = await fetch(
    `${process.env.TRAFIKLAB_URL}/stops/name/${encodeURIComponent(search)}?key=${process.env.TRAFIKLAB_KEY}`,
    {
      method: "GET",
    },
  );

  const { stop_groups } = nameSearchSchema.parse(await res.json());

  let stops: LocatedStop[] = [];

  stop_groups.forEach((group) =>
    group.stops.forEach((stop) => stops.push(locateStop(stop))),
  );

  return c.json({ data: stops });
});
