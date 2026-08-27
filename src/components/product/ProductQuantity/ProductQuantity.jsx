"use client";

import { Minus, Plus } from "lucide-react";

export default function ProductQuantity({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity = 99,
}) {
  return (
    <div className="flex h-12 w-fit items-center overflow-hidden rounded-xl border border-border">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="
          flex
          h-full
          w-12
          items-center
          justify-center
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Minus size={17} />
      </button>

      <span className="flex h-full w-12 items-center justify-center text-sm font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        aria-label="Increase quantity"
        className="
          flex
          h-full
          w-12
          items-center
          justify-center
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Plus size={17} />
      </button>
    </div>
  );
}