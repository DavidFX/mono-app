"use client";
import { BookmarkIcon, MessageSquareIcon, ThumbsUpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { useBookmark } from "@/utils/hooks/useBookmark";
import { useLikes } from "@/utils/hooks/useLikes";

interface LikesProps {
  likes: number;
  comments: number;
  bookmarks: number;
  post_id: string;
  user_id: string;
}

export default function Likes({
  likes,
  comments,
  bookmarks,
  post_id,
  user_id,
}: LikesProps) {
  const { isBookmarked, toggleBookmark } = useBookmark(post_id, user_id);
  const { isLiked, toggleLike } = useLikes(post_id, user_id);

  let classes =
    "hover:text-destructive transition-all duration-300 ease-in-out text-center space-y-2 cursor-pointer hover:scale-110 font-bold";

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-3 p-4 border rounded-sm h-fit">
        {/* Likes */}
        {!isLiked ? (
          <Tooltip>
            <TooltipTrigger>
              <div>
                <ThumbsUpIcon
                  onClick={toggleLike}
                  className={classes}
                  size={24}
                />
                <span>{likes}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Leave a like</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <div>
                <ThumbsUpIcon
                  onClick={toggleLike}
                  className={classes + " text-destructive"}
                  size={24}
                />
                <span>{likes}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Remove the like</TooltipContent>
          </Tooltip>
        )}

        {/* Bookmark */}
        {!isBookmarked ? (
          <Tooltip>
            <TooltipTrigger>
              <div>
                <BookmarkIcon
                  onClick={toggleBookmark}
                  className={classes}
                  size={24}
                />
                <span>{bookmarks}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Save to bookmarks</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <div>
                <BookmarkIcon
                  onClick={toggleBookmark}
                  className={classes + " text-destructive"}
                  size={24}
                />
                <span>{bookmarks}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Remove from bookmarks</TooltipContent>
          </Tooltip>
        )}

        {/* Comments */}
        <Tooltip>
          <TooltipTrigger>
            <a href="#comments">
              <div>
                <MessageSquareIcon className={classes} size={24} />
                <span>{comments}</span>
              </div>
            </a>
          </TooltipTrigger>
          <TooltipContent>Jump to comment section</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
