import { ExternalLinkIcon } from "lucide-react";

import type { Doc } from "contentlayer/generated";

import { badgeVariants } from "../ui/badge";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

export async function DocLinks({ doc }: { doc: Doc }) {
  if (!doc?.links) {
    return null;
  }

  // Hardcoded English labels
  const labels = {
    source: "Source",
    docs: "Docs",
    api_reference: "API Reference",
    blog: "Blog",
  };

  return (
    <div className="flex items-center space-x-2 pt-4">
      {doc.links?.source && (
        <Link
          href={doc.links.source}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
        >
          {labels.source}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}

      {doc.links?.doc && (
        <Link
          href={doc.links.doc}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
        >
          {labels.docs}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}

      {doc.links?.api && (
        <Link
          href={doc.links.api}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
        >
          {labels.api_reference}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}

      {doc.links?.blog && (
        <Link
          href={doc.links.blog}
          target="_blank"
          rel="noreferrer"
          className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
        >
          {labels.blog}

          <ExternalLinkIcon className="size-3" />
        </Link>
      )}
    </div>
  );
}
