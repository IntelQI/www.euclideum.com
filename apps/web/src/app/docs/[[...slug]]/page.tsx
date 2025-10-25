import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";

import { DashboardTableOfContents } from "@/components/docs/toc";
import { DocumentNotFound } from "@/components/docs/not-found";
import { getTableOfContents } from "@/lib/opendocs/utils/toc";
import { DocBreadcrumb } from "@/components/docs/breadcrumb";
import { getDocFromParams } from "@/lib/opendocs/utils/doc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocHeading } from "@/components/docs/heading";
import { DocsPager } from "@/components/docs/pager";
import { DocLinks } from "@/components/docs/links";
import { Mdx } from "@/components/docs/mdx";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { allDocs } from "contentlayer/generated";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  const [, ...docSlugList] = doc.slugAsParams.split("/");
  const docSlug = docSlugList.join("/") || "";

  return {
    title: doc.title,
    description: doc.description,

    openGraph: {
      type: "article",
      title: doc.title,
      url: absoluteUrl(`/docs/${docSlug}`),
      description: doc.description,

      images: [
        {
          ...siteConfig.og.size,
          url: siteConfig.og.image,
          alt: siteConfig.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [siteConfig.og.image],
      creator: siteConfig.links.twitter.username,
    },
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => {
    const [, ...slugs] = doc.slugAsParams.split("/");
    return { slug: slugs };
  });
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return <DocumentNotFound />;
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <DocBreadcrumb doc={doc} />
        <DocHeading doc={doc} />
        {/* @ts-ignore - Async Server Component */}
        <DocLinks doc={doc} />

        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>

        {/* @ts-ignore - Async Server Component */}
        <DocsPager doc={doc} />
      </div>

      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-fit py-12">
                <DashboardTableOfContents
                  sourceFilePath={doc._raw.sourceFilePath}
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
      )}
    </main>
  );
}
