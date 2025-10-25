"use client";

import { useSearchParams } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { compareDesc } from "date-fns";
import { useMemo } from "react";
import Link from "next/link";

import type { Blog } from "contentlayer/generated";
import { allBlogs } from "contentlayer/generated";

import { cn, formatDate, truncateText } from "@/lib/utils";
import { BlogPostItemTags } from "./post-item-tags";
import { buttonVariants } from "../ui/button";
import { Pagination } from "./pagination";
import { RSSToggle } from "./rss-toggle";
import { ReadTime } from "./read-time";
import { Card } from "../ui/card";

interface PaginatedBlogPostsProps {
  page?: string;
  tag?: string;
  perPage?: number;
}

export function PaginatedBlogPosts({
  page: pageParam,
  tag: tagParam,
  perPage = 10,
}: PaginatedBlogPostsProps) {
  const searchParams = useSearchParams();
  const tag = tagParam || searchParams.get("tag");
  const page = pageParam || searchParams.get("page");

  const currentPage = page ? parseInt(page, 10) : 1;

  const sortedPosts = useMemo(() => {
    // Filter out locale prefix from slugs
    const posts = allBlogs.map((post) => ({
      ...post,
      cleanSlug: post.slugAsParams.split("/").slice(1).join("/"),
    }));

    return posts.sort((a, b) =>
      compareDesc(new Date(a.date || ""), new Date(b.date || "")),
    );
  }, []);

  const filteredPosts = useMemo(() => {
    if (!tag) return sortedPosts;

    return sortedPosts.filter((post) => post.tags?.includes(tag));
  }, [sortedPosts, tag]);

  const totalPages = Math.ceil(filteredPosts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      <RSSToggle />

      <div className="grid gap-10 sm:grid-cols-2">
        {currentPosts.map((post) => {
          const href = `/blog/${post.cleanSlug}`;

          return (
            <Card
              key={post._id}
              className="flex flex-col overflow-hidden rounded-lg border bg-background p-0"
            >
              <article className="flex flex-col h-full">
                <div className="flex-1 space-y-2 p-6">
                  {post.date && (
                    <div className="flex items-center gap-2">
                      <time
                        className="text-sm text-muted-foreground"
                        dateTime={post.date}
                      >
                        {formatDate(post.date, "en-US")}
                      </time>

                      {post.readTimeInMinutes && (
                        <ReadTime
                          time={post.readTimeInMinutes}
                          messages={{ min_read: "min read" }}
                        />
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{post.title}</h2>

                    {post.excerpt && (
                      <p className="text-muted-foreground">
                        <Balancer>{truncateText(post.excerpt)}</Balancer>
                      </p>
                    )}
                  </div>

                  {post.author && (
                    <div className="text-sm text-muted-foreground">
                      by {post.author.name}
                    </div>
                  )}

                  {post.tags && <BlogPostItemTags tags={post.tags} />}
                </div>

                <div className="px-6 pb-6">
                  <Link
                    href={href}
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Read more
                  </Link>
                </div>
              </article>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          numberOfPages={totalPages}
          totalPages={totalPages}
          currentPage={currentPage}
          messages={{
            next: "Next",
            previous: "Previous",
            go_to_next_page: "Go to next page",
            go_to_previous_page: "Go to previous page",
          }}
        />
      )}
    </div>
  );
}
