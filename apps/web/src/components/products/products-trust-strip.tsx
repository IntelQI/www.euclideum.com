"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming cn is at this path
import { useEffect, useState } from "react";

// --- Mock Logo Data ---
// Using mock SVGs to control color and simulate different aspect ratios.
// In a real app, you would <img src="..." />
const logos = [
  {
    src: "https://webimages.mongodb.com/_com_assets/cms/kumqo658mam8gah8c-LibertyMutual.svg?auto=format%252Ccompress",
    viewBox: "0 0 100 30",
  },
  {
    src: "https://webimages.mongodb.com/_com_assets/cms/kumqoou5gtpuiwxbs-Sega.svg?auto=format%252Ccompress",
    viewBox: "0 0 80 30",
  },
  {
    src: "https://webimages.mongodb.com/_com_assets/cms/m2on54kf2d5m0gmuu-Indeed-logo-black.svg?auto=format%252Ccompress",
    viewBox: "0 0 120 30",
  },
  {
    src: "https://webimages.mongodb.com/_com_assets/cms/lzk2zclsbhx3j3l29-cisco%201%20(1).svg?auto=format%252Ccompress",
    viewBox: "0 0 90 30",
  },
];

/**
 * A helper component to render a mock SVG logo.
 * This ensures the color can be controlled by the `isDark` state.
 */
const MockLogo = ({
  name,
  viewBox,
  colorClass,
}: {
  name: string;
  viewBox: string;
  colorClass: string;
}) => (
  <svg
    viewBox={viewBox}
    className={cn(
      "max-h-[24px] lg:max-h-[32px]", // Responsive height (22-28px mobile, 28-36px desktop)
      "w-auto h-full",
      colorClass, // Applies the monochrome color
    )}
    aria-hidden="true" // Decorative
    fill="currentColor"
  >
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontSize="14"
      fontWeight="bold"
    >
      {name}
    </text>
  </svg>
);

/**
 * A minimalist trust strip for showcasing customer logos as social proof.
 */
export function LogoTrustStrip({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (theme == "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);

  // Determine the monochrome color for logos
  const logoColorClass = isDark
    ? "text-[#93A6B3]" // dark: text-300 (muted gray)
    : "text-[#5F6C7B]"; // light: text-600 (deep slate)

  return (
    // Section wrapper: Full-width, clean background, generous vertical padding
    <section
      className={cn(
        "w-full bg-background",
        "py-12 md:py-16", // ~48px - 64px padding

        className,
      )}
    >
      {/* Centered inner container */}
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Overline text */}
        <p
          className={cn(
            "text-center text-xs font-medium uppercase",
            "tracking-[0.15em]", // Wide letter-spacing
            "mb-6", // 24px gap (fits 20-28px)
            isDark
              ? "text-[#20D97A]" // dark: link-500 (muted brand tint)
              : "text-[#18895E]", // light: link-600 (muted brand tint)
          )}
        >
          TRUSTED BY THOUSANDS OF ORGANIZATIONS, INCLUDING
        </p>

        {/* Logo Grid:
          - Mobile (default): 2x2 grid
          - Desktop (lg): 1x4 row
        */}
        <div
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4",
            "items-center justify-items-center",
            "gap-y-10 gap-x-4 mt-10", // Gaps for 2x2 layout
          )}
        >
          {logos.map((logo) => (
            <img
              src={logo.src}
              alt={`Partner company logo`}
              className={cn(
                "h-6 sm:h-7 md:h-10 w-auto object-contain transition-opacity duration-200", // Adjusted md:h for better visual parity with desktop description
                isDark
                  ? "opacity-80 hover:opacity-100 filter invert sepia-100 saturate-0 hue-rotate-[200deg] brightness-200"
                  : "opacity-90 hover:opacity-100",
              )}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
