import Header from "@/components/global/header";
import ReadingList from "@/components/posts/reading-list";

import { readUserSession } from "@/utils/server/actions";
import { redirect } from "next/navigation";

export default async function Index() {
  const { data } = await readUserSession();

  if (!data.session?.user) {
    redirect("/");
  }

  if (!data.session?.user) {
    return <div>You must be logged in to view this page.</div>;
  }
  return (
    <>
      <Header />
      <ReadingList />
    </>
  );
}
