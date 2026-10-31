import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/http";
import { deletePost, getPost } from "@/lib/posts";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/posts/[id]">,
) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/posts/[id]">,
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const post = await deletePost(id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
