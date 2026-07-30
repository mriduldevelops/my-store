import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SectionTitle({
  title,
  subtitle,
  viewAll,
  href = "#",
  className,
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div>
        <h2 className="text-3xl font-bold lg:text-4xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-3 max-w-2xl text-gray-600">
            {subtitle}
          </p>
        )}
      </div>

      {viewAll && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 font-medium text-primary transition hover:gap-3"
        >
          View All

          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}