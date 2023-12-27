"use client";
// UI components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "@/components/ui/button";

// Supabase client
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutPopup() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Logout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Login to your account to access all features
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => {
              supabase.auth.signOut();
              router.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
