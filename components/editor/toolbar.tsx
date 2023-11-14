import { type Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Quote,
  Code2,
  Heading2,
  ListOrdered,
  List,
  Heading3,
  Strikethrough,
  Undo,
  Redo,
} from "lucide-react";

import { Toggle } from "../ui/toggle";

import React from "react";

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="flex flex-row flex-wrap items-center flex-grow w-full h-full gap-3 p-3 border border-b-0 rounded-md rounded-b-none borfer-x-1 border-t-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        // onPressedChange={editor.chain().focus().toggleHeading({ level: 2 }).run}
      >
        <Heading2 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        // onPressedChange={editor.chain().focus().toggleHeading({ level: 3 }).run}
      >
        <Heading3 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        // onPressedChange={editor.chain().focus().toggleBold().run}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        // onPressedChange={editor.chain().focus().toggleItalic().run}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
        // onPressedChange={editor.chain().focus().toggleCode().run}
      >
        <Code2 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        // onPressedChange={editor.chain().focus().toggleBlockquote().run}
      >
        <Quote className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        // onPressedChange={editor.chain().focus().toggleBulletList().run}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        // onPressedChange={editor.chain().focus().toggleOrderedList().run}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        // onPressedChange={editor.chain().focus().toggleStrike().run}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("undo")}
        onClick={() => editor.chain().focus().undo().run()}
        // onPressedChange={editor.chain().focus().undo().run}
      >
        <Undo className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("redo")}
        onClick={() => editor.chain().focus().redo().run()}
        // onPressedChange={editor.chain().focus().redo().run}
      >
        <Redo className="w-4 h-4" />
      </Toggle>
    </div>
  );
}

export default Toolbar;
