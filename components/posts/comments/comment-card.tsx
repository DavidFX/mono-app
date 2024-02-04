"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommentCardProps {
  name: string;
  comment: string;
  isAuthor?: boolean;
  id: string;
}

export default function CommentCard({
  comment,
  name,
  id,
  isAuthor,
}: CommentCardProps) {
  const supbase = createClient();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await supbase.from("comments").delete().eq("id", id);

    if (error) {
      return toast({
        title: "Error deleting comment",
        description: error.message,
      });
      router.refresh();
    } else {
      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted",
      });
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        {isAuthor ? (
          <CardTitle className="flex justify-between">
            {name}

            <XIcon className="cursor-pointer" onClick={handleDelete} />
          </CardTitle>
        ) : (
          <CardTitle className="flex justify-between">{name}</CardTitle>
        )}
      </CardHeader>
      <CardContent>{comment}</CardContent>
    </Card>
  );
}
