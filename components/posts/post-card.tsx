"use client";
import dynamic from "next/dynamic";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  BookmarkIcon,
  EditIcon,
  MessageSquareIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useBookmark } from "@/utils/hooks/useBookmark";
const DeletePopup = dynamic(() => import("./delete-popup"), { ssr: false });

interface PostCardProps {
  id: string;
  author: string;
  title: string;
  slug: string;
  user_id: string | undefined;
  likes: number;
  comments: number;
  author_view?: boolean;
  logedIn?: boolean;
}

function PostCard({
  id,
  author,
  title,
  slug,
  likes,
  user_id,
  comments,
  author_view = false,
  logedIn,
}: PostCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmark(id, user_id);

  return (
    <Card className="max-w-3xl">
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
          <div className="flex gap-4">
            {/* Bookmark */}
            {/* If user is not logged in hide bookmark button */}
            {author_view !== true && logedIn ? (
              !isBookmarked ? (
                <Button onClick={toggleBookmark} variant="outline">
                  <BookmarkIcon size={16} />
                </Button>
              ) : (
                <Button onClick={toggleBookmark}>
                  <BookmarkIcon size={16} />
                </Button>
              )
            ) : (
              <></>
            )}
            {/* Delete */}
            {author_view && <DeletePopup id={id} />}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default PostCard;
