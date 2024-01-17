import { createSupabseServerClient } from "@/utils/supabase/server";
import React from "react";
import PostCard from "./post-card";
import { readUserSession } from "@/utils/server/actions";

async function PostsList() {
  const supabase = await createSupabseServerClient();
  const { data: user_data } = await readUserSession();

  let { data: posts, error } = await supabase
    .from("posts")
    .select(`*, profiles(full_name), comments(count)`);

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <div className="container flex flex-col gap-8 px-64">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          slug={post.slug}
          likes={post.likes}
          comments={post.comments[0].count}
          // @ts-ignore
          author={post.profiles ? post.profiles.full_name : "No author"}
          title={post.title}
          logged_in_user={user_data.session?.user ? true : false}
        />
      ))}
    </div>
  );
}

export default PostsList;
