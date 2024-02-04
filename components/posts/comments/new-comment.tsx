"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { useUserClient } from "@/utils/hooks/useUserClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface newCommentProps {
  postId: string;
}

function NewComment({ postId }: newCommentProps) {
  const supabase = createClient();
  const [isLogged, User] = useUserClient();
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleNewComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await supabase.from("comments").insert([
      {
        author: User.id,
        post: postId,
        content: comment,
      },
    ]);
    router.refresh();
  };

  if (!isLogged) {
    return (
      <div>
        <p className="">You need to be logged in to comment</p>
      </div>
    );
  }
  return (
    <Card>
      <form
        className="flex flex-col items-end gap-4 p-4"
        onSubmit={handleNewComment}
      >
        <Textarea
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
          placeholder="New comment"
        />
        <Button type="submit" className="w-fit">
          Send
        </Button>
      </form>
    </Card>
  );
}

export default NewComment;
