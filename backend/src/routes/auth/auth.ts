import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyLogin } from "./verifyLogin.js";
import { storeSession } from "./storeSession.js";

export const auth = new Hono();

auth.post(
  "/",
  zValidator("json", z.object({ username: z.string(), password: z.string() })),
  async (c) => {
    const { username, password } = c.req.valid("json");

    const userId = await verifyLogin(username, password);
    if (!userId) return c.json({ error: "Invalid username or password" }, 401);

    const token = await storeSession(userId);

    return c.json({ token });
  },
);
