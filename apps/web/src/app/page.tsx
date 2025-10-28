"use client";

import { HeroModern } from "@/components/hero-modern";
import IntegrationEcosystem from "@/components/integration-ecosystem";
import FeatureShowcase from "@/components/feature-showcase";
import LogoMarquee from "@/components/logo-marquee";
import DeveloperSection from "@/components/developer-section";

export default function IndexPage() {
  return (
    <>
      <HeroModern
        title="The database for dynamic, demanding software"
        description="Start exploring the powerful capabilities of the leading modern database by creating a cluster in just three minutes."
        primaryButtonText="Get Started"
        secondaryButtonText="Documentation"
        primaryButtonUrl="#"
        secondaryButtonUrl="#"
      />

      <FeatureShowcase />

      <DeveloperSection />

      <IntegrationEcosystem />

      <LogoMarquee />
    </>
  );
}
