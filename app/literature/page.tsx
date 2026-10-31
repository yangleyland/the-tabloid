import GenreView from "@/components/GenreView";
import { listSortedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function LiteraturePage() {
  const blogs = await listSortedPosts();
  return (
    <GenreView
      title="Literature"
      padded={true}
      blogs={blogs.filter((blog) => blog.genre === "literature")}
    />
  );
}
