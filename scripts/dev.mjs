import { spawn } from "node:child_process";
import concurrently from "concurrently";

const { commands, result } = concurrently(
  [{ command: "npm run dev -w backend", name: "backend", prefixColor: "blue" }],
  { prefix: "name" },
);

result.catch(() => {});

const mobile = spawn("npm", ["run", "dev", "-w", "mobile"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.on("SIGINT", () => {});

mobile.on("exit", (code) => {
  for (const command of commands) command.kill();
  process.exit(code ?? 0);
});
