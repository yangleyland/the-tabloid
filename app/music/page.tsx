import GenreView from "@/components/GenreView";
import { listSortedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function MusicPage() {
  const blogs = await listSortedPosts();
  return (
    <GenreView
      title="Music"
      padded={true}
      blogs={blogs.filter((blog) => blog.genre === "music")}
    />
  );
}
