"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/opendocs/hooks/use-mounted";

type Stat = { value: string; label: string };
type Cta = { type: "primary" | "link"; label: string; href: string };
type Case = {
  id: string;
  logoSrc: string;
  logoAlt: string;
  industry: string;
  quote: string;
  stats: Stat[];
  ctas: Cta[];
  logoH: number;
};

const CASES: Case[] = [
  {
    id: "vsco",
    logoSrc:
      "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt8e525aa25c369eb6/67e67f6f6d13e7638936ee26/Victoria_s-Secret-VS&Co-Logo_Primary_Black.png",
    logoAlt: "VS & Co",
    industry: "Retail",
    quote:
      '"MongoDB and everything that comes with it was great. We could automate deployments and scalability monitoring, and we had advanced features like search charts and a vector store that didn\'t exist before."',
    stats: [
      { value: "200", label: "databases migrated to Atlas in 4 months" },
      { value: "240%", label: "improvement in API performance" },
    ],
    ctas: [
      { type: "primary", label: "Read Case Study", href: "#" },
      { type: "link", label: "MongoDB for Retail →", href: "#" },
    ],
    logoH: 10,
  },
  {
    id: "toyota",
    logoSrc:
      "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt46818d8080f9f444/672e37cd4ef10474bce55676/Toyota-connected-logo.png",
    logoAlt: "Toyota Connected",
    industry: "Automotive",
    quote:
      '"With MongoDB Atlas, we were able to reduce our operational overhead significantly while improving our application performance and developer productivity."',
    stats: [
      { value: "60%", label: "reduction in operational costs" },
      { value: "3x", label: "faster development cycles" },
    ],
    ctas: [
      { type: "primary", label: "Read Case Study", href: "#" },
      { type: "link", label: "MongoDB for Automotive →", href: "#" },
    ],
    logoH: 10,
  },
  {
    id: "lgu",
    logoSrc:
      "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt3edc1488b3ebd6d3/682c8a3161e0ea29ee9c7ce8/LG_U-logo.svg",
    logoAlt: "LG U+",
    industry: "Telecommunications",
    quote:
      '"MongoDB Atlas Vector Search has transformed how we handle complex data queries, enabling us to deliver more personalized experiences to our customers."',
    stats: [
      { value: "90%", label: "improvement in search accuracy" },
      { value: "45M", label: "daily queries processed" },
    ],
    ctas: [
      { type: "primary", label: "Read Case Study", href: "#" },
      { type: "link", label: "MongoDB for Telco →", href: "#" },
    ],
    logoH: 10,
  },
  {
    id: "novo",
    logoSrc:
      "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt12e111514b9241f2/671165694f7622eec2cb91ea/Novo_Nordisk.svg",
    logoAlt: "Novo Nordisk",
    industry: "Healthcare",
    quote:
      '"The flexibility of MongoDB\'s document model allowed us to iterate quickly while maintaining HIPAA compliance and ensuring high availability of our critical systems."',
    stats: [
      { value: "99.99%", label: "system uptime achieved" },
      { value: "150M+", label: "patient records managed securely" },
    ],
    ctas: [
      { type: "primary", label: "Read Case Study", href: "#" },
      { type: "link", label: "MongoDB for Healthcare →", href: "#" },
    ],
    logoH: 20,
  },
  {
    id: "coinbase",
    logoSrc:
      "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt306c47b59b9b4cbf/658453d44135c4a381567fa7/Coinbase.svg",
    logoAlt: "Coinbase",
    industry: "Financial Services",
    quote:
      '"MongoDB\'s ability to handle high-throughput transactions while maintaining ACID compliance was crucial for our cryptocurrency trading platform."',
    stats: [
      { value: "5M+", label: "transactions processed per day" },
      { value: "<10ms", label: "average transaction latency" },
    ],
    ctas: [
      { type: "primary", label: "Read Case Study", href: "#" },
      { type: "link", label: "MongoDB for FinTech →", href: "#" },
    ],
    logoH: 10,
  },
];

export default function DeveloperSection() {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  
  // Default to light theme for initial render to match server-side
  // Server doesn't know theme, so it renders with light theme classes
  // After mount, we'll update to the actual theme
  const [isDark, setIsDark] = useState<boolean>(false);
  
  useEffect(() => {
    if (!mounted) return;
    // Wait a tick to ensure hydration is complete before updating theme
    const timeoutId = setTimeout(() => {
      const currentTheme = resolvedTheme || theme || "dark";
      setIsDark(currentTheme === "dark");
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [theme, resolvedTheme, mounted]);
  
  // Use light theme during SSR and initial client render to match server output
  const effectiveIsDark = mounted ? isDark : false;

  const [selected, setSelected] = useState<number>(0);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCase = CASES[selected];

  // Generate unique IDs for ARIA relationships
  const ids = CASES.map((_, i) => `case-tab-${i}`);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSelected((s) => {
        const next = (s + 1) % CASES.length;
        btnRefs.current[next]?.focus();
        return next;
      });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSelected((s) => {
        const prev = (s - 1 + CASES.length) % CASES.length;
        btnRefs.current[prev]?.focus();
        return prev;
      });
    }
  };

  return (
    <section className={cn("w-full py-16 md:py-20 bg-transparent")}>
      <div className="mx-auto max-w-[100%] px-6 md:px-8 lg:px-[12rem]">
        <div className="grid grid-cols-1 md:grid-cols-12 items-start">
          <h2
            className={cn(
              "col-span-8 text-3xl md:text-4xl font-semibold leading-tight",
              effectiveIsDark ? "text-black" : "text-slate-900",
            )}
            suppressHydrationWarning
          >
            Loved by developers, trusted by <br /> enterprises
          </h2>

          <div className="col-span-4 mt-6 md:mt-1 md:text-right">
            <a
              href="#"
              className={cn(
                "inline-flex items-center gap-2 text-base font-medium hover:underline focus:outline-none",
                effectiveIsDark
                  ? "text-[black] focus-visible:outline-[#00ED64]"
                  : "text-[#2563EB] focus-visible:outline-[#2563EB]",
              )}
            >
              <span>View all customer stories</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-2 w-[100%] sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 pt-10">
            {CASES.map((c, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={c.id}
                  id={ids[idx]}
                  type="button"
                  role="tab"
                  ref={(el) => {
                    btnRefs.current[idx] = el;
                  }}
                  onClick={() => setSelected(idx)}
                  onKeyDown={handleKey}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className={cn(
                    "group flex flex-col items-center gap-4 px-6 md:px-8 lg:px-10 bg-transparent focus:outline-none",
                    "focus-visible:outline-2 focus-visible:outline-offset-3",
                    effectiveIsDark
                      ? "focus-visible:outline-[#00ED64]"
                      : "focus-visible:outline-[#2563EB]",
                  )}
                >
                  <img
                    src={c.logoSrc}
                    alt={c.logoAlt}
                    loading="lazy"
                    className={cn(
                      "w-auto object-contain grayscale transition-all duration-200",
                      "h-8 md:h-10 lg:h-14",
                      "opacity-80 group-hover:opacity-100",
                    )}
                  />

                  <span
                    role="presentation"
                    style={{ height: "2.5px" }}
                    className={cn(
                      "block w-full rounded-full transition-colors duration-200",
                      isSelected
                        ? effectiveIsDark
                          ? "bg-[#E8F1F7]" // brand-50
                          : "bg-[#0B3C5D]" // brand-500
                        : effectiveIsDark
                          ? "bg-[#3A4048]/30" // neutral-600/30
                          : "bg-[#ECEEF1]", // neutral-100
                      "group-hover:bg-opacity-80",
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Case Study Panel */}
          <div
            role="tabpanel"
            aria-labelledby={ids[selected]}
            className="grid grid-cols-1 px-[4rem] lg:grid-cols-12 gap-10 lg:gap-20 pt-20 items-center"
          >
            {/* Left metrics */}
            <aside className="lg:col-span-4 flex flex-col justify-center items-start">
              <img
                src={activeCase?.logoSrc}
                alt={activeCase?.logoAlt}
                className={`h-${activeCase?.logoH} w-auto mb-6 opacity-90`}
              />
              <div className="relative w-full">
                {/* Decorative curly brace between metrics and content (visual only) */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-12 top-0 bottom-0 w-24 flex items-center justify-center",
                    effectiveIsDark ? "text-[#3A4048]/10" : "text-[#ECEEF1]",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="111"
                    height="392"
                    viewBox="0 0 111 392"
                    fill="none"
                  >
                    <path
                      d="M110.976 391.68V357H91.392C72.216 357 67.32 349.248 67.32 329.664V239.904C67.32 215.016 59.568 202.368 43.656 195.84C59.568 189.72 67.32 177.48 67.32 152.592V62.016C67.32 42.84 72.216 34.68 91.392 34.68H110.976V0H82.008C44.472 0 28.152 21.216 28.152 58.344V152.592C28.152 168.504 23.664 178.704 5.304 178.704H0V213.384H5.304C23.664 213.384 28.152 223.584 28.152 239.904V333.336C28.152 370.464 44.472 391.68 82.008 391.68H110.976Z"
                      fill="#ebebebff"
                    ></path>
                  </svg>
                </div>

                <ul className="space-y-6 mt-[2rem]">
                  {activeCase?.stats.map((s, i) => (
                    <li key={i}>
                      <p
                        className={cn(
                          "text-4xl md:text-2xl font-semibold",
                          effectiveIsDark ? "text-[#01684b]" : "text-[#01684b]",
                        )}
                      >
                        {s.value}
                      </p>
                      <p
                        className={cn(
                          "mt-2 leading-relaxed text-sm w-[45%]",
                          effectiveIsDark ? "text-[#3A4048]" : "text-[#3A4048]",
                        )}
                      >
                        {s.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Right quote + CTAs */}
            <article className="lg:col-span-8 flex flex-col justify-center lg:pl-8">
              <p
                className={cn(
                  "text-xs font-semibold tracking-widest uppercase text-[black]",
                )}
              >
                {activeCase?.industry}
              </p>
              <blockquote
                className={cn(
                  "mt-3 text-xl md:text-2xl leading-relaxed text-[black]",
                )}
              >
                {activeCase?.quote}
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {activeCase?.ctas.map((c, i) =>
                  c.type === "primary" ? (
                    <a
                      key={i}
                      href={c.href}
                      // Primary: solid brand button (light: brand-600 background + white text)
                      className={cn(
                        "inline-flex items-center justify-center rounded-[10px] px-5 py-3 shadow-sm",
                        "transition duration-150",
                        effectiveIsDark
                          ? "bg-[#E8F1F7] text-[#072F49] hover:opacity-95"
                          : "bg-[#072F49] text-white hover:opacity-95",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        effectiveIsDark
                          ? "focus-visible:ring-[#E8F1F7]"
                          : "focus-visible:ring-[#0B3C5D]",
                      )}
                      aria-label={c.label}
                    >
                      {c.label}
                    </a>
                  ) : (
                    <a
                      key={i}
                      href={c.href}
                      className={cn(
                        "inline-flex items-center gap-2 font-medium",
                        "transition-colors duration-150 hover:underline",
                        effectiveIsDark ? "text-white" : "text-[#0B3C5D]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        effectiveIsDark
                          ? "focus-visible:ring-[#E8F1F7]"
                          : "focus-visible:ring-[#0B3C5D]",
                      )}
                      aria-label={c.label}
                    >
                      {c.label}
                    </a>
                  ),
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
