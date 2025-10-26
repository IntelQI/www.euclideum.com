import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.company.name}`,
    },

    description: siteConfig.description,

    keywords: [
      "euclideum",
      "euclideum solutions",
      "technology company",
      "software development",
      "cloud infrastructure",
      "enterprise solutions",
      "educational technology",
      "edtech",
      "IQ development",
      "learning platforms",
      "innovation",
      "AI solutions",
      "digital transformation",
    ],

    authors: [
      {
        name: siteConfig.company.name,
        url: siteConfig.url,
      },
    ],

    creator: siteConfig.company.name,
    publisher: siteConfig.company.name,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      siteName: siteConfig.name,

      description: siteConfig.description,

      images: [
        {
          ...siteConfig.og.size,
          alt: siteConfig.name,
          url: siteConfig.og.image,
        },
      ],
    },

    twitter: {
      creator: siteConfig.links.twitter.username,
      title: siteConfig.name,
      card: "summary_large_image",
      images: [siteConfig.og.image],

      description: siteConfig.description,
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon-16x16.png",
    },

    manifest: `${siteConfig.url}/site.webmanifest`,
  };
}

export const dynamicParams = true;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: AppLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#012b43" />
      </head>

      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div>
            <div className="relative z-10 flex min-h-screen flex-col">
              <SiteHeader />

              <main className="flex-1">{children}</main>

              <SiteFooter />
            </div>

            <div className="fixed left-0 top-0 size-full bg-gradient-to-b from-[#a277ff] via-transparent to-transparent opacity-10" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
