import { Container, Section } from "@/components/ui";
import SectionTitle from "@/components/common/SectionTitle";

import FeaturedProductsGrid from "./FeaturedProductsGrid";

import { featuredProducts } from "@/data/featuredProducts";

export default function FeaturedProducts() {
  return (
    <Section className="bg-[#FCFCFA]">

      <Container>

        <SectionTitle
          title="Featured Products"
          subtitle="Carefully selected products that combine quality, functionality, and timeless design."
          viewAll
          href="/shop"
        />

        <FeaturedProductsGrid
          products={featuredProducts}
        />

      </Container>

    </Section>
  );
}