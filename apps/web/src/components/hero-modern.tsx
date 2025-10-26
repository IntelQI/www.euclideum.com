"use client";

import {
  BarChart,
  Database,
  Layers,
  PieChart,
  SquareKanban,
  Zap,
  Settings,
  Grid,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

import { BorderBeam } from "@/components/magicui/border-beam";
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

const defaultTabs: Tab[] = [
  {
    title: "Analytics",
    icon: <PieChart />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-1.png",
    description: "Real-time insights and performance metrics",
  },
  {
    title: "Performance",
    icon: <Zap />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-2.png",
    description: "Optimized for speed and efficiency",
  },
  {
    title: "Insights",
    icon: <Database />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-3.png",
    description: "Deep data analysis and reporting",
  },
  {
    title: "Configuration",
    icon: <Settings />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-users.png",
    description: "Flexible settings and customization",
  },
  {
    title: "Resources",
    icon: <Grid />,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-developer.png",
    description: "Manage assets and infrastructure",
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
  const [activeTab, setActiveTab] = useState(tabs[0]?.title || "");
  const { theme, resolvedTheme } = useTheme();

  // Use resolvedTheme when available (ensures stored preference is applied on mount)
  const [isDark,setIsDark]=useState(false);

  
  useEffect(()=>{
    if(theme=="dark"){
      setIsDark(true);
    }else{setIsDark(false)}
    
  },[theme,resolvedTheme])


  return (
    <section
      className={cn(
        "min-h-screen overflow-hidden relative",
        isDark ? "hero-dark-bg" : "bg-gradient-to-b from-[#F7F7F9] to-[#FFFFFF]",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="py-20 lg:py-15">
          {/* Hero Content - Split Layout */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[6.5fr_3.5fr] lg:items-start">
            {/* Left Section - Headline */}
            <div className="flex flex-col space-y-1">
              {/* NEW Feature Badge */}
              <div className=" flex justify-start">
                <div
                  className={cn(
                    "inline-flex items-center gap-3 rounded-xl border px-4 py-5 bg-transparent",
                    isDark ? "border-gray-700" : "border-[#ECEEF1]",
                  )}
                >
                  <span
                    className={cn(
                      "rounded-full px-3 py-0.5 text-xs font-bold uppercase",
                      isDark ? "bg-gray-800 text-[#00ED64]" : "bg-[#00ED64] text-[#001E2B]",
                    )}
                  >
                    NEW
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      isDark ? "text-white" : "text-[#0E1116]",
                    )}
                  >
                    Modernize 2-3x faster with MongoDB's Application
                    Modernization Platform →
                  </span>
                </div>
              </div>

              <h1
                className={cn(
                  "text-5xl font-normal leading-relaxed tracking-tight md:text-6xl lg:text-7xl md:leading-relaxed lg:leading-relaxed",
                  isDark ? "text-white" : "text-[#0E1116]",
                )}
              >
                Get tips on setting up your{" "}
                <span
                  className={cn(
                    "relative inline-block after:absolute after:bottom-3 after:left-0 after:h-0.5 after:w-full after:rounded-full",
                    theme === "dark"
                      ? "after:bg-[#00ED64]"
                      : "after:bg-[#00ED64]",
                  )}
                >
                  first cluster
                </span>
              </h1>
            </div>

            {/* Right Section - Description & CTA */}
            <div className="flex flex-col justify-between space-y-6 py-10">
              <p
                className={cn(
                  "text-lg leading-relaxed md:text-xl",
                  isDark ? "text-white/80" : "text-[#3A4048]",
                )}
              >
                {description}
              </p>
              <div className="flex flex-row gap-4">
                <Button
                  asChild
                  className={cn(
                    "h-12 rounded-md px-6 w-[100%] text-base font-medium transition-all",
                    isDark ? "bg-[#00ED64] text-[#001E2B] hover:bg-[#00C85A] hover:brightness-110" : "bg-[#00ED64] text-[#001E2B] hover:bg-[#00C85A]",
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
                      isDark ? "border-white text-white hover:bg-white/10" : "border-[#0E1116] text-[#0E1116] hover:bg-[#0E1116]/10",
                    )}
                  >
                    <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16 md:mt-24 lg:mt-10">
            <Tabs defaultValue={tabs[0]?.title} onValueChange={setActiveTab}>
              <div className="mb-12 px-2 flex justify-center">
                <TabsList className="mx-auto inline-flex h-auto w-fit max-w-md flex-wrap gap-1 rounded-lg border-2 bg-transparent p-1 lg:max-w-4xl">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.title}
                      value={tab.title}
                      className={cn(
                        "h-9 rounded-md px-4 text-sm font-medium transition-all",
                        isDark
                          ? "text-[#D1D5DB] data-[state=active]:bg-[#00ED64] data-[state=active]:text-[#001E2B]"
                          : "text-[#3A4048] data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white",
                      )}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="relative isolate">
                <div className="relative z-10">
                  {tabs.map((tab) => (
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
                        <BorderBeam
                          duration={8}
                          size={100}
                          colorFrom="#00ED64"
                          colorTo="#00C85A"
                        />
                        {tab.description && (
                          <div
                            className={cn(
                              "absolute bottom-0 left-0 right-0 bg-gradient-to-t p-6",
                              isDark ? "from-[#001E2B]" : "from-white/95",
                            )}
                          >
                            <p
                              className={cn(
                                "text-sm font-medium",
                                isDark ? "text-white" : "text-[#0E1116]",
                              )}
                            >
                              {tab.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </div>

             
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 -z-10 h-px",
                    isDark ? "bg-white/20" : "bg-[#C8CDD3]",
                  )}
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)",
                  }}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 -z-10 h-px",
                    isDark ? "bg-white/20" : "bg-[#C8CDD3]",
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
    </section>
  );
};

export { HeroModern };
