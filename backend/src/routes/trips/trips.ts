import { Hono } from "hono";
import { requireAuth } from "../../guards/auth.js";
import { findRealtimeDirect } from "./functions/findRealtimeDirect.js";
import { findNextDirect } from "./functions/findNextDirect.js";
import { getFrequency } from "./functions/getFrequency.js";
import type { Trip } from "@trafictracker/shared/Trip";

export const trips = new Hono();

trips.get("/:from/:to", requireAuth, async (c) => {
  const { from, to } = c.req.param();

  const matches = await findRealtimeDirect(from, to);
  const frequencyMinutes = getFrequency(matches);
  const next = matches[0] ?? (await findNextDirect(from, to));

  const data: Trip = { next, frequencyMinutes };

  return c.json({ data });
});
