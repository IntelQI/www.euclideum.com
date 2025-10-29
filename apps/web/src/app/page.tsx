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
        title="NEW: Announcing our new Client Onboarding - ICT Mumbai"
        description="Discover our suite of global technology solutions, cloud infrastructure, and advanced educational tools designed to shape the future."
        primaryButtonText="About Us"
        secondaryButtonText="Discover Our Products"
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
