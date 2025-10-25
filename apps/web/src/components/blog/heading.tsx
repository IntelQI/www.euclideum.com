import Balancer from "react-wrap-balancer";

import type { Blog } from "contentlayer/generated";

import { cn, formatDate } from "@/lib/utils";
import { ReadTime } from "./read-time";

interface BlogPostHeadingProps {
  post: Blog;
}

export function BlogPostHeading({ post }: BlogPostHeadingProps) {
  return (
    <div className="flex flex-col space-y-2 gap-2">
      <h1
        className={cn(
          "scroll-m-20 text-4xl sm:text-6xl font-bold tracking-tight",
        )}
      >
        <Balancer>{post.title}</Balancer>
      </h1>

      <div className="flex flex-col">
        <ReadTime
          iconSize={13}
          variant="unstyled"
          time={post.readTimeInMinutes}
          className="text-md max-w-max"
          messages={{ min_read: "min read" }}
        />

        <div className="inline-flex flex-wrap items-center gap-2">
          <time dateTime={post.date} className="text-sm text-gray-500">
            {formatDate(post.date, "en-US")}
          </time>

          {post.author?.name && (
            <span className="truncate max-w-52">
              <Balancer>by {post.author?.name}</Balancer>
            </span>
          )}
        </div>
      </div>

      {post.excerpt && (
        <p className="text-muted-foreground text-xl">
          <Balancer>{post.excerpt}</Balancer>
        </p>
      )}
    </div>
  );
}
