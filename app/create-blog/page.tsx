import { redirect } from "next/navigation";
import CreateBlog from "@/components/CreateBlog";
import { listPosts } from "@/lib/posts";
import { isAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function CreateBlogPage() {
  if (!(await isAdmin())) redirect("/login");
  return <CreateBlog initialBlogs={await listPosts()} />;
}
