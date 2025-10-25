import { type Blog, allBlogs } from "contentlayer/generated";

interface BlogPageParams {
  params: {
    slug?: string[];
  };
}

export function makeSlug(slug?: string[]) {
  return slug?.join("/") || "";
}

export async function getBlogFromParams({
  params,
}: BlogPageParams): Promise<Blog | null> {
  const slug = makeSlug(params.slug);

  if (!slug) {
    return null;
  }

  // Find blog post by matching slug (skip first part which was locale)
  const blog = allBlogs.find((blog) => {
    const [, ...blogSlugParts] = blog.slugAsParams.split("/");
    return blogSlugParts.join("/") === slug;
  });

  return blog || null;
}
