import HomeView from "@/components/HomeView";
import { listSortedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return <HomeView blogs={await listSortedPosts()} />;
}
