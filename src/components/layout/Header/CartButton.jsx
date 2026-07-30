"use client";

import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  return (
    <button className="relative">
      <ShoppingCart size={22} />

      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        0
      </span>
    </button>
  );
}