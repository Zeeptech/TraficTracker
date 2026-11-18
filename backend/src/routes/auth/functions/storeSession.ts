import { randomBytes } from "node:crypto";
import { db } from "../../../db.js";

const session = db.prepare(
  "INSERT INTO sessions (user_id, token_hash, created_at, last_used_at) VALUES (@userId, @token, @createdAt, @lastUsedAt)",
);

export async function storeSession(userId: number) {
  if (!userId) return null;

  const token = randomBytes(32).toString("base64url");
  const createdAt = new Date().toISOString();
  const lastUsedAt = createdAt;

  session.run({ userId, token, createdAt, lastUsedAt });

  return token;
}
