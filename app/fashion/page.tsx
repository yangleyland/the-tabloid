import GenreView from "@/components/GenreView";
import { listSortedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function FashionPage() {
  const blogs = await listSortedPosts();
  return (
    <GenreView
      title="Fashion"
      padded={true}
      blogs={blogs.filter((blog) => blog.genre === "fashion")}
    />
  );
}
