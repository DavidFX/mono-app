import { createSupabseServerClient } from "@/utils/supabase/server";
import React from "react";
import PostCard from "./post-card";
import { readUserSession } from "@/utils/server/actions";

export default async function ReadingList() {
  const supabase = await createSupabseServerClient();
  const { data: user_data } = await readUserSession();

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("posts(*, comments(count))")
    .eq("user_id", user_data.session?.user.id);
  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <div className="container flex flex-col gap-8 px-64">
      <h2>
        {bookmarks?.length === 0
          ? "You have no bookmarks"
          : "Here are your bookmarks"}
      </h2>
      {bookmarks?.map((bookmark) => (
        <PostCard
          // @ts-ignore

          key={bookmark.posts.id}
          // @ts-ignore

          id={bookmark.posts.id}
          // @ts-ignore

          slug={bookmark.posts.slug}
          // @ts-ignore

          likes={bookmark.posts.likes}
          // @ts-ignore

          comments={bookmark.posts.comments[0].count}
          author={
            // @ts-ignore

            bookmark.posts.profiles
              ? // @ts-ignore
                bookmark.posts.profiles.full_name
              : "No author"
          }
          // @ts-ignore
          title={bookmark.posts.title}
          user_id={user_data.session?.user.id}
        />
      ))}
    </div>
  );
}
