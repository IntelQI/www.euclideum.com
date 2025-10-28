"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming cn is at this path
import { useEffect, useState } from "react";

/**
 * A full-bleed hero section with a "quarter-circle cut" on the right,
 * promoting the start of a learning path.
 */
export function ProductStartLearning({ className }: { className?: string }) {
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
        "w-full overflow-hidden", // 'overflow-hidden' is crucial for the rounding
        className,
      )}
    >
      {/* Container with the organic shape:
        - Mobile: 'rounded-3xl' (standard rounded rectangle)
        - Desktop: 'lg:rounded-l-3xl lg:rounded-r-[150px]' (creates the "quarter-circle cut")
      */}
      <div
        className={cn(
          "relative w-full transition-colors",
          " lg:rounded-r-[150px]",
          "py-16 md:py-15", // Generous vertical padding
          isDark
            ? "bg-[#07121d]" // bg-900 (deep blue-green)
            : "bg-[#001a28]", // bg-100 (light canvas)
        )}
      >
        {/* Grid Layout:
          - 'lg:grid-cols-2' for desktop
          - 'px-6 md:px-12 lg:px-24' for generous horizontal padding
        */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 items-center 
            gap-12 lg:gap-24 
            px-6 md:px-12 lg:px-24
          "
        >
          {/* Column 1: Illustration (Left on desktop)
            - 'order-last' (default): Appears *second* on mobile
            - 'lg:order-first': Appears *first* (left) on desktop
          */}
          <div
            className={cn(
              "order-last lg:order-first",
              "relative", // <-- Add this class
            )}
          >
            {/* Bright green splash shape (blur-3xl for soft blob) */}
            <div
              className={cn(
                "absolute inset-0 m-auto w-92 h-82 rounded-full blur-3xl",
                isDark
                  ? "bg-[#44EB88] opacity-50" // brand-400
                  : "bg-[#53FAA5] opacity-30", // brand-400 (light)
              )}
            ></div>

            <img
              src="https://webimages.mongodb.com/_com_assets/cms/m8odnx9awzurjuvwv-General_EVENT_Webinars(1)_Spot%20Spring%20Green.svg?ixlib=js-3.7.1&auto=format%2Ccompress&w=799"
              alt=""
              role="presentation"
              className="relative z-10 w-full max-w-[35rem] object-contain px-4 sm:px-0"
            />
          </div>

          {/* Column 2: Text (Right on desktop)
            - 'order-first' (default): Appears *first* on mobile
            - 'lg:order-last': Appears *second* (right) on desktop
          */}
          <div className="order-first lg:order-last flex flex-col justify-center">
            {/* Headline */}
            <h2
              className={cn(
                "text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
                isDark ? "text-[white]" : "text-[white]", // text-100 : text-900
              )}
            >
              Build your knowledge,
              <br />
              skill by skill.
            </h2>

            {/* Body Copy */}
            <p
              className={cn(
                "mt-6 text-lg max-w-prose leading-relaxed",
                isDark ? "text-[#93A6B3]" : "text-[#5F6C7B]", // text-300 : text-600
              )}
            >
              Our hands-on learning paths help you build practical skills with
              MongoDB, one step at a time.
            </p>

            {/* CTA Button */}
            <a
              href="#start-learning" // <-- Replace with your link
              className={cn(
                "mt-10 inline-block self-start px-8 py-3",
                " rounded-md hover:rounded-full font-semibold text-base shadow-sm", // "pill-shaped"
                "transition-all duration-200 ease-in-out",
                "motion-safe:hover:shadow-md motion-safe:hover:brightness-110",
                "motion-safe:active:translate-y-px motion-safe:active:brightness-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isDark
                  ? "bg-[#44EB88] text-[#0B1217] focus-visible:ring-[#22E38F] focus-visible:ring-offset-[#0B1217]" // brand-400, text:bg-900, focus-ring-dark, offset:bg-900
                  : "bg-[#1FDA7C] text-[#17232E] focus-visible:ring-[#17B26A] focus-visible:ring-offset-[#F8FAFB]", // brand-500, text:text-900, focus-ring-light, offset:bg-100
              )}
              aria-label="Start Learning"
            >
              Start Learning
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
