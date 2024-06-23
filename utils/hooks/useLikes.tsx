import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { readUserSession } from "../server/actions";

export function useLikes(
  post_id: string | undefined,
  user_id: string | undefined
) {
  const supabase = createClient();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const checkIfLiked = async () => {
    const { data } = await supabase
      .from("likes")
      .select("*, user_id, post_id")
      .eq("post_id", post_id)
      .eq("user_id", user_id)
      .single();
    if (data) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  // Add like function
  const addLike = async () => {
    await supabase.from("likes").insert({ post_id: post_id, user_id: user_id });
    setIsLiked(true);
  };

  // Remove like function
  const removeLike = async () => {
    await supabase
      .from("likes")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user_id);
    setIsLiked(false);
  };

  // Toggle like function
  const toggleLike = () => {
    if (isLiked) {
      removeLike();
      router.refresh();
    } else {
      addLike();
      router.refresh();
    }
  };

  // Check if liked on mount
  useEffect(() => {
    try {
      checkIfLiked();
    } catch (error) {
      console.error(error);
    }
  }, [isLiked]);

  return { isLiked, toggleLike };
}
