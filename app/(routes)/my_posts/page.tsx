import Header from "@/components/global/header";
import PostsList from "@/components/posts/posts-list";
import { redirect } from "next/navigation";
import { readUserSession } from "@/utils/server/actions";

export default async function Index() {
  const { data } = await readUserSession();

  if (!data.session?.user) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <PostsList type="user" />
    </>
  );
}
