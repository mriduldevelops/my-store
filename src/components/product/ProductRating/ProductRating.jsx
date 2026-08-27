import { Star } from "lucide-react";

export default function ProductRating({
  rating = 0,
  reviewCount = 0,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-primary text-primary"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      <span className="text-sm text-gray-500">
        {reviewCount} reviews
      </span>
    </div>
  );
}