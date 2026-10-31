import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { requireEnv } from "./env";

const SESSION_COOKIE = "tabloid_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function sign(payload: string): Buffer {
  return createHmac("sha256", requireEnv("SESSION_SECRET"))
    .update(payload)
    .digest();
}

function createSessionToken(): string {
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt).toString("base64url")}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expiresAt, signature, ...rest] = token.split(".");
  if (!expiresAt || !signature || rest.length > 0) return false;
  const expected = sign(expiresAt);
  const provided = Buffer.from(signature, "base64url");
  if (provided.length !== expected.length) return false;
  if (!timingSafeEqual(provided, expected)) return false;
  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export function passwordMatches(candidate: string): boolean {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(
    digest(candidate),
    digest(requireEnv("ADMIN_PASSWORD")),
  );
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
