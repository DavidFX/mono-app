"use client";
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
import { useToast } from "@/components/ui/use-toast";
import { handleLogout } from "./actions";

export default function LogoutPopup() {
  const { toast } = useToast();

  return (
    <Dialog modal>
      <DialogTrigger>
        <div>Logout</div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-center">Logout</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <form action={handleLogout} className="flex gap-3">
          <Button variant="destructive" type="submit">
            Yes
          </Button>
          <DialogClose>
            <Button type="reset" variant="outline">
              No
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
