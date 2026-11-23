import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof userSchema>;
