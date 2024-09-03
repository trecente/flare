import Link from "next/link";

import { ToggleTheme } from "@/components/toggle-theme";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-background/95 px-10 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href="https://github.com/trecente"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubLogoIcon className="h-6 w-6" />
      </Link>
      <Link
        href="/"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-2xl font-light uppercase tracking-widest text-foreground hover:opacity-90">
          Flare
        </h1>
      </Link>
      <ToggleTheme />
    </header>
  );
}
