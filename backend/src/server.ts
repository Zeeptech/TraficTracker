import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { auth } from "./routes/auth/auth.js";
import { stops } from "./routes/stops/stops.js";
<<<<<<< Updated upstream
=======
import { requireAuth } from "./guards/auth.js";
>>>>>>> Stashed changes
import { cors } from "hono/cors";

const app = new Hono()
  .use(
    "*",
    cors({
<<<<<<< Updated upstream
      origin: "*",
=======
      origin: "http://localhost:5173",
>>>>>>> Stashed changes
    }),
  )
  .route("/auth", auth)
  .route("/stops", stops);

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
