"use client";
import { Trash2Icon } from "lucide-react";
// UI components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";

import { Button } from "@/components/ui/button";

import { deletePost } from "./actions";
import { useDelete } from "@/utils/hooks/useDelete";

export default function DeletePopup({ id }: { id: string }) {
  // const deletePostWithUserID = deletePost.bind(null, id);
  const { isDeleted, deletePost } = useDelete(id);

  return (
    <Dialog modal>
      <DialogTrigger>
        <Button variant="outline">
          <Trash2Icon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <DialogClose className="w-full">Cancel</DialogClose>
          <Button className="w-full" variant="destructive" onClick={deletePost}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
