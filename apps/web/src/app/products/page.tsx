import { AtlasHero } from "@/components/atlas-hero";
import { DemoCallout } from "@/components/product-demo";
import { ProductStartLearning } from "@/components/product-start-learning";

export default function ProductsPage() {
  return (
    <main className="relative bg-background">
      <AtlasHero />
      <DemoCallout />
      <ProductStartLearning />
    </main>
  );
}
