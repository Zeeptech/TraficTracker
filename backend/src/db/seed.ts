import Database from "better-sqlite3";
import { readFileSync, rmSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const reset = args.includes("--reset");

if (reset || !existsSync("dev.db")) {
  rmSync("dev.db", { force: true });

  const seedFile = new URL("./seed.sql", import.meta.url);

  const db = new Database("dev.db");
  db.exec(readFileSync(seedFile, "utf8"));
  db.close();

  console.log("Seeded dev.db");
}
