import type { Context } from "hono";

export async function getAllStops(c: Context) {
  const res = await fetch(
    `${process.env.TRAFIKLAB_URL}/stops/list/?key=${process.env.TRAFIKLAB_KEY}`,
    {
      method: "GET",
    },
  );

  console.log(
    `${process.env.TRAFIKLAB_URL}/stops/list/?key=${process.env.TRAFIKLAB_KEY}`,
  );

  const data = await res.json();

  return c.json({ message: data }, 200);
}
