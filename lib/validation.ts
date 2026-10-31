import { isGenre, type PostInput } from "./types";

function field(value: object, key: string): unknown {
  const record: Record<string, unknown> = { ...value };
  return record[key];
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function readString(value: unknown, key: string): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const result = field(value, key);
  return typeof result === "string" ? result : undefined;
}

export type ParseResult =
  { ok: true; value: PostInput } | { ok: false; error: string };

export function parsePostInput(value: unknown): ParseResult {
  if (typeof value !== "object" || value === null) {
    return { ok: false, error: "Request body must be a JSON object" };
  }
  const title = field(value, "title");
  const author = field(value, "author");
  const caption = field(value, "caption");
  const body = field(value, "body");
  const date = field(value, "date");
  const genre = field(value, "genre");
  const featured = field(value, "featured");
  const imageUrl = field(value, "imageUrl");
  if (
    !nonEmptyString(title) ||
    !nonEmptyString(author) ||
    !nonEmptyString(caption) ||
    !nonEmptyString(body) ||
    !nonEmptyString(date) ||
    !nonEmptyString(imageUrl)
  ) {
    return {
      ok: false,
      error: "title, author, caption, body, date and imageUrl are required",
    };
  }
  if (!isGenre(genre)) {
    return {
      ok: false,
      error: "genre must be one of art, literature, music, fashion",
    };
  }
  if (Number.isNaN(new Date(date).getTime())) {
    return { ok: false, error: "date must be a valid date" };
  }
  return {
    ok: true,
    value: {
      title,
      author,
      caption,
      body,
      date,
      genre,
      featured: featured === true,
      imageUrl,
    },
  };
}
