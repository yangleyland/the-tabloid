export type Genre = "art" | "literature" | "music" | "fashion";

export const GENRES: readonly Genre[] = [
  "art",
  "literature",
  "music",
  "fashion",
];

export interface Post {
  _id: string;
  title: string;
  author: string;
  caption: string;
  body: string;
  date: string;
  genre: Genre;
  featured: boolean;
  imageUrl: string;
}

export type PostInput = Omit<Post, "_id">;

export type SearchPost = Omit<Post, "caption" | "featured">;

export type CardPost = SearchPost & { caption?: string };

export function isGenre(value: unknown): value is Genre {
  return GENRES.some((genre) => genre === value);
}
