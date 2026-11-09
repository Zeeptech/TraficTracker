import type { Context, Next } from "hono";

export async function requireAuth(c: Context, next: Next) {
  //Inloggnings check

  await next();
}
