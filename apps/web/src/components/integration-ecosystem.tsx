"use client";

import React from "react";
import { cn } from "@/lib/utils";

const BRAND = "#072F49"; // brand-600 from design tokens

export default function IntegrationEcosystem() {
  return (
    <section
      aria-labelledby="ecosys-heading"
      className="w-full"
      style={{ paddingBlock: "72px" }}
    >
      <div
        className="mx-auto "
        style={{
          maxWidth: "95%",
          paddingInline: "clamp(24px, 4vw, 40px)",
        }}
      >
        <div
          className={cn(
            "grid gap-5 ",
            // at larger widths use two-column layout with 68% / 32%
            "lg:grid-cols-[68%_32%] lg:gap-[8%]",
          )}
        >
          <div className="left">
            <h1
              id="ecosys-heading"
              className="m-0 font-semibold leading-[1.08]"
              style={{
                fontSize: "40px",
                color: "#0E1116",
                lineHeight: 1.08,
                margin: 0,
              }}
            >
              Works seamlessly with your tech
              <br />
              stack
            </h1>
            <p
              className="mt-4"
              style={{
                color: "#6B7280", // muted gray
                fontSize: "clamp(16px,2.2vw,18px)",
                lineHeight: 1.6,
                marginTop: 16,
              }}
            >
              MongoDB integrates with 100+ of your favorite technologies
            </p>
          </div>

          <div className="right flex items-start ">
            <a
              href="#"
              className="group inline-flex items-center"
              style={{
                color: BRAND,
                textDecoration: "none",
                minHeight: 44,
                padding: "6px 8px",
                alignSelf: "flex-start",
                transition: "all 220ms ease-in-out",
              }}
              aria-label="Explore our ecosystem"
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: "20px",
                  display: "inline-block",
                }}
              >
                Explore our ecosystem
              </span>
              <svg
                className="chev ml-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{ transition: "filter 220ms ease-in-out" }}
              >
                <path
                  d="M6 4l8 8-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          section[aria-labelledby="ecosys-heading"] {
            padding-block: 56px;
          }
          .right {
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          section[aria-labelledby="ecosys-heading"] {
            padding-block: 40px;
          }
          .right {
            justify-content: center;
          }
        }
        a.group:focus-visible {
          outline: 2px solid ${BRAND};
          outline-offset: 3px;
        }
        a.group:hover {
          text-decoration: underline;
          filter: brightness(1.02);
        }
      `}</style>
    </section>
  );
}
