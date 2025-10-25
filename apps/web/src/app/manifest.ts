import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: siteConfig.company.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    theme_color: "#181423",
    background_color: "#ffffff",
    display: "standalone",
    orientation: "portrait",

    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
