import { absoluteUrl } from "@/lib/utils";

export const siteConfig = {
  name: "opendocs",

  description:
    "Beautifully designed template that you can use for your projects for free. Accessible. Customizable. Open Source.",

  url: process.env.NEXT_PUBLIC_APP_URL,

  og: {
    image: absoluteUrl("/og.jpg"),

    size: {
      width: 1200,
      height: 630,
    },
  },

  app: {
    latestVersion: "3.0.8",
  },

  author: {
    name: "Dalton Menezes",
    site: "https://daltonmenezes.com",
  },

  links: {
    twitter: {
      label: "Twitter",
      username: "@daltonmenezes",
      url: "https://twitter.com/daltonmenezes",
    },

    github: {
      label: "GitHub",
      url: "https://github.com/daltonmenezes/opendocs",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
