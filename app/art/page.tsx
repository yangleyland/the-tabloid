import GenreView from "@/components/GenreView";
import { listSortedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function ArtPage() {
  const blogs = await listSortedPosts();
  return (
    <GenreView
      title="Art"
      padded={false}
      blogs={blogs.filter((blog) => blog.genre === "art")}
    />
  );
}
