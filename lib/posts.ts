import { isValidObjectId, type Types } from "mongoose";
import { connectToDatabase } from "./db";
import { BlogPostModel } from "./model";
import type { Post, PostInput, SearchPost } from "./types";

type StoredPost = PostInput & { _id: Types.ObjectId };

function toPost(doc: StoredPost): Post {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    author: doc.author,
    caption: doc.caption,
    body: doc.body,
    date: doc.date,
    genre: doc.genre,
    featured: doc.featured,
    imageUrl: doc.imageUrl,
  };
}

function compareDates(a: Post, b: Post): number {
  const first = new Date(a.date).getTime();
  const second = new Date(b.date).getTime();
  if (first > second) return -1;
  if (first < second) return 1;
  return 0;
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts]
    .sort(compareDates)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function listPosts(): Promise<Post[]> {
  await connectToDatabase();
  const docs = await BlogPostModel.find().lean<StoredPost[]>();
  return docs.map(toPost);
}

export async function listSortedPosts(): Promise<Post[]> {
  return sortPosts(await listPosts());
}

export async function getPost(id: string): Promise<Post | null> {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  const doc = await BlogPostModel.findById(id).lean<StoredPost>();
  return doc ? toPost(doc) : null;
}

export async function createPost(input: PostInput): Promise<Post> {
  await connectToDatabase();
  const created = await BlogPostModel.create(input);
  return toPost(created.toObject());
}

export async function deletePost(id: string): Promise<Post | null> {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  const doc = await BlogPostModel.findByIdAndDelete(id).lean<StoredPost>();
  return doc ? toPost(doc) : null;
}

export async function toggleFeatured(id: string): Promise<Post | null> {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();
  const current = await BlogPostModel.findById(id).lean<StoredPost>();
  if (!current) return null;
  const updated = await BlogPostModel.findOneAndUpdate(
    { _id: id },
    { featured: !current.featured },
    { returnDocument: "after" },
  ).lean<StoredPost>();
  return updated ? toPost(updated) : null;
}

type StoredSearchPost = Omit<StoredPost, "caption" | "featured">;

export async function searchPosts(query: string): Promise<SearchPost[]> {
  const searchQuery = query.trim();
  if (!searchQuery) return [];
  await connectToDatabase();
  const docs = await BlogPostModel.find(
    { $text: { $search: searchQuery } },
    {
      score: { $meta: "textScore" },
      title: 1,
      body: 1,
      genre: 1,
      author: 1,
      imageUrl: 1,
      date: 1,
    },
  )
    .sort({ score: { $meta: "textScore" } })
    .lean<StoredSearchPost[]>();
  return docs.map((doc) => ({
    _id: doc._id.toString(),
    title: doc.title,
    author: doc.author,
    body: doc.body,
    date: doc.date,
    genre: doc.genre,
    imageUrl: doc.imageUrl,
  }));
}
