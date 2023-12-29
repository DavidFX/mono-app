"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

// Supabse
import { createClient } from "@/utils/supabase/client";
const supabase: SupabaseClient = createClient();
import { type SupabaseClient } from "@supabase/supabase-js";
import { useToast } from "../ui/use-toast";

interface NewPostHeaderProps {
  title: string;
  content: string;
}

// Create a slug from a string
function string_to_slug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

export default function NewPostHeader({ title, content }: NewPostHeaderProps) {
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();

  const createPost = async (title: string, content: string) => {
    const { error } = await supabase.from("posts").insert([
      {
        title: title,
        content: content,
        slug: string_to_slug(title.toLowerCase()),
      },
    ]);

    if (!error) {
      toast({
        title: "Post created!",
        description: "Your post has been created successfully.",
        variant: "default",
      });
      router.push(`/post/${string_to_slug(title.toLowerCase())}`);
    }
    if (error) {
      console.log(error);
    }
  };

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
        <Button
          onClick={() => {
            createPost(title, content);
          }}
        >
          Save
        </Button>
      </div>
    </header>
  );
}
