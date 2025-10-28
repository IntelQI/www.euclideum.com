import { AtlasHero } from "@/components/atlas-hero";
import { DemoCallout } from "@/components/product-demo";
import { ProductStartLearning } from "@/components/product-start-learning";
import { LogoTrustStrip } from "@/components/products-trust-strip";

export default function ProductsPage() {
  return (
    <main className="relative bg-background">
      <AtlasHero />
      <DemoCallout />
      <ProductStartLearning />
      <LogoTrustStrip />
    </main>
  );
}
