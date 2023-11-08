"use client";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  return <Button onClick={() => setTheme("light")}>Dark</Button>;
}
