"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BookmarkIcon, MessageSquareIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { createSupabseServerClient } from "@/utils/supabase/server";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useBookmark } from "@/utils/hooks/useBookmark";

interface PostCardProps {
  id: string;
  author: string;
  title: string;
  slug: string;
  user_id: string | undefined;
  likes: number;
  comments: number;
}

function PostCard({
  id,
  author,
  title,
  slug,
  likes,
  user_id,
  comments,
}: PostCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmark(id, user_id);

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex">
          <span>{author}</span>
        </CardDescription>
        <CardTitle>
          <Link href={`/post/${slug}`}>{title}</Link>
        </CardTitle>

        <div className="flex justify-between">
          {/* Likes and comments */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <ThumbsUpIcon size={20} />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquareIcon size={20} />
              <span>{comments}</span>
            </div>
          </div>
          {/* Bookmark */}
          {!isBookmarked ? (
            <Button onClick={toggleBookmark} variant="outline">
              <BookmarkIcon size={16} />
            </Button>
          ) : (
            <Button onClick={toggleBookmark}>
              <BookmarkIcon size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

export default PostCard;
