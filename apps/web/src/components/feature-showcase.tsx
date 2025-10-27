"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Card {
  title: string;
  body: string;
  image: string;
}

const defaultCards: Card[] = [
  {
    title: "MongoDB Skill Badges",
    body: "Enhance your MongoDB knowledge with free, focused Skill Badge credentials designed to help you quickly learn and validate specific skills.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-1.png",
  },
  {
    title: "MongoDB University",
    body: "Take free, expert-led courses to sharpen your skills and earn industry-recognized badges.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-dashboard-2.png",
  },
  {
    title: "Atlas Learning Hub",
    body: "Discover tutorials, guides, and labs to master MongoDB Atlas and its features.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/admin-developer.png",
  },
];

export const FeatureShowcase = ({
  cards = defaultCards,
}: {
  cards?: Card[];
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  const useCases = [
    {
      key: "vector-search",
      title: "Vector Search",
      heading: "Vector Search Use Cases",
      body: "Guarantee millisecond response times at scale with a flexible document model. Use vectors for semantic search, recommendations, and context for Gen AI.",
      code: `db.collection.aggregate([\n  { \n    \"$vectorSearch\": { \n      \"index\": \"my_index\", \n      \"queryVector\": [0.03, 0.1, ...], \n      \"path\": \"description\", \n      \"limit\": 5\n    } \n  }\n])`,
    },
    {
      key: "stream-processing",
      title: "Stream Processing",
      heading: "Stream Processing with Atlas",
      body: "Ingest and process streams in real time using change streams and Atlas Triggers — enrich, transform, and persist events with low latency.",
      code: `// Example: watch change stream\nconst cursor = db.collection.watch();\nfor await (const change of cursor) {\n  // process event\n}`,
    },
    {
      key: "operational",
      title: "Operational",
      heading: "Operational Workloads",
      body: "Run high-throughput operational workloads with flexible schema, powerful indexing and in-memory performance with WiredTiger and Atlas optimizations.",
      code: `// Operational read example\nconst doc = await db.collection.findOne({ _id: id });`,
    },
    {
      key: "transactional",
      title: "Transactional",
      heading: "Transactional Guarantees",
      body: "Use multi-document ACID transactions to ensure correctness in business-critical flows across distributed data.",
      code: `// Transaction example\nconst session = client.startSession();\nsession.startTransaction();\n// ...commit/abort`,
    },
    {
      key: "text-search",
      title: "Text Search",
      heading: "Full Text Search",
      body: "Leverage Atlas Search for powerful full-text and relevance-driven queries over your documents with language-aware analyzers.",
      code: `db.articles.aggregate([{ $search: { text: { query: \"mongodb\", path: \"content\" } } }])`,
    },
    {
      key: "analytical",
      title: "Analytical",
      heading: "Analytical Queries",
      body: "Combine operational and analytical workloads with Atlas Data Lake and aggregation pipeline optimizations for insights at scale.",
      code: `// Aggregation example\ndb.collection.aggregate([{ $group: { _id: '$category', total: { $sum: 1 } } }])`,
    },
    {
      key: "graph",
      title: "Graph",
      heading: "Graph Use Cases",
      body: "Model connected data naturally and run efficient traversals and recommendations using MongoDB’s flexible document model.",
      code: `// Simple graph pattern lookup\ndb.nodes.find({ neighbors: { $elemMatch: { id: rootId } } })`,
    },
    {
      key: "geospatial",
      title: "Geospatial",
      heading: "Geospatial",
      body: "Run location-aware queries, nearest-neighbor searches and geofencing with GeoJSON indexes and spatial operators.",
      code: `db.places.find({ location: { $near: { $geometry: { type: 'Point', coordinates: [lng, lat] }, $maxDistance: 1000 } } })`,
    },
  ];

  const [selectedUseCase, setSelectedUseCase] = useState<string>(
    useCases[0]!.key,
  );

  useEffect(() => {
    // prefer resolvedTheme when available
    const t = resolvedTheme || theme;
    setIsDark(t === "dark");
  }, [theme, resolvedTheme]);

  return (
    <div className="rounded-br-5xl ">
      {/* Skills section */}
      <section
        className={cn("py-20", isDark ? "bg-[#001E2B]" : "bg-[#F9FAFB]")}
        aria-labelledby="feature-showcase-heading"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="max-w-md">
              <h2
                id="feature-showcase-heading"
                className={cn(
                  "text-5xl  md:text-4xl h-[90px] font-semibold leading-tight ",
                  isDark
                    ? "bg-gradient-to-b from-[#C6FF00] via-[#A3FF3C] to-[#00ED64] bg-clip-text text-transparent"
                    : "text-[black]",
                )}
                style={
                  isDark
                    ? {
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 8px 24px rgba(0, 237, 100, 0.06)",
                      }
                    : undefined
                }
              >
                Level Up Your
                <br />
                MongoDB Skills
              </h2>
              <p
                className={cn(
                  "mb-6 max-w-[390px] text-2xl opacity-75",
                  isDark ? "text-[#D1D5DB]" : "text-[#3A4048]",
                )}
              >
                Access the tools, guides, and <br /> training you need to build
                faster and <br />
                smarter with MongoDB.
              </p>
              <Button asChild>
                <a
                  href="#"
                  aria-label="Product Documentation"
                  className={cn(
                    "focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 gap-2 rounded-full shadow-md",
                    isDark
                      ? "bg-[#00ED64] text-[#001E2B] hover:bg-[#00C85A] focus-visible:ring-[#00ED64]/20"
                      : "bg-[#00ED64] text-[#001E2B] hover:bg-[#00C85A] focus-visible:ring-[#00ED64]/20",
                  )}
                >
                  <span>Product Documentation</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="w-4 h-4"
                  >
                    <path
                      d="M5 12h14"
                      stroke="#001E2B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 6l6 6-6 6"
                      stroke="#001E2B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Button>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((c) => (
                  <article
                    key={c.title}
                    className={cn(
                      "rounded-[32px] overflow-hidden p-6 shadow-[0_8px_30px_rgba(2,6,23,0.45)]",
                      "bg-white border border-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "mb-6 h-44 w-full rounded-xl flex items-center justify-center",
                        isDark ? "bg-[#F5F6F7]" : "bg-[#F5F6F7]",
                      )}
                    >
                      <img
                        src={c.image}
                        alt={c.title}
                        className="h-full w-full object-contain rounded-md"
                      />
                    </div>

                    <h3
                      className={cn(
                        "text-2xl font-semibold mb-3 text-[#0B3C5D]",
                      )}
                    >
                      {c.title}
                    </h3>

                    <p className="text-sm mb-6 text-[#3A4048]">{c.body}</p>

                    <a
                      href="#"
                      className={cn(
                        "inline-flex items-center text-sm font-medium text-[#0B3C5D]",
                        "gap-2",
                      )}
                    >
                      <span>Learn more</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className="w-4 h-4"
                      >
                        <path
                          d="M5 12h14"
                          stroke="#0B3C5D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 6l6 6-6 6"
                          stroke="#0B3C5D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner section */}
      <section
        className={cn(isDark ? "bg-[#001E2B] py-14" : "bg-[#F9FAFB] py-14")}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1
                className={cn(
                  "font-serif font-normal leading-tight",
                  "text-5xl md:text-6xl lg:text-7xl",
                  isDark ? "text-white" : "text-[#0E1116]",
                )}
              >
                MongoDB Atlas
              </h1>
              <p
                className={cn(
                  "mt-2 text-4xl opacity-75",
                  isDark ? "text-[#D1D5DB]" : "text-[#3A4048]",
                )}
              >
                The modern database for any use case
              </p>
            </div>

            <div className="flex items-center">
              <a
                href="#"
                aria-label="Learn about the platform"
                className={cn(
                  "inline-flex items-center gap-2 text-xl font-medium",
                  isDark ? "text-white" : "text-[#0B3C5D]",
                )}
              >
                <span>Learn about the platform</span>
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-8 h-8 rounded-full",
                    isDark
                      ? "bg-[#001E2B] border border-white/10"
                      : "bg-[#fff] border border-[#ECEEF1]",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className={cn(
                      isDark ? "stroke-[#00ED64]" : "stroke-[#00ED64]",
                    )}
                  >
                    <path
                      d="M5 12h14"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 6l6 6-6 6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vector Search section */}
      <section
        className={cn(
          isDark
            ? "bg-[#001E2B] py-1 pb-20 rounded-br-[5rem] "
            : "bg-[#F9FAFB] py-1  pb-20 ",
        )}
      >
        <div className="flex mx-auto px-20">
          <main className="flex-1">
            <div className="flex gap-12 items-center">
              {/* Left Nav */}
              <nav
                aria-label="use-cases nav"
                className="hidden lg:block lg:w-[250px] shrink-0"
              >
                <ul className="space-y-4 pl-4">
                  {useCases.map((uc) => {
                    const active = uc.key === selectedUseCase;
                    return (
                      <li key={uc.key} className="flex items-start">
                        <div
                          className={cn(
                            "w-1 mr-4 rounded-full transition-all",
                            active ? "bg-[#00ED64] h-6" : "bg-white/10 h-4",
                          )}
                          aria-hidden
                        />
                        <button
                          onClick={() => setSelectedUseCase(uc.key)}
                          aria-pressed={active}
                          className={cn(
                            "text-left w-full text-sm font-medium leading-relaxed transition-colors",
                            active
                              ? isDark
                                ? "text-white font-semibold"
                                : "text-[#0B3C5D] font-semibold"
                              : isDark
                                ? "text-[#D1D5DB] opacity-90"
                                : "text-[#3A4048]",
                          )}
                        >
                          {uc.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className=" flex items-center justify-center">
                <div
                  className={cn(
                    "rounded-2xl px-20 lg:py-[4rem] relative overflow-hidden bg-[#081C24] w-[100%] max-w-[2000px]",
                    isDark ? "bg-[#061621]" : "bg-white",
                  )}
                  style={{
                    boxShadow: isDark
                      ? "0 8px 30px rgba(2,6,23,0.45)"
                      : "0 6px 20px rgba(2,6,23,0.06)",
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-center">
                    {/* Main Content (changes with selection) */}
                    <div className="flex flex-col justify-center">
                      {(() => {
                        const active = useCases.find(
                          (u) => u.key === selectedUseCase,
                        )!;
                        return (
                          <>
                            <h2
                              className={cn(
                                "text-3xl md:text-4xl font-semibold mb-4",
                                isDark ? "text-white" : "text-[#0E1116]",
                              )}
                            >
                              {active.heading}
                            </h2>
                            <p
                              className={cn(
                                "max-w-xl text-lg leading-relaxed mb-8",
                                isDark ? "text-[#D1D5DB]" : "text-[#3A4048]",
                              )}
                            >
                              {active.body}
                            </p>

                            <div className="flex items-center gap-8">
                              <a
                                href="#"
                                className={cn(
                                  "inline-flex items-center justify-center rounded-md font-medium h-12 px-6",
                                  isDark
                                    ? "bg-[#00ED64] text-[#001E2B] hover:bg-[#00C85A]"
                                    : "bg-[#00ED64] text-[#001E2B] hover:bg-[#00C85A]",
                                )}
                              >
                                Learn More
                              </a>

                              <a
                                href="#"
                                className={cn(
                                  "inline-flex items-center gap-2 text-base",
                                  isDark ? "text-[#D1D5DB]" : "text-[#0B3C5D]",
                                )}
                              >
                                Documentation
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  aria-hidden
                                  className={cn(
                                    isDark
                                      ? "stroke-[#00ED64]"
                                      : "stroke-[#0B3C5D]",
                                  )}
                                >
                                  <path
                                    d="M5 12h14"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M13 6l6 6-6 6"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </a>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Right Visuals */}
                    <div className="relative">
                      {/* Code card */}
                      <div
                        className={cn(
                          "rounded-xl p-6 max-w-[420px] shadow-[0_6px_30px_rgba(0,0,0,0.25)]",
                          isDark
                            ? "bg-[#001924] text-[#D1D5DB]"
                            : "bg-[#0B3C5D] text-white",
                        )}
                        style={{ borderRadius: 12 }}
                      >
                        <pre
                          className="text-sm leading-relaxed overflow-hidden"
                          aria-hidden
                        >
                          {`db.plant_embed.aggregate([
  {
    "$vectorSearch": {
      "index": "my_plant_index",
      "queryVector": [0.03, 0.1, ...],
      "path": "description",
      "limit": 5,
      "numCandidates": 20
    }
  }
])`}
                        </pre>
                      </div>

                      {/* Illustration overlay */}
                      <div
                        className="absolute -right-8 -top-8 w-56 h-48 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(2,6,23,0.5)]"
                        style={{ background: isDark ? "#0B3C5D" : "#E8F1F7" }}
                      >
                        {/* Placeholder illustration box */}
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            width="160"
                            height="120"
                            viewBox="0 0 160 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                          >
                            <rect
                              x="8"
                              y="8"
                              width="144"
                              height="104"
                              rx="12"
                              fill={isDark ? "#194A6B" : "#0B3C5D"}
                              opacity="0.9"
                            />
                            <circle cx="60" cy="50" r="10" fill="#00ED64" />
                            <rect
                              x="100"
                              y="30"
                              width="12"
                              height="12"
                              rx="2"
                              fill="#A64CFF"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default FeatureShowcase;
