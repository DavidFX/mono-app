import Header from "@/components/global/header";
import PostsList from "@/components/global/posts-list";
import { readUserSession } from "@/utils/server/actions";
import { redirect } from "next/navigation";

export default async function Index() {
  const { data } = await readUserSession();

  return (
    <>
      <Header />
      <PostsList />
    </>
  );
}
