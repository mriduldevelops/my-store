"use client";

import { ShoppingBag } from "lucide-react";

export default function AddToCartButton({
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        flex
        h-14
        flex-1
        items-center
        justify-center
        gap-3
        rounded-xl
        bg-primary
        px-6
        font-medium
        text-white
        transition
        hover:opacity-90
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <ShoppingBag size={19} />

      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}