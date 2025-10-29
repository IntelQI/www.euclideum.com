"use client";

import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const World = dynamic(
  () => import("@/components/aceternity/globe").then((m) => m.World),
  {
    ssr: false,
  },
);

const globeConfig = {
  pointSize: 4,
  globeColor: "#37ecb0", // Bright turquoise green for ocean
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#37ecb0", // Match globe color
  emissiveIntensity: 0.15,
  shininess: 0.9,
  polygonColor: "#ffffff", // White continents
  ambientLight: "#10b981",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 3000, // Slower animation - 3 seconds instead of 1
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.3, // Slower rotation speed
};

const colors = ["#10b981", "#22c55e", "#34d399"];

const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: "#10b981",
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: "#22c55e",
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: "#34d399",
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: "#10b981",
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: "#22c55e",
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: "#34d399",
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#10b981",
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: "#22c55e",
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#34d399",
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: "#10b981",
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: "#22c55e",
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.1,
    color: "#34d399",
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#10b981",
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: "#22c55e",
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.2,
    color: "#34d399",
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: "#10b981",
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: "#22c55e",
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#34d399",
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: "#10b981",
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: "#22c55e",
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: "#34d399",
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: "#10b981",
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: "#22c55e",
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: "#34d399",
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: "#10b981",
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: "#22c55e",
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: "#34d399",
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: "#10b981",
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: "#22c55e",
  },
  {
    order: 10,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.3,
    color: "#34d399",
  },
  {
    order: 11,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: "#10b981",
  },
  {
    order: 11,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.2,
    color: "#22c55e",
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: "#34d399",
  },
  {
    order: 12,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.1,
    color: "#10b981",
  },
  {
    order: 12,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.2,
    color: "#22c55e",
  },
  {
    order: 12,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.3,
    color: "#34d399",
  },
  {
    order: 13,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#10b981",
  },
  {
    order: 13,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: "#22c55e",
  },
  {
    order: 13,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.1,
    color: "#34d399",
  },
  {
    order: 14,
    startLat: -33.936138,
    startLng: 18.436529,
    endLat: 21.395643,
    endLng: 39.883798,
    arcAlt: 0.3,
    color: "#10b981",
  },
];

export function CTASection() {
  return (
    <section className="bg-background text-foreground relative overflow-hidden py-32 pb-0">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container flex flex-col items-center justify-center gap-4 relative z-10">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/20 border border-border/100 backdrop-blur-sm">
          <p className="text-muted-foreground text-sm md:text-base font-medium">
            Empowering Organizations Worldwide
          </p>
        </div>
        <h1 className="max-w-5xl text-center text-5xl md:text-7xl font-bold leading-tight">
          Transform Ideas Into{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Impact
          </span>
        </h1>
        <p className="max-w-2xl text-center text-lg md:text-xl text-muted-foreground/80 mt-2">
          Learn how our expertise can unlock new opportunities and drive your
          organization's success
        </p>
        <Button
          variant="secondary"
          className="group relative z-10 mt-4 flex w-fit items-center justify-center gap-2 rounded-md px-8 py-6 tracking-tight text-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80"
          suppressHydrationWarning
        >
          Book an Appointment
          <ArrowRight className="size-5 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" aria-hidden="true" />
        </Button>
      </div>

      <div className="h-105 md:h-140 w-full -translate-y-10 overflow-y-clip relative -mb-32">
        <div className="-translate-y-34 relative h-[75rem] w-full md:h-[92rem] md:-translate-y-24">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>

        {/* Ultra-smooth gradient blend at globe/footer intersection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-20"
          style={{
            background: `linear-gradient(to top, 
              hsl(var(--background)) 0%, 
              hsl(var(--background) / 0.95) 15%,
              hsl(var(--background) / 0.85) 30%,
              hsl(var(--background) / 0.65) 50%,
              hsl(var(--background) / 0.4) 70%,
              hsl(var(--background) / 0.15) 85%,
              transparent 100%
            )`,
          }}
        />
      </div>
    </section>
  );
}
