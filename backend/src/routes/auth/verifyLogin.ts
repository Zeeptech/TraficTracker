import { verify } from "argon2";
import { db } from "../../db.js";

type UserRow = { id: number; password: string };

const findUserByUsername = db.prepare<{ username: string }, UserRow>(
  "SELECT id, password FROM users WHERE username = @username",
);

export async function verifyLogin(username: string, password: string) {
  const user = findUserByUsername.get({ username });

  if (!user) return null;

  const ok = await verify(user.password, password);

  if (!ok) return null;

  return user.id;
}
