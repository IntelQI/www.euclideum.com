"use client";

import React from "react";
import { cn } from "@/lib/utils";

const ROW1_LOGOS = [
  "/logos/aws.svg",
  "/logos/google-cloud.svg",
  "/logos/azure.svg",
  "/logos/accenture.svg",
  "/logos/hashicorp.svg",
  "/logos/datadog.svg",
  "/logos/cohere.svg",
  "/logos/langchain.svg",
];

const ROW2_LOGOS = [
  "/logos/capgemini.svg",
  "/logos/fireworks-ai.svg",
  "/logos/tcs.svg",
  "/logos/techm.svg",
  "/logos/confluent.svg",
  "/logos/databricks.svg",
  "/logos/cohere.svg",
  "/logos/capgemini.svg",
];

export default function LogoMarquee() {
  return (
    <section aria-label="Partner logos" className="w-full bg-transparent">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Row 1 */}
        <div className="relative overflow-hidden">
          <div className="marquee group">
            <ul
              className={cn(
                "flex items-center gap-6 md:gap-8",
                "animate-marquee-left group-hover:animation-paused",
              )}
            >
              {ROW1_LOGOS.map((src, i) => (
                <li key={`r1-${i}`} className="logo-tile shrink-0">
                  <img src={src} alt={getAlt(src)} className="logo-img" />
                </li>
              ))}

              {/* cloned for seamless loop (aria-hidden) */}
              {ROW1_LOGOS.map((src, i) => (
                <li
                  key={`r1-clone-${i}`}
                  className="logo-tile shrink-0"
                  aria-hidden
                >
                  <img src={src} alt="" className="logo-img" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-7 md:h-8" />

        {/* Row 2 (reverse) */}
        <div className="relative overflow-hidden">
          <div className="marquee group">
            <ul
              className={cn(
                "flex items-center gap-6 md:gap-8",
                "animate-marquee-right group-hover:animation-paused",
              )}
            >
              {ROW2_LOGOS.map((src, i) => (
                <li key={`r2-${i}`} className="logo-tile shrink-0">
                  <img src={src} alt={getAlt(src)} className="logo-img" />
                </li>
              ))}

              {/* clones */}
              {ROW2_LOGOS.map((src, i) => (
                <li
                  key={`r2-clone-${i}`}
                  className="logo-tile shrink-0"
                  aria-hidden
                >
                  <img src={src} alt="" className="logo-img" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-tile {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 280px;
          height: 72px;
          padding: 16px 20px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid rgba(11, 17, 22, 0.04);
          box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
        }

        .logo-img {
          max-height: 40px;
          width: 100%;
          object-fit: contain;
          display: block;
        }

        /* responsive sizes */
        @media (min-width: 768px) {
          .logo-tile {
            height: 88px;
            padding: 20px 28px;
            min-width: 300px;
          }
          .logo-img {
            max-height: 48px;
          }
        }

        @media (min-width: 1024px) {
          .logo-tile {
            height: 112px;
            padding: 28px 32px;
            min-width: 320px;
          }
          .logo-img {
            max-height: 56px;
          }
        }

        .marquee ul {
          width: max-content;
        }

        /* animations */
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 36s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 36s linear infinite;
        }

        .group-hover\:animation-paused:hover {
          animation-play-state: paused;
        }

        /* utility for pause-on-hover using the parent .group */
        .group:hover ul {
          animation-play-state: paused;
        }

        /* prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function getAlt(src: string) {
  const name =
    src
      .split("/")
      .pop()
      ?.replace(/\.svg$/, "") || "logo";
  return name.replace(/[-_]/g, " ");
}
