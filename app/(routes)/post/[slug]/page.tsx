import { createSupabseServerClient } from "@/utils/supabase/server";
import Header from "@/components/global/header";
import "@/app/styles/editor.scss";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createSupabseServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("slug", params.slug)
    .single();
  if (!post || error) {
    console.log(params.slug, post, error);
    return (
      <div>
        Post not found <br /> {error?.message}
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <div className="container mx-auto ">
          <h1>{post.title}</h1>
          <article
            className="mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></article>
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </>
    );
  }
}
