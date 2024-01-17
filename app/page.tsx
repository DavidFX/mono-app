import Header from "@/components/global/header";
import PostsList from "@/components/posts/posts-list";

export default async function Index() {
  return (
    <>
      <Header />
      <PostsList />
    </>
  );
}
