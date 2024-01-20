import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";

export function useBookmark(
  post_id: string | undefined,
  user_id: string | undefined
) {
  const supabase = createClient();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if post is bookmarked
  const checkIfBookmarked = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select()
      .eq("post_id", post_id)
      .eq("user_id", user_id)
      .single();
    if (data) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  // Add to bookmarks function
  const addToBookmarks = async () => {
    await supabase
      .from("bookmarks")
      .insert({ post_id: post_id, user_id: user_id });

    setIsBookmarked(true);
  };

  // Remove from bookmarks function
  const removeFromBookmarks = async () => {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user_id);

    setIsBookmarked(false);
  };

  // Toggle bookmark function
  const toggleBookmark = () => {
    if (isBookmarked) {
      removeFromBookmarks();
    } else {
      addToBookmarks();
    }
  };

  // Check if bookmarked on mount
  useEffect(() => {
    try {
      checkIfBookmarked();
    } catch (error) {
      console.error(error);
    }
  }, [isBookmarked]);

  return { isBookmarked, toggleBookmark };
}
