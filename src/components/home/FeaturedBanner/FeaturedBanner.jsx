import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button, Container, Section } from "@/components/ui";

import { homepage } from "@/data/homepage";

export default function FeaturedBanner() {
  const banner = homepage.featuredBanner;

  return (
    <Section className="py-24">
      <Container>
        <div className="overflow-hidden rounded-[40px] bg-[#F7F6F2]">
          <div className="grid items-center lg:grid-cols-2">

            {/* Image */}

            <div className="relative aspect-4/3">

              <Image
  src={banner.image}
  alt={banner.title}
  fill
  className="object-cover transition duration-700 hover:scale-105"
/>

            </div>

            {/* Content */}

            <div className="p-10 lg:p-20 space-y-6">

              <span className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
                {banner.badge}
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
                {banner.title}
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                {banner.description}
              </p>

              <Link href={banner.buttonLink}>
                <Button className="mt-10">

                  {banner.buttonText}

                  <ArrowRight className="ml-2 h-5 w-5" />

                </Button>
              </Link>

            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}