import Link from "next/link";

import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { ThemeLogo } from "@/components/theme-logo";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <ThemeLogo className="size-6" />
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </Link>

        {/* Right: Theme Toggle + Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
}
