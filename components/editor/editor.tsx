"use client";
import { EditorContent, type Editor } from "@tiptap/react";

interface EditorProps {
  editor: Editor | null;
}

function MainEditor({ editor }: EditorProps) {
  return (
    <div className="w-full h-full p-3 space-y-4 border border-solid rounded-md">
      <EditorContent editor={editor} />
    </div>
  );
}

export default MainEditor;
