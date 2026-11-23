import z from "zod";
import { stopSchema } from "./Stop.js";

export const stopGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  area_type: z.string(),
  average_daily_stop_times: z.number(),
  transport_modes: z.array(
    z.enum(["BUS", "TRAIN", "TAXI", "TRAM", "BOAT", "METRO"]),
  ),
  stops: z.array(stopSchema),
});

export type StopGroup = z.infer<typeof stopGroupSchema>;
