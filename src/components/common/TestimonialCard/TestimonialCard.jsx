import Image from "next/image";
import { Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <article
      className="
        rounded-3xl
        border
        border-border
        bg-white
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        hover:border-primary/20
      "
    >
      {/* Rating */}

      <div className="mb-6 flex gap-1">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Review */}

      <p className="text-text-secondary leading-8">"{testimonial.review}"</p>

      {/* Customer */}

      <div className="mt-8 flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>

          <p className="text-sm text-text-secondary">{testimonial.location}</p>
        </div>
      </div>
    </article>
  );
}
