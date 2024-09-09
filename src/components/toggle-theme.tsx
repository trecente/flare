"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button onClick={handleToggle} variant="outline" size="icon">
      <Sun
        strokeWidth={1.5}
        className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
