import { type Doc, allDocs } from "contentlayer/generated";

import type { NavItem, SidebarNavItem } from "../types/nav";

import { docsConfig } from "@/config/docs";

interface DocPageParams {
  params: {
    slug?: string[];
  };
}

export function makeSlug(slug?: string[]) {
  return slug?.join("/") || "";
}

export async function getDocFromParams({
  params,
}: DocPageParams): Promise<Doc | null> {
  const slug = makeSlug(params.slug);

  // Find doc by matching slug (skip first part which was locale)
  const doc = allDocs.find((doc) => {
    const [, ...docSlugParts] = doc.slugAsParams.split("/");
    return docSlugParts.join("/") === slug;
  });

  return doc || null;
}

export function getBreadcrumb(docSlug: string) {
  // Remove 'en/' prefix if it exists
  const slug = docSlug.replace(/^en\//, "");

  const findBreadcrumbPath = (
    items: SidebarNavItem[],
    slug: string,
    path: SidebarNavItem[] = [],
  ): NavItem[] | null => {
    for (const item of items) {
      const newPath = [...path, item];

      // Compare without leading slash
      const itemHref = item.href?.replace(/^\//, "");
      const searchSlug = slug.replace(/^\//, "");

      if (itemHref === searchSlug) {
        return newPath;
      }

      if (item.items) {
        const foundPath = findBreadcrumbPath(item.items, slug, newPath);

        if (foundPath) {
          return foundPath;
        }
      }
    }

    return null;
  };

  const makeBreadcrumb = (
    slug: string,
    config: typeof docsConfig,
  ): NavItem[] | null => {
    for (const nav of config.sidebarNav) {
      const path = findBreadcrumbPath([nav], slug);

      if (path) {
        return path;
      }
    }

    return null;
  };

  const breadcrumbs = makeBreadcrumb(slug, docsConfig);

  return breadcrumbs || [];
}
