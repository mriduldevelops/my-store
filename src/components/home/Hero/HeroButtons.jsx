import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export default function HeroButtons({
  primary,
  secondary,
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">

      <Link href={primary.href}>
        <Button>

          {primary.text}

          <ArrowRight className="ml-2 h-4 w-4" />

        </Button>
      </Link>

      <Link href={secondary.href}>
        <Button variant="outline">

          {secondary.text}

        </Button>
      </Link>

    </div>
  );
}