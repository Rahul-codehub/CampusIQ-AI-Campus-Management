import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";

const processes = [
  {
    name: "api",
    command: isWindows ? "cmd.exe" : process.execPath,
    args: isWindows
      ? ["/c", "node server/index.mjs"]
      : ["server/index.mjs"],
  },
  {
    name: "frontend",
    command: isWindows ? "cmd.exe" : "npm",
    args: isWindows
      ? ["/c", "vite"]
      : ["run", "vite"],
  },
];

const children = processes.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
      shutdown();
    }
  });

  return child;
});

function shutdown() {
  children.forEach((child) => {
    if (!child.killed) child.kill();
  });
  process.exit();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);