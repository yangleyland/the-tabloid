import SearchResultsView from "@/components/SearchResultsView";
import { searchPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  params,
}: PageProps<"/search/[query]">) {
  const { query } = await params;
  return (
    <SearchResultsView results={await searchPosts(decodeURIComponent(query))} />
  );
}
