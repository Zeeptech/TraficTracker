import { DatabaseSync } from "node:sqlite";
export const db = new DatabaseSync("dev.db");
db.exec("PRAGMA foreign_keys = ON");
