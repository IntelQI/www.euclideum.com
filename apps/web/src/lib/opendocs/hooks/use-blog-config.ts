import { useEffect, useState } from "react";

import type { BlogConfig } from "@/lib/opendocs/types/blog";

export function useBlogConfig() {
  const [blogConfig, setBlogConfig] = useState<{
    blog: BlogConfig;
  }>({
    blog: {
      mainNav: [],
      authors: [],
      rss: [],
    },
  });

  useEffect(() => {
    import(`@/config/blog`).then(({ blogConfig }) => {
      setBlogConfig({
        blog: blogConfig,
      });
    });
  }, []);

  return blogConfig;
}
