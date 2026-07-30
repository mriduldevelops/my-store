    import { Container, Section } from "@/components/ui";

import SectionTitle from "@/components/common/SectionTitle";
import FeatureCard from "@/components/common/FeatureCard";

import { homepage } from "@/data/homepage";

export default function WhyChooseUs() {
  return (
    <Section>

      <Container>

        <SectionTitle
          title="Why Shop With Us"
          subtitle="We're committed to providing a premium shopping experience from browsing to delivery."
        />

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {homepage.whyChooseUs.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>

      </Container>

    </Section>
  );
}