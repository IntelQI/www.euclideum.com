"use client";

import { useState } from "react";

import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

// Helper to extract title
const getTitle = (title: any): string => {
  if (typeof title === "string") return title;
  if (title?.en) return title.en;
  return String(title);
};
import { useDocsConfig } from "@/lib/opendocs/hooks/use-docs-config";
import { DocsSidebarNav } from "./docs/sidebar-nav";
import { ScrollArea } from "./ui/scroll-area";
import { siteConfig } from "@/config/site";
import { ThemeLogo } from "@/components/theme-logo";
import { Icons } from "@/components/icons";
import { MobileLink } from "./mobile-link";
import { blogConfig } from "@/config/blog";
import { usePathname } from "@/navigation";
import { Button } from "./ui/button";

interface MobileNavProps {
  menuLinks: JSX.Element;

  messages?: {
    menu: string;
    toggleMenu: string;
  };
}

export function MobileNav({
  messages: propMessages,
  menuLinks,
}: MobileNavProps) {
  const messages = propMessages || {
    menu: "Menu",
    toggleMenu: "Toggle Menu",
  };
  const pathname = usePathname();
  const docsConfig = useDocsConfig();
  const [open, setOpen] = useState(false);

  const shouldDisplayDocsSidebarContent = pathname.startsWith("/docs");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="size-5 text-white" />
          <span className="sr-only">{messages.toggleMenu}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="pr-0">
        <SheetTitle className="sr-only">{messages.menu}</SheetTitle>

        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <ThemeLogo className="mr-2 size-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>

        {menuLinks && (
          <div className="flex phone:hidden flex-col space-y-2 items-end pr-2">
            {menuLinks}
          </div>
        )}

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {/* Main Navigation Items */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Navigation
              </div>
              <MobileLink href="/products" onOpenChange={setOpen}>
                Products
              </MobileLink>
              <MobileLink href="/resources" onOpenChange={setOpen}>
                Resources
              </MobileLink>
              <MobileLink href="/solutions" onOpenChange={setOpen}>
                Solutions
              </MobileLink>
              <MobileLink href="/company" onOpenChange={setOpen}>
                Company
              </MobileLink>
              <MobileLink href="/pricing" onOpenChange={setOpen}>
                Pricing
              </MobileLink>
            </div>

            {/* Action Items */}
            <div className="space-y-2 pt-4 border-t">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </div>
              <MobileLink href="/support" onOpenChange={setOpen}>
                Support
              </MobileLink>
              <MobileLink href="/get-started" onOpenChange={setOpen}>
                Get Started
              </MobileLink>
              <MobileLink href="/signin" onOpenChange={setOpen}>
                Sign In
              </MobileLink>
            </div>

            {/* Language Selector */}
            <div className="space-y-2 pt-4 border-t">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Language
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Icons.globe className="size-4" />
                <span className="text-sm">English</span>
              </div>
            </div>

            {/* Original Blog and Docs Navigation */}
            {blogConfig.mainNav?.map((item) => (
              <MobileLink key={item.href} href="/blog" onOpenChange={setOpen}>
                {getTitle(item.title)}
              </MobileLink>
            ))}

            {docsConfig.docs.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {getTitle(item.title)}
                  </MobileLink>
                ),
            )}
          </div>

          <div className="flex flex-col space-y-2">
            {shouldDisplayDocsSidebarContent && (
              <DocsSidebarNav
                isMobile
                items={docsConfig.docs.sidebarNav}
                handleMobileSidebar={setOpen}
              />
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
