"use client";

import { useState, useEffect, useCallback, Fragment, useMemo } from "react";
import { useTheme } from "next-themes";

import type { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import type { NavItemWithChildren } from "@/lib/opendocs/types/nav";

import {
  SunIcon,
  FileIcon,
  MoonIcon,
  LaptopIcon,
  CircleIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/navigation";
import { cn } from "@/lib/utils";

import {
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandDialog,
  CommandSeparator,
} from "./ui/command";

import { useDocsConfig } from "@/lib/opendocs/hooks/use-docs-config";
import { useBlogConfig } from "@/lib/opendocs/hooks/use-blog-config";
import { allBlogs } from "contentlayer/generated";

// Helper to extract title from locale object or string
const getTitle = (title: any): string => {
  if (typeof title === "string") return title;
  if (title?.en) return title.en;
  return String(title);
};

function DocsCommandMenu({
  runCommand,
  messages,
}: {
  runCommand: (command: () => unknown) => void;
  messages: {
    docs: string;
  };
}) {
  const router = useRouter();
  const docsConfig = useDocsConfig();

  function renderItems(items: NavItemWithChildren[]) {
    return items.map((navItem) => {
      if (!navItem.href) {
        return (
          <Fragment key={getTitle(navItem.title)}>
            <CommandGroup heading={getTitle(navItem.title)}>
              {renderItems(navItem.items)}
            </CommandGroup>
          </Fragment>
        );
      }

      return (
        <Fragment key={navItem.href}>
          <CommandItem
            value={getTitle(navItem.title)}
            onSelect={() => {
              runCommand(() => router.push(navItem.href as string));
            }}
          >
            <div className="mr-2 flex size-4 items-center justify-center">
              <CircleIcon className="size-3" />
            </div>

            {getTitle(navItem.title)}
          </CommandItem>

          {navItem?.items?.length > 0 && (
            <CommandGroup>{renderItems(navItem.items)}</CommandGroup>
          )}
        </Fragment>
      );
    });
  }

  return (
    <CommandGroup heading={messages.docs}>
      {docsConfig.docs.sidebarNav.map((group) => (
        <CommandGroup
          key={getTitle(group.title)}
          heading={getTitle(group.title)}
        >
          {renderItems(group.items)}
        </CommandGroup>
      ))}
    </CommandGroup>
  );
}

function BlogCommandMenu({
  runCommand,
  messages,
}: {
  runCommand: (command: () => unknown) => void;
  messages: {
    blog: string;
  };
}) {
  const router = useRouter();

  const posts = useMemo(() => {
    return allBlogs.map((post) => {
      const [, ...slugs] = post.slugAsParams.split("/");
      return {
        ...post,
        cleanSlug: slugs.join("/"),
      };
    });
  }, []);

  return (
    <CommandGroup heading={messages.blog}>
      {posts.map((post) => (
        <CommandItem
          key={post._id}
          value={`${post.title} ${post.excerpt} ${post.tags?.join(" ") || ""}`}
          onSelect={() => {
            runCommand(() => router.push(`/blog/${post.cleanSlug}`));
          }}
        >
          <div className="mx-1 flex size-4 items-center justify-center">
            <FileTextIcon className="size-4" />
          </div>

          <div className="flex flex-col gap-1 p-2 w-full">
            <h1 className="text-lg">{post.title}</h1>
            <p className="truncate">{post.excerpt}</p>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

interface CommandMenuProps extends AlertDialogProps {
  messages?: {
    docs: string;
    blog: string;
    search: string;
    noResultsFound: string;
    searchDocumentation: string;
    typeCommandOrSearch: string;

    themes: {
      theme: string;
      dark: string;
      light: string;
      system: string;
    };
  };
}

export function CommandMenu({
  messages: propMessages,
  ...props
}: CommandMenuProps) {
  const messages = propMessages || {
    docs: "Docs",
    blog: "Blog",
    search: "Search",
    noResultsFound: "No results found",
    searchDocumentation: "Search documentation",
    typeCommandOrSearch: "Type a command or search",
    themes: {
      theme: "Theme",
      dark: "Dark",
      light: "Light",
      system: "System",
    },
  };

  const router = useRouter();
  const { setTheme } = useTheme();
  const docsConfig = useDocsConfig();
  const blogConfig = useBlogConfig();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const mainNavs = useMemo(
    () => [...docsConfig.docs.mainNav, ...blogConfig.blog.mainNav],
    [docsConfig, blogConfig],
  );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "text-muted-foreground relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <FileIcon className="size-4 xl:mr-2" aria-hidden="true" />

        <span className="hidden xl:inline-flex">
          {messages.searchDocumentation}...
        </span>

        <span className="sr-only">{messages.search}</span>

        <kbd className="bg-muted pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr title="Command">⌘</abbr>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={messages.typeCommandOrSearch} />

        <CommandList>
          <CommandEmpty>{messages.noResultsFound}</CommandEmpty>

          {mainNavs.length > 0 && (
            <CommandGroup heading="Links">
              {mainNavs.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={getTitle(navItem.title)}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href || "/"));
                  }}
                >
                  <div className="mr-2 flex size-4 items-center justify-center">
                    <CircleIcon className="size-3" />
                  </div>

                  {getTitle(navItem.title)}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {docsConfig.docs.sidebarNav.length > 0 && (
            <>
              <CommandSeparator />

              <DocsCommandMenu runCommand={runCommand} messages={messages} />
            </>
          )}

          {allBlogs.length > 0 && (
            <>
              <CommandSeparator />

              <BlogCommandMenu runCommand={runCommand} messages={messages} />
            </>
          )}

          <CommandSeparator />

          <CommandGroup heading={messages.themes.theme}>
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 size-4" />
              {messages.themes.light}
            </CommandItem>

            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 size-4" />
              {messages.themes.dark}
            </CommandItem>

            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 size-4" />
              {messages.themes.system}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
