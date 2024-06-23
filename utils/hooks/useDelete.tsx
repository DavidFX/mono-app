import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function useDelete(post_id: string | undefined) {
  const supabase = createClient();
  const { toast } = useToast();
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();

  // Delete post function
  const deletePost = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", post_id);
    setIsDeleted(true);

    if (error) {
      toast({
        description: `${error.message}`,
        variant: "default",
      });
    } else {
      toast({
        description: "Post deleted",
        variant: "default",
      });
      router.refresh();
    }
  };

  return { isDeleted, deletePost };
}
