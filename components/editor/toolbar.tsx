import { type Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Quote,
  Code2,
  Heading2,
  ListOrdered,
  List,
} from "lucide-react";

import { Toggle } from "../ui/toggle";

import React from "react";

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="w-full h-full p-3 space-y-4 border border-solid rounded-md">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={editor.chain().focus().toggleHeading({ level: 2 }).run}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
    </div>
  );
}

export default Toolbar;
