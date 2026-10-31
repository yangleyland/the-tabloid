import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/http";
import { toggleFeatured } from "@/lib/posts";

export async function POST(
  _request: Request,
  { params }: RouteContext<"/api/posts/[id]/feature">,
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const document = await toggleFeatured(id);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  return NextResponse.json({
    message: "Boolean field updated successfully!",
    document,
  });
}
