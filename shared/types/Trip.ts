import z from "zod";

export const departureSchema = z.object({
  line: z.string(),
  platform: z.string().nullable(),
  departure: z.string(),
  arrival: z.string(),
});

export type Departure = z.infer<typeof departureSchema>;

export const tripSchema = z.object({
  next: departureSchema.nullable(),
  frequencyMinutes: z.number().nullable(),
});

export type Trip = z.infer<typeof tripSchema>;
