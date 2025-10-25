import type { MetadataRoute } from "next";

import { allBlogs, allDocs } from "contentlayer/generated";
import { absoluteUrl } from "@/lib/utils";

type Sitemap = MetadataRoute.Sitemap;

export default function sitemap(): Sitemap {
  const paths: Sitemap = [
    {
      url: absoluteUrl(`/`),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl(`/docs`),
      lastModified: new Date(),
    },
    {
      url: absoluteUrl(`/blog`),
      lastModified: new Date(),
    },
  ];

  const docPaths: Sitemap = allDocs.map((doc) => {
    const [, ...docSlugList] = doc.slugAsParams.split("/");
    const docSlug = docSlugList.join("/") || "";

    return {
      url: absoluteUrl(`/docs/${docSlug}`),
      lastModified: new Date(),
    };
  });

  const blogPaths: Sitemap = allBlogs.map((post) => {
    const [, ...postSlugList] = post.slugAsParams.split("/");
    const postSlug = postSlugList.join("/") || "";

    return {
      url: absoluteUrl(`/blog/${postSlug}`),
      lastModified: new Date(),
    };
  });

  return [...paths, ...docPaths, ...blogPaths];
}
