"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

export default function NewPostHeader() {
  const router = useRouter();

  return (
    <header className="container flex items-center justify-between h-12 mt-3 mb-10">
      <Link
        href="/"
        className="px-2 py-2 font-mono text-2xl font-bold leading-none rounded-md text-background bg-primary"
      >
        MONO
      </Link>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </header>
  );
}
