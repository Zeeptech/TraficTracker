import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { auth } from "./routes/auth/auth.js";
import { stops } from "./routes/stops/stops.js";

const app = new Hono().route("/auth", auth).route("/stops", stops);

app.get("/", (c) => {
  return c.text("Hello Hono!");
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
