import { createSupabseServerClient } from "@/utils/supabase/server";
import React from "react";
import PostCard from "./post-card";
import { readUserSession } from "@/utils/server/actions";

interface PostListProps {
  type?: "global" | "user";
}

async function PostsList({ type = "global" }: PostListProps) {
  const supabase = await createSupabseServerClient();
  const { data: user_data } = await readUserSession();

  let { data: posts, error } = await supabase
    .from("posts")
    .select(`*, profiles(full_name), comments(count), likes(count)`)
    .order("created_at", { ascending: false });

  if (error || !posts) {
    console.error(error);
    return <div>Error</div>;
  }

  if (type === "user") {
    posts = posts.filter(
      (post) => post.author_id === user_data.session?.user.id
    );
  }

  return (
    <div className="container flex flex-col gap-8 mx-auto">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          slug={post.slug}
          likes={post.likes[0].count}
          comments={post.comments[0].count}
          // @ts-ignore
          author={post.profiles ? post.profiles.full_name : "No author"}
          title={post.title}
          user_id={user_data.session?.user.id}
          author_view={type === "user"}
          logedIn={user_data.session?.user !== undefined}
        />
      ))}
    </div>
  );
}

export default PostsList;
