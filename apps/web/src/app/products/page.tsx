import { AtlasHero } from "@/components/products/atlas-hero";
import { DemoCallout } from "@/components/products/product-demo";
import { ProductStartLearning } from "@/components/products/product-start-learning";
import { CodeByte } from "@/components/products/products-codebyte";
import { LogoTrustStrip } from "@/components/products/products-trust-strip";

export default function ProductsPage() {
  return (
    <main className="relative bg-background">
      <AtlasHero />
      <DemoCallout />
      <ProductStartLearning />
      <LogoTrustStrip />
      <CodeByte />
    </main>
  );
}
