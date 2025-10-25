import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";

import { PaginatedBlogPosts } from "@/components/blog/paginated-posts";
import { BlogPostBreadcrumb } from "@/components/blog/breadcrumb";
import { DashboardTableOfContents } from "@/components/docs/toc";
import { getTableOfContents } from "@/lib/opendocs/utils/toc";
import { BlogPostHeading } from "@/components/blog/heading";
import { BlogPostTags } from "@/components/blog/post-tags";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthorCard } from "@/components/blog/author";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/components/docs/mdx";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { absoluteUrl } from "@/lib/utils";

interface BlogPageProps {
  params: {
    slug?: string[];
  };
  searchParams: { page?: string; tag?: string };
}

export const dynamicParams = true;

function getBlogPostBySlug(slug: string) {
  return allBlogs.find((post) => {
    const [, ...postSlugParts] = post.slugAsParams.split("/");
    return postSlugParts.join("/") === slug;
  });
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const slug = params.slug?.join("/") || "";

  if (!slug) {
    const tags = new Set(
      allBlogs
        .map((blog) => blog.tags)
        .flat()
        .filter(Boolean),
    );

    return {
      title: "Blog",
      description: siteConfig.description,
      keywords: Array.from(tags),

      openGraph: {
        title: "Blog",
        description: siteConfig.description,
        type: "website",
        url: absoluteUrl(`/blog`),

        images: [
          {
            ...siteConfig.og.size,
            url: absoluteUrl(`/blog-og/introducing-blogs-og.jpg`),
            alt: siteConfig.name,
          },
        ],
      },

      twitter: {
        title: "Blog",
        description: siteConfig.description,
        card: "summary_large_image",
        images: [absoluteUrl(`/blog-og/introducing-blogs-og.jpg`)],
      },
    };
  }

  const blogPost = getBlogPostBySlug(slug);

  if (!blogPost) {
    return {};
  }

  const ogImage = absoluteUrl(`/blog/og/${slug}`);

  return {
    title: blogPost.title,
    description: blogPost.excerpt,
    keywords: blogPost.tags,

    authors: blogPost.author?.name
      ? [
          {
            name: blogPost.author.name,
            url: blogPost.author.site,
          },
        ]
      : undefined,

    openGraph: {
      title: blogPost.title,
      description: blogPost.excerpt,
      type: "article",
      url: absoluteUrl(`/blog/${slug}`),
      images: [
        {
          ...siteConfig.og.size,
          url: ogImage,
          alt: blogPost.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: blogPost.excerpt,
      images: [ogImage],
      creator: siteConfig.links.twitter.username,
    },
  };
}

export async function generateStaticParams(): Promise<
  BlogPageProps["params"][]
> {
  return allBlogs.map((blog) => {
    const [, ...slugs] = blog.slugAsParams.split("/");
    return { slug: slugs };
  });
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const slug = params.slug?.join("/") || "";

  if (!slug) {
    return (
      <div className="container py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Latest posts and updates
            </p>
          </div>
        </div>
        <hr className="my-8" />
        <Suspense fallback={<div>Loading...</div>}>
          <PaginatedBlogPosts page={searchParams.page} tag={searchParams.tag} />
        </Suspense>
      </div>
    );
  }

  const blogPost = getBlogPostBySlug(slug);

  if (!blogPost) {
    notFound();
  }

  const toc = await getTableOfContents(blogPost.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <BlogPostBreadcrumb post={blogPost} />
        <BlogPostHeading post={blogPost} />
        <BlogPostTags post={blogPost} />

        <div className="pb-12 pt-8">
          <Mdx code={blogPost.body.code} />
        </div>

        <AuthorCard post={blogPost} />
      </div>

      <div className="hidden text-sm lg:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <ScrollArea className="pb-10">
            <div className="sticky top-16 -mt-10 h-fit py-12">
              <DashboardTableOfContents
                sourceFilePath={blogPost._raw.sourceFilePath}
                toc={toc}
                messages={{
                  onThisPage: "On this page",
                  editPageOnGitHub: "Edit this page on GitHub",
                  startDiscussionOnGitHub: "Start a discussion on GitHub",
                }}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
