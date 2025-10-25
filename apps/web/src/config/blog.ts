import type { BlogConfig } from "../lib/opendocs/types/blog";

export const blogConfig: BlogConfig = {
  mainNav: [
    {
      href: "/blog",

      title: {
        en: "Blog",
      },
    },
  ],

  authors: [
    {
      /* the id property must be the same as author_id in the blog post mdx files required for the computed field
        in contentlayer.config.ts so we can get the author details from the blogConfig by comparing the author_id
        with the id below
      */
      id: "euclideum-team",
      name: "Euclideum Team",
      image: "/authors/euclideum-team.jpg",
      site: "https://www.euclideum.com",
      email: "contact@euclideum.com",

      bio: "Innovation powerhouse shaping the future across industries",

      social: {
        github: "euclideum",
        twitter: "@euclideum",
        youtube: "euclideum",
        linkedin: "euclideum-solutions",
      },
    },
  ],

  rss: [
    {
      type: "xml",
      file: "blog.xml",
      contentType: "application/xml",
    },

    {
      type: "json",
      file: "blog.json",
      contentType: "application/json",
    },
  ],
} as const;
