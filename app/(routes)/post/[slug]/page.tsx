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

  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("slug", params.slug);

  if (!post || error) {
    return (
      <div>
        Post not found <br /> {error.message}
      </div>
    );
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
