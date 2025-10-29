"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming cn is at this path
import { useEffect, useState, useRef, KeyboardEvent } from "react";

// --- Data for the component ---
// Based on the state model provided in the description
const stepData = {
  deploy: {
    title: "Deploy a database",
    description:
      "Create a cloud database in seconds using the Atlas UI, CLI, Kubernetes Operator, or an Infrastructure-as-Code (IaC) resource provider. Play around with a free cluster, launch a flex tier instance, or customize a dedicated cluster configuration.",
    cta: { text: "Get started with Atlas", href: "#" },
    tabs: [
      "Atlas CLI",
      "Terraform",
      "AWS CloudFormation",
      "Kubernetes Operator",
    ],
    code: [
      `# 1. Create your cluster
atlas cluster create myCluster \\
  --provider AWS \\
  --region US_EAST_1 \\
  --tier M10

# 2. Load sample data
atlas cluster loadSampleData myCluster

# 3. Get your connection string
atlas cluster connectionString myCluster
`,
      `# main.tf
resource "mongodbatlas_cluster" "my_cluster" {
  project_id   = "<YOUR-PROJECT-ID>"
  name         = "myCluster"
  provider_name = "AWS"
  
  provider_instance_size_name = "M10"
  provider_region_name      = "US_EAST_1"
}
`,
      `# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'MongoDB Atlas Cluster'
Resources:
  MyCluster:
    Type: 'MongoDB::Atlas::Cluster'
    Properties:
      Name: 'myCluster'
      ProjectId: '<YOUR-PROJECT-ID>'
      ProviderSettings:
        ProviderName: 'AWS'
        InstanceSizeName: 'M10'
        RegionName: 'US_EAST_1'
`,
      `# cluster.yaml
apiVersion: atlas.mongodb.com/v1
kind: AtlasCluster
metadata:
  name: my-cluster
spec:
  projectRef:
    name: my-project
  
  providerSettings:
    instanceSizeName: M10
    providerName: AWS
    regionName: US_EAST_1
`,
    ],
  },
  query: {
    title: "Query data of any structure",
    description:
      "Our unified Query API makes it easy to work with any modern data such as arrays, geospatial, time series and more. Query, transform, and analyze data in place as your schema evolves.",
    cta: { text: "Learn about the Query API", href: "#" },
    tabs: [
      "CRUD",
      "Aggregation Pipeline",
      "Time Series",
      "Atlas Vector Search",
    ],
    code: [
      `// Find all restaurants in the Bronx
const restaurants = await db.collection("restaurants")
  .find({ borough: "Bronx" })
  .limit(5)
  .toArray();

console.log(restaurants);
`,
      `// Group restaurants by cuisine and count
const pipeline = [
  { $match: { borough: "Manhattan" } },
  { $group: { _id: "$cuisine", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
];

const aggCursor = db.collection("restaurants")
  .aggregate(pipeline);
`,
      `// Create a time series collection
db.createCollection(
  "weather",
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "sensorId",
      granularity: "hours"
    }
  }
)
`,
      `// Perform a $vectorSearch query
const pipeline = [
  {
    $vectorSearch: {
      index: "vector_index",
      path: "plot_embedding",
      queryVector: "<ARRAY-OF-FLOATS>",
      numCandidates: 100,
      limit: 10
    }
  }
]
`,
    ],
  },
  build: {
    title: "Build your way",
    description:
      "Build queries with the MongoDB Shell, Compass, or directly in your programming language of choice.",
    cta: { text: "See all drivers", href: "#" },
    tabs: ["Node.js", "Python", "Java", "Go"],
    code: [
      `// Connect with Node.js Driver
const { MongoClient } = require("mongodb");
const uri = "<YOUR-CONNECTION-STRING>";

const client = new MongoClient(uri);

async function run() {
  await client.connect();
  // ...
}
run().catch(console.dir);
`,
      `# Connect with PyMongo
from pymongo import MongoClient
uri = "<YOUR-CONNECTION-STRING>"

client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("Pinged! Connected successfully.")
except Exception as e:
    print(e)
`,
      `// Connect with Java Driver
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;

String uri = "<YOUR-CONNECTION-STRING>";

try (MongoClient mongoClient = MongoClients.create(uri)) {
    // ...
}
`,
      `// Connect with Go Driver
import "go.mongodb.org/mongo-driver/mongo"
import "go.mongodb.org/mongo-driver/mongo/options"

uri := "<YOUR-CONNECTION-STRING>"
client, err := mongo.Connect(context.TODO(), 
  options.Client().ApplyURI(uri))

if err != nil {
    panic(err)
}
`,
    ],
  },
};

type StepKey = keyof typeof stepData;

/**
 * An interactive, dark-themed "how-to" module with a
 * 2-column layout (navigation and code panel).
 */
export function CodeByte({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  const [activeStep, setActiveStep] = useState<StepKey>("deploy");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  type Step = {
    title: string;
    description: string;
    cta: {
      text: string;
      href: string;
    };
    tabs: string[];
    code: string[];
  };

  const currentStepData: Step = stepData[activeStep];
  const currentCode: string = currentStepData.code[activeTabIndex] ?? "";

  // --- Handlers ---

  const handleStepClick = (step: StepKey) => {
    setActiveStep(step);
    setActiveTabIndex(0); // Reset tab index when step changes
  };

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Keyboard navigation for tabs
  const handleTabKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % currentStepData.tabs.length;
    } else if (e.key === "ArrowLeft") {
      newIndex =
        (index - 1 + currentStepData.tabs.length) % currentStepData.tabs.length;
    } else {
      return; // Not an arrow key
    }

    e.preventDefault();
    setActiveTabIndex(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  // --- Color Tokens ---
  // This component is always dark, but uses different dark colors
  // from the palette based on the current theme.
  const canvasColor = isDark ? "bg-[#0B1217]" : "bg-[#17232E]";
  const cardColor = isDark ? "bg-[#162632]" : "bg-[#21313c]";
  const borderColor = isDark ? "border-[#264052]" : "border-[#36414A]";
  const textColor = isDark ? "text-[#E6F1F8]" : "text-black";
  const mutedTextColor = isDark ? "text-[#93A6B3]" : "text-gray-500";
  const accentColor = isDark ? "text-[#44EB88]" : "text-[#01ec64]";
  const accentBg = isDark ? "bg-[#44EB88]" : "bg-[#01ec64]";
  const accentTextDark = isDark ? "text-[#0B1217]" : "text-[#17232E]";
  const chipBg = isDark ? "bg-[#1A2C39]" : "bg-[#36414A]";
  const focusRing = isDark
    ? "focus-visible:ring-[#22E38F]"
    : "focus-visible:ring-[#17B26A]";
  const focusOffset = isDark
    ? "focus-visible:ring-offset-[#0B1217]"
    : "focus-visible:ring-offset-[#17232E]";
  const accentBorder = isDark ? "border-[#44EB88]" : "border-[#1FDA7C]"; // Using light brand-500
  const inactiveBorder = isDark
    ? "border-[#264052] hover:border-[#5F6C7B]" // dark: border-500, light: text-600
    : "border-[#E2E8F0] hover:border-[#A4B1C0]"; // light: border-200, text-400
  const inactiveHoverBg = isDark ? "hover:bg-white/5" : "hover:bg-black/5";
  const activeBg = isDark ? "bg-white/5" : "bg-black/5";

  return (
    <section
      className={cn("w-full py-16 md:py-[8rem] bg-background", className)}
    >
      {/* Centered, left-aligned inner container */}
      <div className="w-full max-w-[100%] mx-auto px-20">
        {/* Headline:
          - Very large display type
          - Tight leading and tracking
          - High contrast color
        */}
        <h2
          className={cn(
            "text-5xl md:text-6xl font-normal leading-[1.1] tracking-relaxed",
            isDark
              ? "text-[#E6F1F8]" // dark: text-100 (near-white)
              : "text-black", // light: panel-400 (white)
          )}
        >
          Built for the way you work <br /> with data
        </h2>

        {/* Subtext:
          - Smaller, muted gray text
          - Readable line length (max-w-prose)
          - Comfortable top margin
        */}
        <p
          className={cn(
            "mt-6 text-xl max-w-3xl",
            isDark
              ? "text-[#93A6B3]" // dark: text-300 (muted gray)
              : "text-gray-500", // light: text-400 (muted gray)
          )}
        >
          Our platform is built by developers, for developers. That means giving
          you the flexibility to work with the languages and tools you prefer to
          use.
        </p>
      </div>

      {/* Centered, 2-column grid */}
      <div className="w-full mt-20 max-w-[100%] mx-auto px-20 grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* == Left Column: Navigation == */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          {/* View Docs Button */}
          <a
            href="#start-learning" // <-- Replace with your link
            className={cn(
              "inline-block self-start px-10 py-3 text-black",
              " rounded-sm hover:rounded-full font-semibold text-md shadow-sm", // "pill-shaped"
              "transition-all duration-200 ease-in-out",
              "motion-safe:hover:shadow-md motion-safe:hover:brightness-110",
              "motion-safe:active:translate-y-px motion-safe:active:brightness-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              accentBg,
            )}
            aria-label="Start Learning"
          >
            View Documentation
          </a>

          <nav className="flex flex-col">
            {(Object.keys(stepData) as StepKey[]).map((key) => {
              const step = stepData[key];
              const isActive = activeStep === key;
              return (
                // This parent div now controls the full-height left border
                <div
                  key={key}
                  className={cn(
                    "w-full border-l-4",
                    "motion-safe:transition-colors motion-safe:duration-200",
                    isActive ? accentBorder : inactiveBorder,
                  )}
                >
                  {/* Step Button */}
                  <button
                    aria-expanded={isActive}
                    aria-controls={`how-to-panel-${key}`}
                    onClick={() => handleStepClick(key)}
                    className={cn(
                      "flex items-center w-full p-4 text-left", // Use p-4 for consistent spacing
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ",
                      focusRing,
                      focusOffset,
                      "motion-safe:transition-colors",
                    )}
                  >
                    {/* Title (no chevron, no separate accent) */}
                    <span className={cn("font-semibold text-2xl", textColor)}>
                      {step.title}
                    </span>
                  </button>

                  {/* Collapsible Content */}
                  <div
                    id={`how-to-panel-${key}`}
                    className={cn(
                      "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-200 ease-in-out",
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden ">
                      {/* Content wrapper with correct padding and spacing */}
                      <div
                        className={cn(
                          "pl-4 pr-4 pt-3 pb-4 flex flex-col gap-3", // 12px spacing
                        )}
                      >
                        <p
                          className={cn(
                            "text-md leading-relaxed", // 1.6-1.75 line-height
                            mutedTextColor,
                          )}
                        >
                          {step.description}
                        </p>
                        <a
                          href={step.cta.href}
                          className={cn(
                            "inline-flex self-start items-center gap-1.5 text-sm font-medium",
                            accentColor,
                            "hover:underline",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            focusRing,
                            focusOffset,
                            "rounded-sm",
                          )}
                        >
                          {step.cta.text}
                          {/* Trailing chevron */}
                          <ArrowRightIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* == Right Column: Code Panel == */}
        <article className="lg:col-span-6">
          <div
            className={cn(
              "w-full rounded-lg shadow-lg min-h-[520px] flex flex-col",
              cardColor,
            )}
          >
            {/* Tab Row (Chips) */}
            <div
              role="tablist"
              aria-label="Code language/tool"
              className="flex flex-wrap gap-2 p-4 border-b"
            >
              {currentStepData.tabs.map((tab, index) => {
                const isActive = activeTabIndex === index;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleTabClick(index)}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      focusRing,
                      "focus-visible:ring-offset-[#162632]", // Card color
                      isActive
                        ? cn(accentBg, accentTextDark)
                        : cn(chipBg, mutedTextColor, "hover:bg-white/10"),
                    )}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Code Area */}
            <div className="relative flex-1 p-6 overflow-auto">
              <pre className="text-sm font-mono leading-relaxed">
                {currentCode.split("\n").map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span
                      className={cn(
                        "w-4 text-right select-none",
                        mutedTextColor,
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={"text-white"}>{line}</span>
                  </div>
                ))}
              </pre>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className={cn(
                  "absolute top-4 right-4 p-2 rounded-md transition-colors",
                  chipBg,
                  mutedTextColor,
                  "hover:bg-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  focusRing,
                  "focus-visible:ring-offset-[#162632]",
                )}
              >
                {isCopied ? (
                  <CheckIcon className={cn("w-5 h-5", accentColor)} />
                ) : (
                  <ClipboardIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

// --- SVG Icons ---

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9A2.25 2.25 0 0 1 6.75 4.5v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
    />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);
