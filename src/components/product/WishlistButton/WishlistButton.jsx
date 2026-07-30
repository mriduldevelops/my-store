"use client";

import { Heart } from "lucide-react";

export default function WishlistButton({
  onClick,
  active = false,
}) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-105"
      aria-label="Add to wishlist"
    >
      <Heart
        size={20}
        className={
          active
            ? "fill-red-500 text-red-500"
            : "text-gray-700"
        }
      />
    </button>
  );
}