import { Hono, type Context } from "hono";

export const stops = new Hono();

stops.get("/", async (c) => {
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
});
