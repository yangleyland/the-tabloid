import { NextResponse } from "next/server";
import { readJson } from "@/lib/http";
import { endSession, passwordMatches, startSession } from "@/lib/session";
import { readString } from "@/lib/validation";

export async function POST(request: Request) {
  const password = readString(await readJson(request), "password");
  if (password === undefined || !passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  await startSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
