"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming cn is at this path
import { useEffect, useState } from "react";

interface DemoCalloutProps {
  className?: string;
}

export function DemoCallout({ className }: DemoCalloutProps) {
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
    // Section wrapper: constrains width and centers the card
    <section
      aria-label="MongoDB Atlas Demo"
      className={cn(
        "flex align-center justify-center w-full max-w-100vw mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12 bg-background",
        className,
      )}
    >
      {/* Container: 
        - Uses conditional colors and shadows based on isDark
      */}
      <div
        className={cn(
          "w-full max-w-[60rem] rounded-[16px] sm:rounded-[24px] overflow-hidden transition-all duration-200 ease-in-out",
          "motion-safe:hover:shadow-lg",
          isDark
            ? "bg-[white] border border-[#1F3442] shadow-[0_0_0_1px_rgba(38,64,82,0.5),_0_4px_12px_rgba(0,0,0,0.5)]" // panel-700, border-600, custom dark shadow
            : "bg-[#f4f7fb] border border-[#E2E8F0] shadow-[0_4px_20px_rgba(16,24,40,0.07)]", // panel-400, border-200, shadow
        )}
      >
        {/* Grid Layout */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-[minmax(0,_46fr)_minmax(0,_54fr)] 
            items-center gap-6 sm:gap-8 lg:gap-12 
            p-6 sm:p-8 md:p-10 lg:px-12 lg:py-8
          "
        >
          {/* == Left Column: Content == */}
          <div className="flex flex-col justify-center gap-6">
            {/* Headline */}
            <h2
              className={cn(
                "text-2xl sm:text-3xl font-semibold leading-tight tracking-tight",
                isDark ? "text-[#001a28]" : "text-[#17232E]", // text-100 : text-900
              )}
            >
              Demo MongoDB Atlas <br />
              for free
            </h2>

            {/* Body */}
            <p
              className={cn(
                "text-sm sm:text-base leading-relaxed max-w-[24rem] lg:max-w-[20rem]",
                isDark ? "text-[#93A6B3]" : "text-[#5F6C7B]", // text-300 : text-600
              )}
            >
              Start exploring our powerful platform immediately with our
              immersive demo. No signup or credit card required.
            </p>

            {/* CTA Button */}
            <a
              href="#launch-demo" // <-- Replace with your demo link
              className={cn(
                "inline-block self-start px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-sm",
                "transition-all duration-200 ease-in-out",
                "motion-safe:hover:shadow-md motion-safe:active:translate-y-px motion-safe:active:shadow-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:rounded-3xl",
                isDark
                  ? "bg-[#44EB88] text-[#0B1217] motion-safe:hover:bg-[#16E068] focus-visible:ring-[#22E38F] focus-visible:ring-offset-[#162632]" // brand-400, bg-900, hover:brand-500, focus-ring-dark, offset:panel-700
                  : "bg-[#17232E] text-[#FFFFFF] motion-safe:hover:bg-[#36414A] focus-visible:ring-[#17B26A] focus-visible:ring-offset-[#FFFFFF]", // text-900, panel-400, hover:text-700, focus-ring-light, offset:panel-400
              )}
              aria-label="Launch demo"
            >
              Launch demo
            </a>
          </div>

          {/* == Right Column: Visual == */}
          <div className="w-full">
            <div
              className={cn(
                "w-full lg:w-[130%] rounded-lg lg:rounded-b-lg overflow-hidden",
              )}
            >
              <img
                src="https://webimages.mongodb.com/_com_assets/cms/lxt4its6rishlakm1-Deployments%20-%201440%C3%971024.svg?auto=format%252Ccompress" // <-- Replace with your screenshot
                alt="" // Alt text is empty as role is presentation
                role="presentation" // Following the style of AtlasHero.tsx
                className="w-full h-auto rounded-md" // Inner radius
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
