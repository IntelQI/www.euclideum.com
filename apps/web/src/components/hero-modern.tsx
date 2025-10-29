"use client";

import {
  Building2,
  Users,
  Wallet,
  Calculator,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/opendocs/hooks/use-mounted";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  title: string;
  icon: React.ReactNode;
  image: string;
  description?: string;
}

interface HeroModernProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonUrl: string;
  secondaryButtonUrl?: string;
  tabs?: Tab[];
  theme?: "dark" | "light";
}

// Create default tabs with icons that have explicit size to prevent hydration mismatches
const defaultTabs: Tab[] = [
  {
    title: "ERP",
    icon: <Building2 size={16} />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-1.png",
    description: "Enterprise Resource Planning solutions",
  },
  {
    title: "HRMS",
    icon: <Users size={16} />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-2.png",
    description: "Human Resource Management System",
  },
  {
    title: "Payroll",
    icon: <Wallet size={16} />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-3.png",
    description: "Automated payroll processing",
  },
  {
    title: "Accounting",
    icon: <Calculator size={16} />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-users.png",
    description: "Financial accounting and bookkeeping",
  },
  {
    title: "LMS",
    icon: <GraduationCap size={16} />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-developer.png",
    description: "Learning Management System",
  },
];

const HeroModern = ({
  title = "The database for dynamic, demanding software",
  description = "AI depends on fluid, instantly accessible data, not fragmented silos. Consolidate structured and unstructured data—text, video, audio, time series, and more—into a single, flexible system.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonUrl,
  secondaryButtonText = "Documentation",
  tabs = defaultTabs,
}: HeroModernProps) => {
  const [activeTab, setActiveTab] = useState(() => tabs[0]?.title || "");
  const mounted = useMounted();
  
  // Must call useTheme unconditionally (React hooks rule)
  // But we'll ignore its values until after mount to prevent hydration mismatch
  const { theme, resolvedTheme } = useTheme();
  
  // Use tabs directly but render icons conditionally to prevent hydration mismatch
  const stableTabs = useMemo(() => tabs, [tabs]);

  // Default to dark theme for SSR and initial render
  // This matches the defaultTheme="dark" in ThemeProvider
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    if (!mounted) return;
    // Wait a tick to ensure hydration is complete before updating theme
    // This prevents hydration mismatch errors
    const timeoutId = setTimeout(() => {
      const currentTheme = resolvedTheme || theme || "dark";
      setIsDark(currentTheme === "dark");
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [theme, resolvedTheme, mounted]);

  // Use dark theme during SSR and initial client render to match server output
  // After mount, useEffect will update to the correct theme
  const effectiveIsDark = isDark;

  return (
    <section
      className={cn(
        "min-h-screen overflow-hidden relative",
        effectiveIsDark
          ? "hero-dark-bg"
          : "bg-gradient-to-b from-[#F7F7F9] to-[#FFFFFF] hero-light-bg",
      )}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 relative z-10" suppressHydrationWarning>
        <div className="py-20 lg:py-15" suppressHydrationWarning>
          {/* Hero Content - Split Layout */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[6.5fr_3.5fr] lg:items-start">
            {/* Left Section - Headline */}
            <div className="flex flex-col space-y-1">
              {/* NEW Feature Badge */}
              <div className=" flex justify-start">
                <div
                  className={cn(
                    "inline-flex items-center gap-3 rounded-xl border-2 px-4 py-2 bg-transparent",
                    effectiveIsDark ? "border-white/40" : "border-[#001b29]",
                  )}
                >
                  <span
                    className={cn(
                      "rounded-md px-4 py-2 text-xs font-bold uppercase",
                      "bg-[#00ED64] text-[#001E2B] hover:bg-[#00C85A] hover:brightness-110",
                    )}
                  >
                    NEW
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      effectiveIsDark ? "text-white" : "text-[#0E1116]",
                    )}
                  >
                    NEW: Announcing our new Client Onboarding - ICT Mumbai
                  </span>
                </div>
              </div>

              <h1
                className={cn(
                  "text-5xl font-normal leading-relaxed tracking-tight md:text-6xl lg:text-7xl md:leading-relaxed lg:leading-relaxed",
                  effectiveIsDark ? "text-white" : "text-[#0E1116]",
                )}
              >
                Shaping the Future of {" "}
                <span
                  className={cn(
                    "relative inline-block after:absolute after:bottom-3 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-[#00ED64]",
                  )}
                >
                  Learning
                </span>
                {" "} & {" "}
                <span
                  className={cn(
                    "relative inline-block after:absolute after:bottom-3 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-[#00ED64]",
                  )}
                >
                  Enterprises
                </span>
              </h1>
            </div>

            {/* Right Section - Description & CTA */}
            <div className="flex flex-col justify-between space-y-6 py-10">
              <p
                className={cn(
                  "text-lg leading-relaxed md:text-xl",
                    effectiveIsDark ? "text-white" : "text-[#3A4048]",
                )}
              >
                {description}
              </p>
              <div className="flex flex-row gap-4">
                <Button
                  asChild
                  className={cn(
                    "h-12 rounded-md border-2 px-6 w-[100%] text-base font-medium transition-all",
                    effectiveIsDark
                      ? "bg-[#00ED64] border-[#00ED64] text-[#001E2B] hover:bg-[#00C85A] hover:border-[#00C85A] hover:shadow-lg"
                      : "bg-[#00ED64] border-[#00ED64] text-[#001E2B] hover:bg-[#00ED64] hover:border-[#00ED64] hover:shadow-lg hover:shadow-[#00ED64]/50",
                  )}
                >
                  <a href={primaryButtonUrl}>{primaryButtonText}</a>
                </Button>
                {secondaryButtonText && (
                  <Button
                    variant="outline"
                    asChild
                    className={cn(
                      "h-12 rounded-md border-2 px-6 w-[100%] text-base font-medium transition-all",
                      effectiveIsDark
                        ? "bg-transparent border-white text-white hover:bg-[#00ED64] hover:border-[#00ED64] hover:text-[#001E2B] hover:shadow-lg"
                        : "border-[#0E1116] text-[#0E1116] hover:border-[#00ED64] hover:bg-[#00ED64] hover:text-[#001E2B] hover:shadow-lg hover:shadow-[#00ED64]/50",
                    )}
                  >
                    <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 md:mt-16 lg:mt-8" suppressHydrationWarning>
            <Tabs defaultValue={stableTabs[0]?.title} onValueChange={setActiveTab}>
              <div className="mb-8 px-2 flex justify-center" suppressHydrationWarning>
                <TabsList className={cn(
                  "mx-auto inline-flex h-auto w-fit max-w-md flex-wrap gap-2 rounded-lg border-2 bg-transparent p-0.5 lg:max-w-4xl",
                  effectiveIsDark ? "border-white/40" : "border-[#001b29]"
                )} suppressHydrationWarning>
                  {stableTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.title}
                      value={tab.title}
                      className={cn(
                        "h-8 rounded-md px-3 text-xs font-medium transition-all",
                        effectiveIsDark
                          ? "text-[#D1D5DB] data-[state=active]:bg-[#00ED64] data-[state=active]:text-[#001E2B]"
                          : "text-[#3A4048] data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white",
                      )}
                      suppressHydrationWarning
                    >
                      {mounted && <span className="mr-1.5">{tab.icon}</span>}
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="relative isolate">
                <div className="relative z-10">
                  {stableTabs.map((tab) => (
                    <TabsContent
                      key={tab.title}
                      value={tab.title}
                      className={cn(
                        "-mx-px rounded-xl transition-opacity duration-500",
                        {
                          "animate-in fade-in opacity-100":
                            activeTab === tab.title,
                          "opacity-0": activeTab !== tab.title,
                        },
                      )}
                    >
                      <div className="relative overflow-hidden rounded-xl border-2 shadow-[0_6px_20px_rgb(0,0,0,0.15)]">
                        <img
                          src={tab.image}
                          alt={tab.title}
                          className="aspect-[16/10] w-full object-cover"
                        />
                      </div>
                    </TabsContent>
                  ))}
                </div>

                <span
                  className={cn(
                    "absolute inset-x-0 top-0 -z-10 h-px",
                    effectiveIsDark ? "bg-white/20" : "bg-[#C8CDD3]",
                  )}
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)",
                  }}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 -z-10 h-px",
                    effectiveIsDark ? "bg-white/20" : "bg-[#C8CDD3]",
                  )}
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)",
                  }}
                />
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Trusted Teams Banner */}
      <section
        className={cn(
          "w-full py-10 md:py-12",
          effectiveIsDark ? "bg-[#011d29]" : "bg-[#072F49]",
        )}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-[100%] px-6 md:px-8 lg:px-[7rem]">
          {/* Kicker with accent bar */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "h-4 w-1 rounded",
                effectiveIsDark ? "bg-[#00ED64]" : "bg-[#2AA198]",
              )}
            />
            <p
              className={cn(
                "text-xs md:text-sm font-medium uppercase tracking-[0.2em]",
                effectiveIsDark ? "text-[#D1D5DB]/80" : "text-[#ECEEF1]/80",
              )}
            >
              Trusted by teams at
            </p>
          </div>

          {/* Gap */}
          <div className="mt-5 md:mt-[2rem]" />

          {/* Logos */}
          <ul className="flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none">
            <li className="snap-center shrink-0">
              <a
                href="#"
                className={cn(
                  "inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                  effectiveIsDark
                    ? "focus-visible:outline-[#00ED64]"
                    : "focus-visible:outline-[#2AA198]",
                )}
                aria-label={`Partner company`}
              >
                <img
                  src={
                    "https://webimages.mongodb.com/_com_assets/cms/mf3zbid4lnnsn26o0-Wells.svg?auto=format%252Ccompress"
                  }
                  alt={`Partner company logo`}
                  className={cn(
                    "h-6 sm:h-7 md:h-3 w-auto object-contain transition-opacity duration-200",
                    effectiveIsDark
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-90 hover:opacity-100",
                    "filter grayscale brightness-200",
                  )}
                  loading="lazy"
                />
              </a>
            </li>
            <li className="snap-center shrink-0">
              <a
                href="#"
                className={cn(
                  "inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                  effectiveIsDark
                    ? "focus-visible:outline-[#00ED64]"
                    : "focus-visible:outline-[#2AA198]",
                )}
                aria-label={`Partner company`}
              >
                <img
                  src={
                    "https://webimages.mongodb.com/_com_assets/cms/mf56fvdg8c5b6hlcx-Loreal.svg?auto=format%252Ccompress"
                  }
                  alt={`Partner company logo`}
                  className={cn(
                    "h-6 sm:h-7 md:h-7 w-auto object-contain transition-opacity duration-200",
                    effectiveIsDark
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-90 hover:opacity-100",
                    "filter grayscale brightness-200",
                  )}
                  loading="lazy"
                />
              </a>
            </li>
            <li className="snap-center shrink-0">
              <a
                href="#"
                className={cn(
                  "inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                  effectiveIsDark
                    ? "focus-visible:outline-[#00ED64]"
                    : "focus-visible:outline-[#2AA198]",
                )}
                aria-label={`Partner company`}
              >
                <img
                  src={
                    "https://webimages.mongodb.com/_com_assets/cms/mf56g8483iw759rrp-Cisco.svg?auto=format%252Ccompress"
                  }
                  alt={`Partner company logo`}
                  className={cn(
                    "h-6 sm:h-7 md:h-10 w-auto object-contain transition-opacity duration-200",
                    effectiveIsDark
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-90 hover:opacity-100",
                    "filter grayscale brightness-200",
                  )}
                  loading="lazy"
                />
              </a>
            </li>
            <li className="snap-center shrink-0">
              <a
                href="#"
                className={cn(
                  "inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                  effectiveIsDark
                    ? "focus-visible:outline-[#00ED64]"
                    : "focus-visible:outline-[#2AA198]",
                )}
                aria-label={`Partner company`}
              >
                <img
                  src={
                    "https://webimages.mongodb.com/_com_assets/cms/mfe3zm6fqtnmg53st-Coinbase_Wordmark_White.svg?auto=format%252Ccompress"
                  }
                  alt={`Partner company logo`}
                  className={cn(
                    "h-6 sm:h-7 md:h-4 w-auto object-contain transition-opacity duration-200",
                    effectiveIsDark
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-90 hover:opacity-100",
                    "filter grayscale brightness-200",
                  )}
                  loading="lazy"
                />
              </a>
            </li>
            <li className="snap-center shrink-0">
              <a
                href="#"
                className={cn(
                  "inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                  effectiveIsDark
                    ? "focus-visible:outline-[#00ED64]"
                    : "focus-visible:outline-[#2AA198]",
                )}
                aria-label={`Partner company`}
              >
                <img
                  src={
                    "https://webimages.mongodb.com/_com_assets/cms/mf56gzj1q176iqatb-Sega.svg?auto=format%252Ccompress"
                  }
                  alt={`Partner company logo`}
                  className={cn(
                    "h-6 sm:h-7 md:h-7 w-auto object-contain transition-opacity duration-200",
                    effectiveIsDark
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-90 hover:opacity-100",
                    "filter grayscale brightness-200",
                  )}
                  loading="lazy"
                />
              </a>
            </li>
            <li className="snap-center shrink-0">
              <a
                href="#"
                className={cn(
                  "inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                  effectiveIsDark
                    ? "focus-visible:outline-[#00ED64]"
                    : "focus-visible:outline-[#2AA198]",
                )}
                aria-label={`Partner company`}
              >
                <img
                  src={
                    "https://webimages.mongodb.com/_com_assets/cms/mf56hdollsoq6r6f6-Forbes.svg?auto=format%252Ccompress"
                  }
                  alt={`Partner company logo`}
                  className={cn(
                    "h-6 sm:h-7 md:h-6 w-auto object-contain transition-opacity duration-200",
                    effectiveIsDark
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-90 hover:opacity-100",
                    "filter grayscale brightness-200",
                  )}
                  loading="lazy"
                />
              </a>
            </li>
            <li className="snap-center shrink-0">
              <a
                href="#"
                className={cn(
                  "inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                  effectiveIsDark
                    ? "focus-visible:outline-[#00ED64]"
                    : "focus-visible:outline-[#2AA198]",
                )}
                aria-label={`Partner company`}
              >
                <img
                  src={
                    "https://webimages.mongodb.com/_com_assets/cms/mfdqez39r48bzo8jd-LG_U-logo%201.svg?auto=format%252Ccompress"
                  }
                  alt={`Partner company logo`}
                  className={cn(
                    "h-6 sm:h-7 md:h-8 w-auto object-contain transition-opacity duration-200",
                    effectiveIsDark
                      ? "opacity-80 hover:opacity-100"
                      : "opacity-90 hover:opacity-100",
                    "filter grayscale brightness-200",
                  )}
                  loading="lazy"
                />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export { HeroModern };
