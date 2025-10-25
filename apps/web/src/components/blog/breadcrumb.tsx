import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import type { Blog } from "contentlayer/generated";

interface BlogPostBreadcrumbProps {
  post: Blog;
}

export function BlogPostBreadcrumb({ post }: BlogPostBreadcrumbProps) {
  return (
    <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
      <Link href="/blog" className="text-foreground hover:underline">
        Posts
      </Link>

      <ChevronRightIcon className="size-4" />

      <span className="truncate">{post.title}</span>
    </div>
  );
}
