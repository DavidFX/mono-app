import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

import { createSupabseServerClient } from "@/utils/supabase/server";
import NewComment from "./new-comment";
import { readUserSession } from "@/utils/server/actions";
import CommentCard from "./comment-card";

interface CommentProps {
  postId: string;
}

export default async function Comments({ postId }: CommentProps) {
  const supabase = await createSupabseServerClient();

  const { error, data: comments } = await supabase
    .from("comments")
    .select("*, profiles(full_name)")
    .eq("post", postId)
    .order("created_at", { ascending: false });

  const session = await readUserSession();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error loading comments</CardTitle>
        </CardHeader>
        <CardContent>{error.message}</CardContent>
      </Card>
    );
  }

  if (comments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No comments yet</CardTitle>
        </CardHeader>
        <CardContent>
          <NewComment postId={postId} />
        </CardContent>
      </Card>
    );
  }

  return (
    <section aria-label="Comments">
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <NewComment postId={postId} />
          {comments.map((comment) => (
            <CommentCard
              isAuthor={session.data.session?.user.id === comment.author}
              comment={comment.content}
              name={comment.profiles.full_name}
              key={comment.id}
              id={comment.id}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
