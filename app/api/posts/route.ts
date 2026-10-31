import { NextResponse } from "next/server";
import { readJson, requireAdmin } from "@/lib/http";
import { createPost, listPosts } from "@/lib/posts";
import { parsePostInput } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await listPosts());
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const parsed = parsePostInput(await readJson(request));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  return NextResponse.json(await createPost(parsed.value));
}
