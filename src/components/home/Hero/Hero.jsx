import { Container, Section } from "@/components/ui";

import { homepage } from "@/data/homepage";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  const { hero } = homepage;

  return (
    <Section className="overflow-hidden">

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <HeroContent hero={hero} />

          <HeroImage image={hero.image} />

        </div>

      </Container>

    </Section>
  );
}