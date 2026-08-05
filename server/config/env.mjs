import { readFileSync } from "node:fs";

loadEnv();

const PORT = Number(process.env.API_PORT || 4000);
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || "campus_ai_management";
const AUTH_SECRET =
  process.env.AUTH_SECRET ||
  "replace-this-secret-before-production";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

function loadEnv() {
  try {
    const env = readFileSync(".env", "utf8");

    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) continue;

      const separator = trimmed.indexOf("=");

      if (separator === -1) continue;

      const key = trimmed.slice(0, separator).trim();

      const value = trimmed
        .slice(separator + 1)
        .trim()
        .replace(/^["']|["']$/g, "");

      if (!(key in process.env))
        process.env[key] = value;
    }
  } catch {
    // Ignore if .env doesn't exist
  }
}

export {
  PORT,
  MONGODB_URI,
  DB_NAME,
  AUTH_SECRET,
  TOKEN_TTL_SECONDS,
};