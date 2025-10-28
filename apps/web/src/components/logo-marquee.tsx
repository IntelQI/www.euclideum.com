"use client";

import React from "react";
import { cn } from "@/lib/utils";

const ROW1_LOGOS = [
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt0462ae8bbfea7451/64d2713b646ccd3df08229a7/lgwpl72akptbke7gp-AWS_logo_RGB.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt656769ac48060ba9/667ee74b66137ca874adb4cd/google_cloud.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt31a78bf43a83fe84/6682e296c66c881d2d69e73f/Microsoft-Azure-Logo.png",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt2d7e45517bf0a2e9/651eb42b865dec192b0f2916/Accenture.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt2c5cf94d677bbe92/64d279cce965ce82b1ee9c57/HashiCorp_PrimaryLogo_Black_RGB.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt6b7ce9927224420b/64d62fc9d62acf0c89d9eaa4/kzpulv998d4x9q545-logo-confluent.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt9345a9be59b72c03/667ed5cd5e288d732ba2170a/databricks.svg",
];

const ROW2_LOGOS = [
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt0692b0764b072d37/64d2845e7c819b77b870c066/TechM_Logo_1.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/bltab16177ac42999b6/64d2751f2e1187dd89425539/Datadog_-_horizontal_color_logo.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt67e66b27eef39e5a/64d27fe40a8e99589e0e85b7/TCS.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt0591180a8cfe0141/667ee6adaaed4123f844cd76/fireworks-ai.png",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/blt3defbe7bd50cf619/6792abf6c459cf5724ae888c/LangChain-logo.svg",
  "https://images.contentstack.io/v3/assets/blt7151619cb9560896/bltd06130f165840c32/667ee50eabc513b0cf5d1676/cohere.svg",
];

export default function LogoMarquee() {
  return (
    <section aria-label="Partner logos" className="w-full bg-transparent">
      <div className=" max-w-[100%]lg:py-6 md:py-8 lg:py-10 ">
        {/* Row 1 */}
        <div className="relative overflow-hidden  py-5 ">
          <div className="marquee group">
            <ul
              className={cn(
                "flex items-center gap-6 md:gap-8 ",
                "animate-marquee-left group-hover:animation-paused",
              )}
            >
              {ROW1_LOGOS.map((src, i) => (
                <li key={`r1-${i}`} className="logo-tile shrink-5 ">
                  <img src={src} alt={getAlt(src)} className="logo-img " />
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

        {/* Row 2 (reverse) */}
        <div className="relative overflow-hidden py-5 ">
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
          transition:
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        /* make the logo intentionally smaller and scale on tile hover */
        .logo-img {
          max-height: 28px;
          width: auto;
          object-fit: contain;
          display: block;
          transition:
            transform 220ms cubic-bezier(0.2, 0, 0, 1),
            filter 220ms ease;
          will-change: transform;
        }

        .logo-tile:hover {
          transform: scale(1.18);
        }

        /* responsive sizes */
        @media (min-width: 768px) {
          .logo-tile {
            height: 88px;
            padding: 20px 28px;
            min-width: 300px;
          }
          .logo-img {
            max-height: 36px;
          }
        }

        @media (min-width: 1024px) {
          .logo-tile {
            height: 112px;
            padding: 28px 32px;
            min-width: 320px;
            background-color: #ffffffff;
          }
          .logo-img {
            max-height: 44px;
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
