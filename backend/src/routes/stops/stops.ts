import { Hono } from "hono";
import { requireAuth } from "../../guards/auth.js";

import { findStopsByName } from "./functions/findStopsByName.js";

export const stops = new Hono();

stops.get("/name/:search", requireAuth, async (c) => {
  const { search } = c.req.param();

  const stops = await findStopsByName(search);

  return c.json({ data: stops });
});
