"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThemeLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ThemeLogo({ className, width = 20, height }: ThemeLogoProps) {
  // Original SVG dimensions: 311x504 (vertically rectangular)
  const aspectRatio = 311 / 504; // width/height = ~0.617
  const calculatedHeight = height || width / aspectRatio;

  return (
    <>
      {/* Light theme logo */}
      <Image
        src="/logo_light.svg"
        alt="Euclideum Logo"
        width={width}
        height={calculatedHeight}
        className={cn(className, "dark:hidden")}
        style={{
          width: `${width}px`,
          height: "auto",
          maxHeight: `${calculatedHeight}px`,
        }}
        priority
      />
      {/* Dark theme logo */}
      <Image
        src="/logo_dark.svg"
        alt="Euclideum Logo"
        width={width}
        height={calculatedHeight}
        className={cn(className, "hidden dark:block")}
        style={{
          width: `${width}px`,
          height: "auto",
          maxHeight: `${calculatedHeight}px`,
        }}
        priority
      />
    </>
  );
}
