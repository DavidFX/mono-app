import { createSupabseServerClient } from "@/utils/supabase/server";
import Header from "@/components/global/header";
import "@/app/styles/editor.scss";
import Comments from "@/components/posts/comments/comments";
import AuthorCard from "@/components/posts/author-card";
import Likes from "@/components/posts/likes";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createSupabseServerClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*, comments(count), bookmarks(count), likes(count)")
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
        {/* Main container */}
        <div className="flex justify-center w-screen gap-4">
          {/* Likes */}
          <Likes
            bookmarks={post.bookmarks[0].count}
            likes={post.likes[0].count}
            comments={post.comments[0].count}
            post_id={post.id}
            user_id={post.author_id}
          />
          {/* Blog */}
          <div className="w-1/2 p-4 border rounded-md ">
            <h1>{post.title}</h1>
            <article
              className="mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></article>
            <Comments postId={post.id} />
          </div>
        </div>
      </>
    );
  }
}
