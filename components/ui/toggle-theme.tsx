"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./button";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  if (theme === "dark") {
    return (
      <Button onClick={() => setTheme("light")} variant="ghost">
        <Sun className="w-5 h-5 cursor-pointer" />
      </Button>
    );
  } else {
    return (
      <Button onClick={() => setTheme("dark")} variant="ghost">
        <Moon className="w-5 h-5 cursor-pointer" />
      </Button>
    );
  }
}
