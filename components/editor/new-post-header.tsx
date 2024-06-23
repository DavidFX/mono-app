"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

var slugify = require("slugify");

// Supabse
import { createClient } from "@/utils/supabase/client";
import { useToast } from "../ui/use-toast";

interface NewPostHeaderProps {
  title: string;
  content: string;
}

export default function NewPostHeader({ title, content }: NewPostHeaderProps) {
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();

  function string_to_slug(str: string) {
    const sufix = Date.now();
    const slug = slugify(str, {
      lower: true,
      strict: true,
    });

    return `${slug}-${sufix}`;
  }

  const createPost = async (title: string, content: string) => {
    const user_id = (await supabase.auth.getUser()).data.user?.id;

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const isUnique = await supabase
      .from("posts")
      .select("slug")
      .eq("slug", slug);

    console.log(isUnique);

    const { error } = await supabase.from("posts").insert([
      {
        title: title,
        content: content,
        slug: string_to_slug(title),
        author_id: user_id,
      },
    ]);

    if (!error) {
      toast({
        title: "Post created!",
        description: "Your post has been created successfully.",
        variant: "default",
      });
      router.push("/my_posts");
    }
    if (error) {
      toast({
        title: "Post created!",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="container flex items-center justify-between h-12 mx-auto mt-3 mb-10">
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
