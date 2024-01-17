import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MessageSquareIcon, ThumbsUpIcon } from "lucide-react";
import BookmarkButton from "./bookmark";
import Link from "next/link";

interface PostCardProps {
  id: string;
  author: string;
  title: string;
  slug: string;
  logged_in_user: boolean;
}

function PostCard({ id, author, title, slug, logged_in_user }: PostCardProps) {
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
              <ThumbsUpIcon size={16} />
              <span>12</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquareIcon size={16} />
              <span>10 comments</span>
            </div>
          </div>
          {/* Bookmark */}
          {logged_in_user && <BookmarkButton post_id={id} />}
        </div>
      </CardHeader>
    </Card>
  );
}

export default PostCard;
