"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming cn is at this path
import { useEffect, useState } from "react";

interface CtaHeaderProps {
  className?: string;
}

interface Feature {
  imageUrl: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface FeatureGridProps {
  className?: string;
}

interface FeatureCardProps {
  feature: Feature;
  // Pass theme-aware colors down from the parent
  titleColor: string;
  mutedTextColor: string;
  linkColor: string;
  linkHover: string;
  focusRing: string;
  focusOffset: string;
}

const MockIcon = ({
  name,
  accentColor,
}: {
  name: string;
  accentColor: string;
}) => (
  <div
    className={cn(
      "w-10 h-10 rounded-lg", // "square/near-square bounding box" ~36px
      "flex items-center justify-center",
      "bg-slate-100", // Placeholder background for light mode
      "border border-slate-300", // "line-based"
      "relative text-slate-500 text-xs font-mono",
    )}
    aria-hidden="true"
    role="presentation"
  >
    {name}
    {/* "green accent element" */}
    <div
      className={cn(
        "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
        accentColor,
      )}
    ></div>
  </div>
);

function FeatureCard({
  feature,
  titleColor,
  mutedTextColor,
  linkColor,
  linkHover,
  focusRing,
  focusOffset,
}: FeatureCardProps) {
  // Destructure 'imageUrl' which is now expected instead of 'icon'
  const { imageUrl, title, description, href } = feature;

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-y-3", // "left-aligned internally"
      )}
    >
      {/* == Top Image == */}
      {/* "sits in a square/near-square bounding box" */}
      {/* "constrain to ~28–36 px height" */}
      <img
        src={imageUrl}
        alt="" // Alt text is empty as the title provides context
        aria-hidden="true"
        role="presentation"
        // Constrain to ~36px height and "object-contain" to preserve aspect ratio
        className="h-15 w-15 object-contain"
      />

      {/* == Title == */}
      {/* image -> 12–16 px gap -> title */}
      <h3
        className={cn(
          "text-2xl font-semibold", // "~16-18px", "medium/bold"
          "leading-tight", // "tight leading"
          "mt-4", // 16px
          titleColor, // "ink/dark color"
        )}
      >
        {title}
      </h3>

      {/* == Description == */}
      {/* title -> 8–10 px gap -> description */}
      <p
        className={cn(
          "text-lg", // "~14-15px"
          "leading-relaxed", // "increased line-height (~1.55-1.7)"
          "max-w-[100%]", // "max measure 36-45ch"
          "mt-2", // 8px
          "text-gray-600", // "muted gray copy"
        )}
      >
        {description}
      </p>

      {/* == Micro-CTA == */}
      {/* description -> 10–12 px gap -> "Learn more" */}
      <a
        href={href}
        aria-label={`Learn more about ${title}`} // Accessible link text
        className={cn(
          "group", // For arrow hover
          "inline-flex items-center gap-x-1", // "plus a thin chevron"
          "font-semibold text-lg",
          "mt-3", // 12px
          linkColor,
          linkHover,
          "transition-all duration-150 ease-in-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm",
          focusRing,
          focusOffset,
        )}
      >
        Learn more
        {/* Arrow "→" with hover shift */}
        <span
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1" // "chevron shift"
        >
          →
        </span>
      </a>
    </div>
  );
}

export function ProductCta({ className }: CtaHeaderProps) {
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

  // --- Color Tokens (following your style of local JS variables with hardcoded hex) ---
  // Canvas background (pure/near-white in light, dark in dark)
  const canvasColor = "bg-white"; // --bg-900 (dark) / --bg-100 (light)
  // Headline text color (near-black on light)
  const textColor = isDark ? "text-[#07121d]" : "text-[#17232E]"; // --text-100 (dark) / --text-900 (light)
  // Secondary CTA: Text (darker ink/brand-neutral)
  const secondaryLinkText = isDark ? "text-[black]" : "text-[#18895E]"; // --link-500 (dark) / --link-600 (light)
  // Secondary CTA: Hover State
  // Focus ring color
  const focusRing = isDark
    ? "focus-visible:ring-[#22E38F]"
    : "focus-visible:ring-[#17B26A]";
  // Focus ring offset background
  const focusOffset = isDark
    ? "focus-visible:ring-offset-[#0B1217]"
    : "focus-visible:ring-offset-[#F8FAFB]";
  const iconAccent = isDark ? "bg-[#44EB88]" : "bg-[#13EF76]";

  // --- Color Tokens (following your style) ---
  const titleColor = isDark ? "text-[#07121d]" : "text-[#17232E]"; // --text-100 / --text-900 (ink)
  const mutedTextColor = isDark ? "text-[#93A6B3]" : "text-[#A4B1C0]"; // --text-300 / --text-400 (muted gray)
  const linkColor = isDark ? "text-[#20D97A]" : "text-[#18895E]"; // --link-500 / --link-600 (brand/ink color)
  const linkHover = isDark ? "hover:text-[#44EB88]" : "hover:underline"; // Color shift (dark) / underline (light)

  // --- Mock Data (defined here to access theme colors for the icon) ---
  const features: Feature[] = [
    {
      imageUrl:
        "https://webimages.mongodb.com/_com_assets/icons/atlas_database.svg",
      title: "Database",
      description:
        "Multi-cloud, resilient, and secure with data privacy controls.",
      href: "#database",
    },
    {
      imageUrl:
        "https://webimages.mongodb.com/_com_assets/icons/atlas_search.svg",
      title: "Search",
      description:
        "Relevance-based search 4x faster and at a lower cost than alternatives.",
      href: "#search",
    },
    {
      imageUrl:
        "https://webimages.mongodb.com/_com_assets/icons/mdb_vector_search.svg",
      title: "Vector Search",
      description:
        "Semantic search for generative AI across all your data types.",
      href: "#vector-search",
    },
    {
      imageUrl:
        "https://webimages.mongodb.com/_com_assets/icons/atlas_charts.svg",
      title: "Charts",
      description:
        "Real-time insights with embedded dashboards and visualizations.",
      href: "#charts",
    },
    {
      imageUrl: "https://webimages.mongodb.com/_com_assets/icons/atlas_cli.svg",
      title: "Atlas CLI",
      description: "Manage your deployments from the command line or terminal.",
      href: "#cli",
    },
    {
      imageUrl:
        "https://webimages.mongodb.com/_com_assets/icons/atlas_data_federation.svg",
      title: "Data Federation",
      description: "Query and transform data across Atlas databases and S3.",
      href: "#data-federation",
    },
    // Adding the 7th item as mentioned in the spec
    {
      imageUrl:
        "https://webimages.mongodb.com/_com_assets/icons/atlas_online_archive.svg",
      title: "Online Archive",
      description: "Managed object storage with a single endpoint query.",
      href: "#online-archive",
    },
  ];

  return (
    <>
      <section
        className={cn(
          "w-full",
          "py-20 md:py-28 lg:py-5", // Generous (hero-like) vertical padding
          canvasColor, // Relies on whitespace
          className,
        )}
      >
        {/* Container: centered, max-width, text-center */}
        <div
          className={cn(
            "w-full max-w-4xl mx-auto px-6", // ~896px, fits "880–1040 px" spec
            "flex flex-col items-center", // Center-align all content vertically
            "gap-6 md:gap-8", // "top margin (~24–32 px) from the headline"
          )}
        >
          {/* == Headline == */}
          {/*
          - Multi-line display sans/serif, compact leading (~1.1–1.2)
          - Split into two stacked lines for rhythm
          - Near-black for crisp legibility on white
        */}
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-7xl font-semibold text-center",
              "tracking-tight", // Editorial, high-contrast
              "leading-[1.15]", // Compact leading (fits 1.1-1.2)
              textColor,
            )}
          >
            Build faster with a suite of
            <br />
            integrated data services.
          </h2>

          {/* == Action Row == */}
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center mt-10",
              "gap-y-4", // "stack... with ~12–16 px vertical gap"
              "sm:gap-x-10", // "offset by a comfortable gap (~24–32 px)"
            )}
          >
            {/* -- Primary Action: "Try Free" -- */}
            <a
              href="#"
              className={cn(
                "inline-flex items-center justify-center rounded-md hover:rounded-3xl border border-[#072F49] bg-[#00FF00] px-10 py-3 text-md font-medium shadow-sm transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#072F49]",
                "hover:brightness-90 active:translate-y-px active:shadow-none",
                isDark ? "text-[#001a28]" : "",
              )}
              aria-label="Get started with MongoDB Atlas"
            >
              Try Free
            </a>

            {/* -- Secondary Action: "Contact sales →" -- */}
            <a
              href="#contact-sales"
              className={cn(
                "group", // For arrow hover effect
                "inline-flex items-center gap-x-1.5", // Gap for the arrow
                "font-semibold text-base",
                secondaryLinkText,
                "transition-colors duration-200 ease-in-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm", // Rounded for focus ring
                focusRing,
                focusOffset,
              )}
            >
              Contact sales
              {/* Arrow shifts +2px on hover */}
              <span
                aria-hidden="true"
                className="motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" // ~2px shift
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <section
        className={cn(
          "w-[100%]",
          "py-5 md:py-28", // "generous vertical padding"
          canvasColor, // "light background"
          className,
        )}
      >
        {/* "wide central container" */}
        <div className="w-full max-w-[100%] mx-auto px-14">
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              "gap-x-8", // "uniform horizontal gaps"
              "gap-y-12", // "uniform vertical gaps... airy and balanced"
            )}
          >
            {/* Map over the features and render a card for each */}
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                // Pass down theme-aware color strings
                titleColor={titleColor}
                mutedTextColor={mutedTextColor}
                linkColor={linkColor}
                linkHover={linkHover}
                focusRing={focusRing}
                focusOffset={focusOffset}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
