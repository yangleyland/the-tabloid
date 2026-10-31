import { NextResponse } from "next/server";
import { readJson } from "@/lib/http";
import { searchPosts } from "@/lib/posts";
import { readString } from "@/lib/validation";

export async function POST(request: Request) {
  const query = readString(await readJson(request), "query");
  if (query === undefined) {
    return NextResponse.json(
      { error: "query must be a string" },
      { status: 400 },
    );
  }
  return NextResponse.json(await searchPosts(query));
}
