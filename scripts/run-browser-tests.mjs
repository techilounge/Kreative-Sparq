import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = process.cwd();
const origin = "http://127.0.0.1:3100";
const nextCli = join(root, "node_modules", "next", "dist", "bin", "next");
const playwrightCli = join(
  root,
  "node_modules",
  "@playwright",
  "test",
  "cli.js",
);
const validators = [
  join(root, "scripts", "validate-services.mjs"),
  join(root, "scripts", "validate-editorial.mjs"),
];
const runOutput = join(
  root,
  ".playwright-runs",
  `${Date.now()}-${process.pid}`,
);

async function ready() {
  try {
    const response = await fetch(origin, { signal: AbortSignal.timeout(1500) });
    return response.ok && (await response.text()).includes("Kreative Sparq");
  } catch {
    return false;
  }
}

async function stopStartedServer(server) {
  if (!server || server.exitCode !== null) return;

  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(3000),
  ]);

  if (server.exitCode === null && process.platform === "win32") {
    const killer = spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
    await Promise.race([
      new Promise((resolve) => {
        killer.once("exit", resolve);
        killer.once("error", resolve);
      }),
      delay(3000),
    ]);
    killer.kill();
  }
}

let server;
try {
  if (!(await ready())) {
    if (!existsSync(join(root, ".next", "BUILD_ID"))) {
      throw new Error(
        "No production build found. Run `pnpm build`, then `pnpm test`.",
      );
    }

    server = spawn(
      process.execPath,
      [nextCli, "start", "-H", "127.0.0.1", "-p", "3100"],
      {
        cwd: root,
        stdio: "ignore",
        windowsHide: true,
      },
    );

    let isReady = false;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      if (await ready()) {
        isReady = true;
        break;
      }
      if (server.exitCode !== null) break;
      await delay(250);
    }
    if (!isReady)
      throw new Error("The test server did not become ready on port 3100.");
    process.stdout.write(`Started test server at ${origin}\n`);
  } else {
    process.stdout.write(`Reusing test server at ${origin}\n`);
  }

  let code = await new Promise((resolve, reject) => {
    const runner = spawn(
      process.execPath,
      [
        playwrightCli,
        "test",
        `--output=${runOutput}`,
        ...process.argv.slice(2),
      ],
      {
        cwd: root,
        stdio: ["ignore", "inherit", "inherit"],
        windowsHide: true,
      },
    );
    runner.once("exit", (exitCode) => resolve(exitCode ?? 1));
    runner.once("error", reject);
  });
  if (code === 0) {
    for (const validatorPath of validators) {
      code = await new Promise((resolve, reject) => {
        const validator = spawn(process.execPath, [validatorPath], {
          cwd: root,
          stdio: ["ignore", "inherit", "inherit"],
          windowsHide: true,
          env: { ...process.env, PLAYWRIGHT_BASE_URL: origin },
        });
        validator.once("exit", (exitCode) => resolve(exitCode ?? 1));
        validator.once("error", reject);
      });
      if (code !== 0) break;
    }
  }
  process.exitCode = code;
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
} finally {
  await stopStartedServer(server);
}
