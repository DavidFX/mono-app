"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  if (theme === "dark") {
    return (
      <Sun
        className="w-4 h-4 cursor-pointer"
        onClick={() => setTheme("light")}
      />
    );
  } else {
    return (
      <Moon
        className="w-4 h-4 cursor-pointer"
        onClick={() => setTheme("dark")}
      />
    );
  }
}
