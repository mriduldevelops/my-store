import { Container, Section } from "@/components/ui";

import SectionTitle from "@/components/common/SectionTitle";

import TestimonialCard from "@/components/common/TestimonialCard";

import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <Section className="bg-[#FCFCFA]">
      <Container>
        <SectionTitle
          title="What Our Customers Say"
          subtitle="Real experiences from customers who trust our products."
        />

        <div
          className="
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
