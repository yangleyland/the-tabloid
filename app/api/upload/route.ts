import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { readJson } from "@/lib/http";
import { isAdmin } from "@/lib/session";

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/heic",
];

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

function toTokenRequest(value: unknown): HandleUploadBody | null {
  if (typeof value !== "object" || value === null) return null;
  if (!("type" in value) || value.type !== "blob.generate-client-token") {
    return null;
  }
  if (!("payload" in value)) return null;
  const payload = value.payload;
  if (typeof payload !== "object" || payload === null) return null;
  if (!("pathname" in payload) || typeof payload.pathname !== "string") {
    return null;
  }
  const multipart =
    "multipart" in payload && typeof payload.multipart === "boolean"
      ? payload.multipart
      : false;
  const clientPayload =
    "clientPayload" in payload && typeof payload.clientPayload === "string"
      ? payload.clientPayload
      : null;
  return {
    type: "blob.generate-client-token",
    payload: { pathname: payload.pathname, multipart, clientPayload },
  };
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = toTokenRequest(await readJson(request));
  if (!body) {
    return NextResponse.json(
      { error: "Invalid upload request" },
      { status: 400 },
    );
  }
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
        maximumSizeInBytes: MAX_UPLOAD_BYTES,
        addRandomSuffix: true,
      }),
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
