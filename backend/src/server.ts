import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { auth } from "./routes/auth/auth.js";
import { stops } from "./routes/stops/stops.js";
import { trips } from "./routes/trips/trips.js";
import { requireAuth } from "./guards/auth.js";
import { cors } from "hono/cors";

const app = new Hono()
  .use(
    "*",
    cors({
      origin: "*",
    }),
  )
  .route("/auth", auth)
  .route("/stops", stops)
  .route("/trips", trips);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/test", requireAuth, async (c) => {
  return c.json({ message: "Test route." });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
