import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient(cookies());
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
        <h1>{post[0].title}</h1>
        <div>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
      </>
    );
  }
}
