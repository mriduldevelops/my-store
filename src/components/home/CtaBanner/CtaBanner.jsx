import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button, Container, Section } from "@/components/ui";

import { ctaBanner } from "@/data/ctaBanner";

export default function CtaBanner() {
  const cta = ctaBanner;

  return (
    <Section className="py-24">
      <Container>

        <div className="relative overflow-hidden rounded-[40px] bg-primary px-8 py-20 text-center text-white lg:px-24">

          {/* Decorative Blur */}
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">

            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.25em]">
              {cta.badge}
            </span>

            <h2 className="mt-8 text-4xl font-bold leading-tight lg:text-5xl">
              {cta.title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/80">
              {cta.description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Link href={cta.primaryButton.href}>
                <Button
                  className="
                    bg-white
                    text-primary
                    hover:bg-white/90
                  "
                >
                  {cta.primaryButton.text}

                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href={cta.secondaryButton.href}>
                <Button
                  variant="outline"
                  className="
                    border-white
                    text-white bg-transparent
                    hover:bg-white/10
                  "
                >
                  {cta.secondaryButton.text}
                </Button>
              </Link>

            </div>

          </div>

        </div>

      </Container>
    </Section>
  );
}