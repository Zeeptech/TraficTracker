import { bearerAuth } from "hono/bearer-auth";
import { db } from "../db.js";

const findSession = db.prepare(
  "SELECT user_id FROM sessions WHERE token_hash = @token",
);

export const requireAuth = bearerAuth({
  verifyToken: (token, c) => {
    const session = findSession.get({ token }) as
      { user_id: number } | undefined;
    if (!session) return false;

    c.set("userId", session.user_id);
    c.set("token", token);
    return true;
  },
});
