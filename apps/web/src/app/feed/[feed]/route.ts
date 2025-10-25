import { NextResponse } from "next/server";
import { Feed, type Item } from "feed";

import type { RSSFeed } from "@/lib/opendocs/types/blog";

import { allBlogs, type Blog } from "contentlayer/generated";
import { siteConfig } from "@/config/site";
import { blogConfig } from "@/config/blog";
import { absoluteUrl } from "@/lib/utils";

function generateWebsiteFeeds({
  file,
  posts,
}: {
  posts: Blog[];
  file: RSSFeed["file"];
}) {
  const feed = new Feed({
    id: file,
    generator: siteConfig.name,
    copyright: siteConfig.name,
    image: siteConfig.og.image,
    language: "en",
    title: `Blog - ${siteConfig.name}`,
    favicon: absoluteUrl("/favicon.ico"),
    link: absoluteUrl(`/feed/${file}`),
    description: siteConfig.description,
  });

  const blogFeedEntries = posts.map((post) => {
    const [, ...postSlugList] = post.slugAsParams.split("/");
    const postSlug = postSlugList.join("/") || "";
    const link = absoluteUrl(`/blog/${postSlug}`);

    return {
      id: link,
      link,
      title: post.title,
      description: post.excerpt,
      date: new Date(post.date || Date.now()),

      author: [
        {
          name: post.author?.name,
          link: post.author?.site,
          email: post.author?.email || " ",
        },
      ],
    } as Item;
  });

  for (const blogFeedEntry of blogFeedEntries) {
    feed.addItem(blogFeedEntry);
  }

  return new Map<string, Feed>([[file, feed]]);
}

const provideWebsiteFeeds = ({ feed }: { feed: string }) => {
  const websiteFeeds = generateWebsiteFeeds({
    file: feed,
    posts: allBlogs,
  });

  switch (feed) {
    case "blog.xml":
      return websiteFeeds.get(feed)?.rss2();

    case "blog.json":
      return websiteFeeds.get(feed)?.json1();

    default:
      return undefined;
  }
};

type StaticParams = {
  params: { feed: RSSFeed["file"] };
};

export const generateStaticParams = async (): Promise<
  StaticParams["params"][]
> => {
  return blogConfig.rss.map(({ file }) => ({ feed: file }));
};

export const GET = async (_: Request, { params }: StaticParams) => {
  const websiteFeed = provideWebsiteFeeds({
    feed: params.feed,
  });

  const feed = blogConfig.rss.find((rss) => rss.file === params.feed);

  const contentType = String(
    feed?.contentType || blogConfig.rss?.[0]?.contentType,
  );

  return new NextResponse(websiteFeed, {
    status: websiteFeed ? 200 : 404,
    headers: {
      "Content-Type": contentType,
    },
  });
};

export const dynamicParams = true;
export const dynamic = "force-static";

const VERCEL_REVALIDATE = Number(
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  process.env.NEXT_PUBLIC_VERCEL_REVALIDATE_TIME || 300,
);

export const revalidate = VERCEL_REVALIDATE;
