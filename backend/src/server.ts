import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getAllStops } from "./routes/stops/getAllStops.js";
import "dotenv/config";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/list", getAllStops);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
