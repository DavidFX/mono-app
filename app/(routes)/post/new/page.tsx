"use client";
import dynamic from "next/dynamic";
import NewPostHeader from "@/components/editor/new-post-header";

const InputTitle = dynamic(() => import("@/components/editor/input-title"), {
  ssr: false,
});
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Toolbar from "@/components/editor/toolbar";
import MainEditor from "@/components/editor/editor";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your post..." }),
      CharacterCount.configure({ limit: 10000 }),
    ],
    editorProps: {
      attributes: {
        class:
          "w-full h-full border-input border-solid rounded-md focus:outline-none",
      },
    },
    content,
  });

  return (
    <>
      <NewPostHeader />
      <div className="container px-32 space-y-4">
        <h1 className="text-4xl font-bold ">Create a new Post</h1>
        <InputTitle title={title} placeholder="Title..." onChange={setTitle} />
        <Toolbar editor={editor} />
        <MainEditor editor={editor} />
      </div>
    </>
  );
}
