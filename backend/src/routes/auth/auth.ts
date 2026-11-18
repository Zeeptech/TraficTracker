import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { verifyLogin } from "./functions/verifyLogin.js";
import { storeSession } from "./functions/storeSession.js";
import { requireAuth } from "../../guards/auth.js";
import { db } from "../../db.js";

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

const deleteSession = db.prepare(
  "DELETE FROM sessions WHERE token_hash = @token",
);

auth.delete("/", requireAuth, (c) => {
  deleteSession.run({ token: c.get("token") });
  return c.body(null, 204);
});

const findUser = db.prepare(
  "SELECT id, username, email FROM users WHERE id = @id",
);

auth.get("/", requireAuth, (c) => {
  const user = findUser.get({ id: c.get("userId") });
  return c.json(user);
});
