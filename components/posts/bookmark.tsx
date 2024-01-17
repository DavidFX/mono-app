import { BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";

interface BookmarkButtonProps {
  post_id: string;
}

function BookmarkButton({ post_id }: BookmarkButtonProps) {
  return (
    <Button>
      <BookmarkIcon size={16} />
    </Button>
  );
}

export default BookmarkButton;
