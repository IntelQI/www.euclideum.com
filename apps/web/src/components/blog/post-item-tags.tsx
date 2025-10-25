"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

import type { Blog } from "contentlayer/generated";

import { PaginationEllipsis } from "../ui/pagination";
import { Badge } from "../ui/badge";

export function BlogPostItemTags({
  post,
  tags: tagsProp,
  limitOfTagsToDisplay = 5,
}: {
  post?: Blog;
  tags?: string[];
  limitOfTagsToDisplay?: number;
}) {
  const searchParams = useSearchParams();

  const postTags = post?.tags || tagsProp || [];
  const totalOfTags = postTags.length;
  const shouldDisplayEllipsis = totalOfTags > limitOfTagsToDisplay;

  const tags = useMemo(() => {
    if (!postTags || postTags.length === 0) {
      return null;
    }

    const tagsToShow = shouldDisplayEllipsis
      ? postTags.slice(0, limitOfTagsToDisplay)
      : postTags;

    const uniqueTags = Array.from(new Set(tagsToShow));

    return uniqueTags;
  }, [postTags, limitOfTagsToDisplay, shouldDisplayEllipsis]);

  if (!tags) {
    return null;
  }

  return (
    <div className="w-fit flex flex-wrap items-center gap-2 pt-4">
      {tags.map((tag) => {
        const currentTag = searchParams.get("tag") || "";
        const isCurrentTagActive = tag === currentTag;

        const href = isCurrentTagActive
          ? "/blog"
          : `/blog?tag=${encodeURI(tag)}`;

        return (
          <Link key={tag} href={href}>
            <Badge variant={isCurrentTagActive ? "default" : "secondary"}>
              {tag}
            </Badge>
          </Link>
        );
      })}

      {shouldDisplayEllipsis && (
        <Badge variant="secondary" className="pointer-events-none">
          <PaginationEllipsis className="w-fit h-full" />
        </Badge>
      )}
    </div>
  );
}
