"use client";
import TextareaAutosize from "react-textarea-autosize";

interface InputTitleProps {
  title: string;
  onChange: (title: string) => void;
  placeholder: string;
}

export default function InputTitle({
  title,
  onChange,
  placeholder,
}: InputTitleProps) {
  return (
    <div className="w-full">
      <TextareaAutosize
        autoFocus
        onChange={(e) => onChange(e.target.value)}
        value={title}
        placeholder={placeholder}
        className="w-full h-16 px-3 py-2 text-3xl border border-solid rounded-md focus:outline-none"
      />
    </div>
  );
}
