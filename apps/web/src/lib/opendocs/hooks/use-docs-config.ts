import { useEffect, useState } from "react";

import type { DocsConfig } from "@/lib/opendocs/types/docs";

export function useDocsConfig() {
  const [docsConfig, setDocsConfig] = useState<{
    docs: DocsConfig;
  }>({
    docs: {
      mainNav: [],
      sidebarNav: [],
    },
  });

  useEffect(() => {
    import(`@/config/docs`).then(({ docsConfig }) => {
      setDocsConfig({
        docs: docsConfig,
      });
    });
  }, []);

  return docsConfig;
}
