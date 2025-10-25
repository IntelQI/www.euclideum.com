import { ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";

import type { Doc } from "contentlayer/generated";

import { getBreadcrumb } from "@/lib/opendocs/utils/doc";

interface DocBreadcrumbProps {
  doc: Doc;
}

export function DocBreadcrumb({ doc }: DocBreadcrumbProps) {
  const breadcrumbItems = getBreadcrumb(doc.slug);

  return (
    <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
      <Link href="/docs" className="text-foreground hover:underline">
        Docs
      </Link>

      {breadcrumbItems?.map((item, index, items) => {
        const isLastItem = index === items.length - 1;
        const docTitle =
          typeof item.title === "string"
            ? item.title
            : item.title?.en || String(item.title || "");

        return (
          <Fragment key={index}>
            <ChevronRightIcon className="size-4" />

            {item.href && !isLastItem ? (
              <Link
                href={item.href}
                className="truncate text-foreground font-medium hover:underline"
              >
                {docTitle}
              </Link>
            ) : (
              <span className="truncate">{docTitle}</span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
