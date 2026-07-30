import { Container, Section } from "@/components/ui";

import SectionTitle from "@/components/common/SectionTitle";

import ProductGrid from "@/components/product/ProductGrid";

import { homepage } from "@/data/homepage";

export default function NewArrivals() {
  return (
    <Section className="bg-white">

      <Container>

        <SectionTitle
          title="New Arrivals"
          subtitle="Fresh additions crafted with premium quality and timeless design."
          viewAll
          href="/shop?sort=newest"
        />

        <ProductGrid
          products={homepage.newArrivals}
        />

      </Container>

    </Section>
  );
}