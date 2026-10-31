import { NextResponse } from "next/server";
import { isAdmin } from "./session";

export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    const parsed: unknown = await request.json();
    return parsed;
  } catch {
    return undefined;
  }
}
