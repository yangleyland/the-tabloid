import mongoose, { Schema, model } from "mongoose";
import { GENRES, type PostInput } from "./types";

const blogSchema = new Schema<PostInput>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  caption: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: String, required: true },
  genre: { type: String, required: true, enum: GENRES },
  featured: { type: Boolean, required: true },
  imageUrl: { type: String, required: true },
});

blogSchema.index({ title: "text", body: "text" });

if (mongoose.models.BlogPost) {
  mongoose.deleteModel("BlogPost");
}

export const BlogPostModel = model<PostInput>("BlogPost", blogSchema);
