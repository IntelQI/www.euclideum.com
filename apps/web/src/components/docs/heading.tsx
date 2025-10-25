import Balancer from "react-wrap-balancer";

import type { Doc } from "contentlayer/generated";

interface DocHeadingProps {
  doc: Doc;
}

export function DocHeading({ doc }: DocHeadingProps) {
  return (
    <div className="space-y-2">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        {doc.title}
      </h1>

      {doc.description && (
        <p className="text-muted-foreground text-lg">
          <Balancer>{doc.description}</Balancer>
        </p>
      )}
    </div>
  );
}
