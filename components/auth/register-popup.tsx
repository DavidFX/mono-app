import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";

export default function RegisterPopup() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Register to start sharing your articles!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
