"use client";

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
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export default function LogoutPopup() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Logout</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-center">Logout</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={handleLogout}>
            Yes
          </Button>
          <DialogClose>
            <Button variant="outline">No</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
