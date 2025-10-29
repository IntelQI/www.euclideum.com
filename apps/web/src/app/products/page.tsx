import { AtlasHero } from "@/components/products/atlas-hero";
import { BoostSkillsCard } from "@/components/products/porducts-boost-skills";
import { DemoCallout } from "@/components/products/product-demo";
import { ProductStartLearning } from "@/components/products/product-start-learning";
import { CodeByte } from "@/components/products/products-codebyte";
import { ProductCta } from "@/components/products/products-cta";
import { LogoTrustStrip } from "@/components/products/products-trust-strip";

export default function ProductsPage() {
  return (
    <main className="relative bg-background">
      <AtlasHero />
      <DemoCallout />
      <ProductStartLearning />
      <LogoTrustStrip />
      <CodeByte />
      <BoostSkillsCard
        illustrationSrc={
          "https://webimages.mongodb.com/_com_assets/cms/m8spja9phm4zr6hi5-Technical_ACTION_Developer(1)_Thumbnail.svg?ixlib=js-3.7.1&auto=format%2Ccompress&w=594"
        }
      />
      <ProductCta />
    </main>
  );
}
