"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming cn is at this path
import { useEffect, useState } from "react";

interface BoostSkillsCardProps {
  className?: string;
  // Prop to allow the illustration SVG source to be passed in, making the component more reusable.
  illustrationSrc: string;
}

/**
 * A full-width promotional hero card to "Boost MongoDB Atlas skills,"
 * featuring a dark teal background and a large rounded-rectangle shape.
 *
 * @param {string} illustrationSrc - The URL or path to the SVG illustration.
 * @param {string} [className] - Optional additional CSS classes for the section container.
 */
export function BoostSkillsCard({
  className,
  illustrationSrc,
}: BoostSkillsCardProps) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  // Determine current theme for conditional styling
  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);

  interface BoostSkillsCardProps {
    className?: string;

    illustrationSrc: string;
  }

  const DecorativeBlobs = () => (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      role="presentation"
      // Using a 16:9-ish viewBox, 'slice' will ensure it fills the container
      viewBox="0 0 1000 562"
      preserveAspectRatio="xMidYMid slice"
    >
      {/*
      Outer, larger, mid-tone wave.
      Fill: #12202A (corresponds to --bg-750)
    */}
      <path
        fill="#01684b"
        d="M 1000 0 L 1000 562 C 970 562, 940 550, 900 530 C 800 470, 750 480, 650 490 C 500 500, 450 400, 520 300 C 590 200, 750 130, 900 90 C 950 70, 980 60, 1000 50 L 1000 0 Z"
      />

      <path
        fill="#162632"
        d="M 1000 562 C 950 562, 920 542, 880 512 C 800 462, 850 412, 920 442 C 970 462, 1000 512, 1000 562 Z"
      />
    </svg>
  );

  // --- Color Tokens (following your style of local JS variables with hardcoded hex) ---
  // Background for the main card canvas
  const canvasColor = isDark ? "bg-background" : "bg-[#17232E]"; // Refers to --bg-900 (dark) / --text-900 (light, effectively the dark canvas color in light mode)
  // Headline text color
  const textColor = isDark ? "text-[#E6F1F8]" : "text-[#FFFFFF]"; // Refers to --text-100 (dark) / pure white (light) for headline
  // Muted body text color
  const mutedTextColor = isDark ? "text-[#93A6B3]" : "text-[#A4B1C0]"; // Refers to --text-300 (dark) / --text-400 (light)
  const accentBg = isDark ? "bg-[#44EB88]" : "bg-[#01ec64]";

  return (
    <section className={cn("w-full py-16 md:py-20 bg-white", className)}>
      {" "}
      {/* Outer vertical padding: 64-96px */}
      {/* Container with "very generous corner radii" for a capsule silhouette */}
      <div
        className={cn(
          "w-100% max-w-[90%]  mx-auto rounded-[5rem] overflow-hidden", // Rounded-32px for generous radii
          "relative", // Needed for the decorative blob's absolute positioning
          canvasColor, // Deep teal/blue-green background for high contrast
        )}
      >
        {/* Optional decorative blob (low contrast, behind content) */}
        <DecorativeBlobs />
        <div
          className={cn(
            "absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl", // Large, blurred circle
            isDark
              ? "bg-[#44EB88] opacity-10" // Brand-colored, very subtle in dark mode
              : "bg-[#53FAA5] opacity-15", // Brand-colored, slightly more visible in light mode
          )}
          aria-hidden="true" // Decorative, hide from screen readers
        ></div>

        <div
          className={cn(
            "relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center",
            "gap-8 md:gap-12 lg:gap-24", // Adjusted gap for "large inner gutter"
            "px-8 py-14 md:px-12 md:py-16 xl:px-[5rem] xl:py-[7rem]", // Generous horizontal and vertical padding
          )}
        >
          {/* == Left Column: Content (Text and CTA) == */}
          <div
            className={cn(
              "flex flex-col gap-10", // Headline-to-body spacing ~12-16px (gap-4 is 16px)
              "lg:order-first order-first", // Text first on all screen sizes
              "lg:max-w-lg lg:px-[2rem]", // Limit text width for readability on large screens
            )}
          >
            {/* Headline: multi-line display sans, large size, tight tracking, compact leading (~1.15) */}
            <h2
              className={cn(
                "text-4xl lg:text-4xl font-bold tracking-tight",
                "leading-[1.15]", // Specific line-height for compact leading
                textColor, // Near-white for strong contrast
              )}
            >
              Boost your MongoDB Atlas skills.
            </h2>

            {/* Body copy: 2-3 sentence paragraph, muted cool gray, increased line-height (~1.6–1.7) */}
            <p
              className={cn(
                "text-xl max-w-prose", // Max-w-prose for measure around 50–65ch
                "leading-tight", // Tailwind's 'leading-relaxed' is ~1.625, fitting 1.6-1.7
                mutedTextColor, // Muted cool gray
              )}
            >
              Explore MongoDB Atlas fundamentals, from the document model to
              indexing strategies, to ensure your application&apos;s success.
            </p>

            {/* CTA button: Primary action "Start Learning", pill/rounded-md, bright brand green fill, dark ink label */}
            <a
              href="#start-learning" // <-- Replace with your link
              className={cn(
                "inline-block self-start px-8 py-3 text-black",
                " rounded-md hover:rounded-full font-semibold text-sm shadow-sm", // "pill-shaped"
                "transition-all duration-200 ease-in-out",
                "motion-safe:hover:shadow-md motion-safe:hover:brightness-110",
                "motion-safe:active:translate-y-px motion-safe:active:brightness-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                accentBg,
              )}
              aria-label="Start Learning"
            >
              Start Learning
            </a>
          </div>

          {/* == Right Column: Illustration == */}
          <div
            className={cn(
              "flex justify-center lg:order-last order-last", // Illustration always on the right visually
              // Vertically centered by the parent grid's 'items-center'
            )}
          >
            {/* Illustration: flat-vector, arms operating laptop, lime-green code.
                Laptop screen hue intentionally mirrors the CTA’s green.
                Scaled to occupy the right column without exceeding container padding.
                Baseline of device aligns with visual midline of headline block (handled by grid 'items-center').
            */}
            <img
              src={illustrationSrc}
              alt="Hands operating a laptop with lime-green code on the screen" // Descriptive alt text
              aria-hidden="false" // Not purely decorative as it conveys content context visually
              role="img" // Explicitly mark as an image
              className="relative z-10 w-full max-w-xs md:max-w-sm lg:max-w-md object-contain" // Responsive sizing
            />
          </div>
        </div>
      </div>
    </section>
  );
}
