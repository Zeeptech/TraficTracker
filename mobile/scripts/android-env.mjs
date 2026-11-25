import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir, platform } from "node:os";
import path from "node:path";

const os = platform();
const home = homedir();
const exe = os === "win32" ? ".exe" : "";

const sdkCandidates = [
  process.env.ANDROID_HOME,
  process.env.ANDROID_SDK_ROOT,
  os === "win32" && path.join(process.env.LOCALAPPDATA ?? "", "Android", "Sdk"),
  os === "darwin" && path.join(home, "Library", "Android", "sdk"),
  os === "linux" && path.join(home, "Android", "Sdk"),
];

const jdkCandidates = [
  process.env.JAVA_HOME,
  os === "win32" && "C:\\Program Files\\Android\\Android Studio\\jbr",
  os === "darwin" && "/Applications/Android Studio.app/Contents/jbr",
  os === "linux" && "/opt/android-studio/jbr",
  os === "linux" && path.join(home, "android-studio", "jbr"),
];

const sdk = sdkCandidates.find(
  (dir) => dir && existsSync(path.join(dir, "platform-tools", `adb${exe}`)),
);

const jdk = jdkCandidates.find(
  (dir) => dir && existsSync(path.join(dir, "bin", `javac${exe}`)),
);

if (!sdk) {
  console.error(
    "Android SDK not found. Install Android Studio, or set ANDROID_HOME to your SDK folder.",
  );
  process.exit(1);
}

const env = {
  ...process.env,
  ANDROID_HOME: sdk,
  PATH: [
    path.join(sdk, "emulator"),
    path.join(sdk, "platform-tools"),
    process.env.PATH,
  ].join(path.delimiter),
};

if (jdk) {
  env.JAVA_HOME = jdk;
} else {
  console.warn(
    "No JDK found. If the build fails, install Android Studio or set JAVA_HOME to a JDK.",
  );
}

const [command, ...args] = process.argv.slice(2);

const child = spawn(command, args, {
  stdio: "inherit",
  env,
  shell: os === "win32",
});

child.on("exit", (code) => process.exit(code ?? 1));
