"use client";
import dynamic from "next/dynamic";
import NewPostHeader from "@/components/editor/new-post-header";

const InputTitle = dynamic(() => import("@/components/editor/input-title"), {
  ssr: false,
});

import { useState, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "@/components/editor/toolbar";
import MainEditor from "@/components/editor/editor";
import { useRouter } from "next/navigation";
import { readUserSession } from "@/utils/server/actions";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "w-full h-full border-input border-solid rounded-md focus:outline-none",
      },
    },
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    async function userSession() {
      const { data } = await readUserSession();
      if (!data.session?.user) {
        router.push("/");
      }
    }

    userSession();
  }, []);

  return (
    <>
      <NewPostHeader title={title} content={content} />
      <div className="container mx-auto space-y-4 lg:px-32">
        <h1 className="text-4xl font-bold ">New post</h1>
        <InputTitle title={title} placeholder="Title..." onChange={setTitle} />
        <div className="relative">
          <Toolbar editor={editor} />
          <MainEditor editor={editor} />
        </div>
      </div>
    </>
  );
}
