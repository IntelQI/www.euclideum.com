"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ThemeLogo({ className, width = 15, height = 15 }: ThemeLogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div 
        className={className}
        style={{ width, height }}
        aria-label="Euclideum Logo"
      />
    );
  }

  // Use resolvedTheme to handle system theme preference
  const currentTheme = resolvedTheme || theme;
  const logoSrc = currentTheme === "dark" ? "/logo_dark.svg" : "/logo_light.svg";

  // Calculate aspect ratio: original SVG is 311x504, so ratio is ~0.617
  const aspectRatio = 311 / 504;
  const calculatedHeight = width / aspectRatio;

  return (
    <Image
      src={logoSrc}
      alt="Euclideum Logo"
      width={width}
      height={calculatedHeight}
      className={className}
      style={{ 
        width: `${width}px`, 
        height: `${calculatedHeight}px`,
        objectFit: 'contain'
      }}
      priority
    />
  );
}
