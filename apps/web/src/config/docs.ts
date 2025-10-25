/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/mobile-nav.tsx
 * - src/app/docs/layout.tsx
 * - src/components/docs/pager.tsx
 */

import type { DocsConfig } from "@/lib/opendocs/types/docs";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      href: "/docs",

      title: {
        en: "Documentation",
      },
    },
  ],

  sidebarNav: [
    {
      title: {
        en: "Getting Started",
      },

      items: [
        {
          href: "/docs",

          title: {
            en: "Introduction",
          },

          items: [],
        },

        {
          href: "/docs/adding-new-docs",

          title: {
            en: "Adding new docs",
          },

          items: [],
        },

        {
          href: "/docs/customizing",

          title: {
            en: "Customizing",
          },

          items: [],
        },

        {
          title: {
            en: "MDX",
          },

          label: {
            en: "New",
          },

          items: [
            {
              href: "/docs/mdx/frontmatter",

              title: {
                en: "Frontmatter",
              },

              label: {
                en: "New",
              },

              items: [],
            },

            {
              href: "/docs/mdx/code",

              title: {
                en: "Code",
              },

              label: {
                en: "New",
              },

              items: [],
            },

            {
              href: "/docs/mdx/components",

              title: {
                en: "Components",
              },

              label: {
                en: "New",
              },

              items: [],
            },
          ],
        },

        {
          href: "/docs/changelog",

          title: {
            en: "Changelog",
          },

          items: [],
        },
      ],
    },
  ],
} as const;
