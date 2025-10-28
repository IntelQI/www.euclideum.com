"use client";

import { cn } from "@/lib/utils";

export function FallbackGlobe() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-background/80">
      <div className="text-center p-4">
        <p className="text-sm text-muted-foreground">
          3D Globe visualization requires WebGL support.
          <br />
          Please enable hardware acceleration in your browser settings.
        </p>
      </div>
    </div>
  );
}