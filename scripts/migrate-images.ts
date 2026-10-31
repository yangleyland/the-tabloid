import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";
import mongoose, { type Types } from "mongoose";
import { connectToDatabase } from "../lib/db";
import { BlogPostModel } from "../lib/model";

interface Options {
  dryRun: boolean;
  includeExternal: boolean;
  publicDir: string;
  outDir: string;
  revert: string | null;
}

interface MappingEntry {
  postId: string;
  title: string;
  oldImageUrl: string;
  newImageUrl: string;
  contentType: string;
  bytes: number;
}

interface MappingFile {
  createdAt: string;
  dryRun: boolean;
  entries: MappingEntry[];
}

interface DetectedType {
  extension: string;
  contentType: string;
}

interface StoredPost {
  _id: Types.ObjectId;
  title: string;
  imageUrl: string;
}

const HASH_NAME = /^[0-9a-f]{32}$/;
const LOCAL_HASH_URL = /^\/([0-9a-f]{32})$/;
const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

function parseArgs(argv: string[]): Options {
  const options: Options = {
    dryRun: false,
    includeExternal: false,
    publicDir: path.resolve("frontend/public"),
    outDir: path.resolve("migration/output"),
    revert: null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--include-external") options.includeExternal = true;
    else if (arg === "--public-dir" && next) {
      options.publicDir = path.resolve(next);
      index += 1;
    } else if (arg === "--out-dir" && next) {
      options.outDir = path.resolve(next);
      index += 1;
    } else if (arg === "--revert" && next) {
      options.revert = path.resolve(next);
      index += 1;
    } else {
      throw new Error(`Unknown or incomplete argument: ${arg}`);
    }
  }
  return options;
}

function ascii(buffer: Buffer, start: number, end: number): string {
  return buffer.subarray(start, end).toString("latin1");
}

export function detectImageType(buffer: Buffer): DetectedType | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { extension: "jpg", contentType: "image/jpeg" };
  }
  if (
    buffer.length >= 8 &&
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return { extension: "png", contentType: "image/png" };
  }
  if (
    buffer.length >= 6 &&
    (ascii(buffer, 0, 6) === "GIF87a" || ascii(buffer, 0, 6) === "GIF89a")
  ) {
    return { extension: "gif", contentType: "image/gif" };
  }
  if (
    buffer.length >= 12 &&
    ascii(buffer, 0, 4) === "RIFF" &&
    ascii(buffer, 8, 12) === "WEBP"
  ) {
    return { extension: "webp", contentType: "image/webp" };
  }
  if (buffer.length >= 12 && ascii(buffer, 4, 8) === "ftyp") {
    const brand = ascii(buffer, 8, 12);
    if (brand === "avif" || brand === "avis") {
      return { extension: "avif", contentType: "image/avif" };
    }
    if (["heic", "heix", "heim", "heis", "mif1", "msf1"].includes(brand)) {
      return { extension: "heic", contentType: "image/heic" };
    }
  }
  return null;
}

function isBlobUrl(value: string): boolean {
  try {
    return new URL(value).hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

function isExternalUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function writeMapping(file: string, mapping: MappingFile): void {
  writeFileSync(file, `${JSON.stringify(mapping, null, 2)}\n`);
}

function readMapping(file: string): MappingEntry[] {
  const parsed: unknown = JSON.parse(readFileSync(file, "utf8"));
  if (typeof parsed !== "object" || parsed === null || !("entries" in parsed)) {
    throw new Error(`${file} is not a mapping file`);
  }
  const entries = parsed.entries;
  if (!Array.isArray(entries)) throw new Error(`${file} has no entries array`);
  return entries.flatMap((entry: unknown) => {
    if (typeof entry !== "object" || entry === null) return [];
    const record: Record<string, unknown> = { ...entry };
    const { postId, title, oldImageUrl, newImageUrl, contentType, bytes } =
      record;
    if (
      typeof postId !== "string" ||
      typeof oldImageUrl !== "string" ||
      typeof newImageUrl !== "string"
    ) {
      return [];
    }
    return [
      {
        postId,
        title: typeof title === "string" ? title : "",
        oldImageUrl,
        newImageUrl,
        contentType: typeof contentType === "string" ? contentType : "",
        bytes: typeof bytes === "number" ? bytes : 0,
      },
    ];
  });
}

async function revert(options: Options): Promise<void> {
  if (!options.revert) return;
  const entries = readMapping(options.revert);
  console.log(
    `${options.dryRun ? "[dry run] " : ""}Reverting ${entries.length} post(s) from ${options.revert}`,
  );
  for (const entry of entries) {
    if (options.dryRun) {
      console.log(
        `  would revert ${entry.postId}: ${entry.newImageUrl} -> ${entry.oldImageUrl}`,
      );
      continue;
    }
    const result = await BlogPostModel.updateOne(
      { _id: entry.postId, imageUrl: entry.newImageUrl },
      { imageUrl: entry.oldImageUrl },
    );
    console.log(
      `  ${result.modifiedCount === 1 ? "reverted" : "skipped (imageUrl changed since migration)"} ${entry.postId}`,
    );
  }
}

async function loadExternal(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function migrate(options: Options): Promise<void> {
  const hashFiles = existsSync(options.publicDir)
    ? readdirSync(options.publicDir).filter((name) => HASH_NAME.test(name))
    : [];
  const posts = await BlogPostModel.find({}, { title: 1, imageUrl: 1 }).lean<
    StoredPost[]
  >();

  const referenced = new Set<string>();
  const alreadyOnBlob: StoredPost[] = [];
  const external: StoredPost[] = [];
  const missing: { post: StoredPost; hash: string }[] = [];
  const unrecognized: { post: StoredPost; reason: string }[] = [];
  const planned: {
    post: StoredPost;
    load: () => Promise<Buffer>;
    pathname: (ext: string) => string;
  }[] = [];

  for (const post of posts) {
    const match = LOCAL_HASH_URL.exec(post.imageUrl);
    if (match?.[1]) {
      const hash = match[1];
      referenced.add(hash);
      const file = path.join(options.publicDir, hash);
      if (!existsSync(file)) {
        missing.push({ post, hash });
        continue;
      }
      planned.push({
        post,
        load: async () => readFileSync(file),
        pathname: (ext) => `posts/${hash}.${ext}`,
      });
    } else if (isBlobUrl(post.imageUrl)) {
      alreadyOnBlob.push(post);
    } else if (isExternalUrl(post.imageUrl)) {
      if (options.includeExternal) {
        planned.push({
          post,
          load: () => loadExternal(post.imageUrl),
          pathname: (ext) => `posts/external/${post._id.toString()}.${ext}`,
        });
      } else {
        external.push(post);
      }
    } else {
      unrecognized.push({
        post,
        reason: "imageUrl is neither /<hash>, a Blob URL, nor http(s)",
      });
    }
  }

  const orphaned = hashFiles.filter((name) => !referenced.has(name));
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  mkdirSync(options.outDir, { recursive: true });
  const mappingPath = path.join(
    options.outDir,
    `mapping-${options.dryRun ? "dry-run-" : ""}${stamp}.json`,
  );
  const mapping: MappingFile = {
    createdAt: new Date().toISOString(),
    dryRun: options.dryRun,
    entries: [],
  };

  console.log(
    `${options.dryRun ? "[DRY RUN] no uploads, no database writes" : "[LIVE RUN]"}`,
  );
  console.log(
    `Public dir: ${options.publicDir}${existsSync(options.publicDir) ? "" : " (not found)"}`,
  );
  console.log(`Posts in database: ${posts.length}`);
  console.log(`Hash-named files on disk: ${hashFiles.length}`);
  console.log(
    `Include external URLs: ${options.includeExternal ? "yes" : "no"}`,
  );
  console.log("");
  console.log(`To migrate (${planned.length}):`);

  const failures: { post: StoredPost; reason: string }[] = [];
  for (const item of planned) {
    const id = item.post._id.toString();
    let buffer: Buffer;
    try {
      buffer = await item.load();
    } catch (error) {
      failures.push({
        post: item.post,
        reason: `could not read source: ${error instanceof Error ? error.message : String(error)}`,
      });
      continue;
    }
    const detected = detectImageType(buffer);
    if (!detected) {
      failures.push({
        post: item.post,
        reason: "unrecognized image format (magic bytes)",
      });
      continue;
    }
    const pathname = item.pathname(detected.extension);
    console.log(`  ${id}  "${item.post.title}"`);
    console.log(`    ${item.post.imageUrl}`);
    console.log(
      `    -> ${pathname}  (${detected.contentType}, ${formatBytes(buffer.length)})`,
    );
    if (options.dryRun) continue;
    const blob = await put(pathname, buffer, {
      access: "public",
      contentType: detected.contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    const result = await BlogPostModel.updateOne(
      { _id: item.post._id, imageUrl: item.post.imageUrl },
      { imageUrl: blob.url },
    );
    if (result.modifiedCount !== 1) {
      failures.push({
        post: item.post,
        reason: "post imageUrl changed during migration; not updated",
      });
      continue;
    }
    mapping.entries.push({
      postId: id,
      title: item.post.title,
      oldImageUrl: item.post.imageUrl,
      newImageUrl: blob.url,
      contentType: detected.contentType,
      bytes: buffer.length,
    });
    writeMapping(mappingPath, mapping);
    console.log(`    uploaded ${blob.url}`);
  }
  if (planned.length === 0) console.log("  (none)");

  console.log("");
  console.log(`Skipped, already on Blob (${alreadyOnBlob.length}):`);
  for (const post of alreadyOnBlob)
    console.log(`  ${post._id.toString()}  "${post.title}"  ${post.imageUrl}`);
  if (!options.includeExternal) {
    console.log("");
    console.log(
      `Skipped, external URL; pass --include-external to re-host (${external.length}):`,
    );
    for (const post of external)
      console.log(
        `  ${post._id.toString()}  "${post.title}"  ${post.imageUrl}`,
      );
  }
  console.log("");
  console.log(`Posts with missing local files (${missing.length}):`);
  for (const { post, hash } of missing)
    console.log(`  ${post._id.toString()}  "${post.title}"  /${hash}`);
  console.log("");
  console.log(
    `Posts with unusable imageUrl or failed source (${unrecognized.length + failures.length}):`,
  );
  for (const { post, reason } of [...unrecognized, ...failures]) {
    console.log(
      `  ${post._id.toString()}  "${post.title}"  ${post.imageUrl}  (${reason})`,
    );
  }
  console.log("");
  console.log(
    `Orphaned files, not referenced by any post (${orphaned.length}):`,
  );
  for (const name of orphaned) {
    const buffer = readFileSync(path.join(options.publicDir, name));
    const detected = detectImageType(buffer);
    console.log(
      `  ${name}  ${detected ? detected.contentType : "unknown"}  ${formatBytes(buffer.length)}`,
    );
  }
  console.log("");
  if (!options.dryRun) {
    writeMapping(mappingPath, mapping);
    console.log(
      `Mapping written to ${mappingPath} (${mapping.entries.length} entries)`,
    );
    console.log(
      `Revert with: pnpm migrate:images --revert ${path.relative(process.cwd(), mappingPath)}`,
    );
  }
  if (failures.length > 0) process.exitCode = 1;
}

async function main(): Promise<void> {
  if (existsSync(".env.local")) process.loadEnvFile(".env.local");
  const options = parseArgs(process.argv.slice(2));
  await connectToDatabase();
  try {
    if (options.revert) await revert(options);
    else await migrate(options);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
