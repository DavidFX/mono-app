import { cookies } from "next/headers";
import { createSupabseServerClient } from "@/utils/supabase/server";
import Header from "@/components/global/header";
import "@/app/styles/editor.scss";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createSupabseServerClient();

  const { data: post } = await supabase
    .from("posts")
    .select()
    .eq("slug", params.slug);

  const { count } = await supabase
    .from("posts")
    .select("slug", { count: "exact" })
    .eq("slug", params.slug);

  if (count === 0 || !post) {
    return <div>Post not found</div>;
  } else {
    return (
      <>
        <Header />
        <div className="container">
          <h1>{post[0].title}</h1>
          <article
            className="mb-12"
            dangerouslySetInnerHTML={{ __html: post[0].content }}
          ></article>
        </div>
      </>
    );
  }
}
