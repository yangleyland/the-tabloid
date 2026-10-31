import ArticleView from "@/components/ArticleView";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: PageProps<"/article/[id]">) {
  const { id } = await params;
  return <ArticleView blog={await getPost(id)} />;
}
