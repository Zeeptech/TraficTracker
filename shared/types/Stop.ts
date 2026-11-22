import z from "zod";

export const stopSchema = z.object({
  id: z.string(),
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
});

export type Stop = z.infer<typeof stopSchema>;

export const locatedStopSchema = stopSchema
  .omit({ lat: true, lon: true })
  .extend({
    city: z.string().nullable(),
    village: z.string().nullable(),
  });

export type LocatedStop = z.infer<typeof locatedStopSchema>;
