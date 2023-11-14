"use client";
import { EditorContent, type Editor } from "@tiptap/react";
import "@/app/styles/editor.scss";

interface EditorProps {
  editor: Editor | null;
}

function MainEditor({ editor }: EditorProps) {
  return (
    <div className="w-full h-full p-3 space-y-4 prose border border-solid rounded-md rounded-t-none">
      <EditorContent editor={editor} />
    </div>
  );
}

export default MainEditor;
