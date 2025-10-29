"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AtlasHeroProps {
  className?: string;
}

export function AtlasHero({ className }: AtlasHeroProps) {
  const { theme } = useTheme();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (theme == "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);

  return (
    <section
      className={cn(
        "relative min-h-[80vh] w-full bg-background text-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-[100%] px-4 sm:px-6 lg:px-8 xl:px-12 py-0 sm:py-12 lg:py-0">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12">
          {/* Left Column - Content */}
          <div className="lg:col-span-6 w-full max-w-[40rem] mx-auto lg:mx-0">
            <span
              className={cn(
                "mb-3 sm:mb-4 xl:mb-[4rem] inline-block text-[0.75rem] sm:text-xs font-medium uppercase tracking-widest",
                isDark ? "text-[#E8F1F7]" : "text-[#01684b]",
              )}
            >
              MongoDB Atlas
            </span>

            <h1
              className={cn(
                "mb-4 sm:mb-6 mt-6 sm:mt-[3rem] max-w-[100rem] font-display text-3xl sm:text-4xl lg:text-6xl font-semibold leading-[1.1] tracking-normal",
                isDark ? "text-[#01ec64]" : "text-[#01684b]",
              )}
            >
              MongoDB Atlas.{" "}
              <span
                className={cn("block", isDark ? "text-white" : "text-[black]")}
              >
                The modern multi-cloud database.
              </span>
            </h1>

            <p
              className={cn(
                "mb-6 sm:mb-8 max-w-[60ch] text-base sm:text-lg leading-[1.7]",
                isDark ? "text-[#D1D5DB]" : "text-[#3A4048]",
              )}
            >
              Atlas combines the flexible document model with a suite of data
              services to give you a versatile cloud database that simplifies
              everything you build.
            </p>

            <div className="flex flex-wrap items-baseline gap-6">
              <a
                href="#"
                className={cn(
                  "inline-flex items-center justify-center rounded-md hover:rounded-3xl border border-[#072F49] bg-[#00FF00] px-6 py-2 text-base font-medium shadow-sm transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#072F49]",
                  "hover:brightness-90 active:translate-y-px active:shadow-none",
                  isDark ? "text-[#001a28]" : "",
                )}
                aria-label="Get started with MongoDB Atlas"
              >
                Get Started
              </a>

              <a
                href="#"
                className={cn(
                  "group inline-flex items-baseline gap-2.5 text-base font-medium",
                  "transition-colors hover:underline",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  isDark
                    ? "text-[#E8F1F7] focus-visible:ring-[#E8F1F7]"
                    : "text-black focus-visible:ring-black",
                )}
              >
                Document model benefits
                <svg
                  className={cn(
                    "h-5 w-5 transition-transform group-hover:translate-x-0.5",
                    isDark ? "text-[#E8F1F7]" : "text-[#0B3C5D]",
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex justify-center lg:justify-end mt-8 sm:mt-12 lg:col-span-6 lg:mt-0">
            {/* Hero illustration */}
            <img
              src="https://webimages.mongodb.com/_com_assets/cms/m6jgrb0ludripg8mx-Technical_ACTION_Developer_blue_EndCap_BS_Lavender%204%20(1).svg?ixlib=js-3.7.1&auto=format%2Ccompress&w=1946"
              alt=""
              role="presentation"
              className="relative z-10 w-full max-w-[45rem] object-contain px-4 sm:px-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
