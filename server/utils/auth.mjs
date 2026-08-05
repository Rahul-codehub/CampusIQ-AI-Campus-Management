import {
  AUTH_SECRET,
  TOKEN_TTL_SECONDS,
} from "../config/env.mjs";

import {
  createHmac,
  timingSafeEqual,
  randomBytes,
  scrypt as scryptCallback,
} from "node:crypto";

import { promisify } from "node:util";



const scrypt = promisify(scryptCallback);

export function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

export function signToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = createHmac("sha256", AUTH_SECRET).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifyToken(token) {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;
  const expected = createHmac("sha256", AUTH_SECRET).update(encodedPayload).digest("base64url");
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length || !timingSafeEqual(expectedBuffer, signatureBuffer)) return null;
  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const candidate = await scrypt(password, salt, 64);
  const stored = Buffer.from(hash, "hex");
  return stored.length === candidate.length && timingSafeEqual(stored, candidate);
}

const appRoles = new Set([
  "admin",
  "faculty",
  "student",
]);

export function normalizeRole(role) {
  role = String(role || "").toLowerCase();

  return appRoles.has(role)
    ? role
    : "student";
}



export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    roles: user.roles || ["student"],
    profile: {
      full_name: user.profile?.full_name || "",
      avatar_url: user.profile?.avatar_url || null,
      phone: user.profile?.phone || null,
    },
  };
}
