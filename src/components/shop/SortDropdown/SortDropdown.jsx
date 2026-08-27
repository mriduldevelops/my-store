"use client";

import { ChevronDown } from "lucide-react";

export default function SortDropdown() {
  return (
    <div className="relative">
      <select
        className="
        rounded-xl
        border
        border-border
        bg-white
        px-4
        py-3
        pr-10
        text-sm
        outline-none
        appearance-none
        "
      >
        <option>Newest</option>

        <option>Price: Low to High</option>

        <option>Price: High to Low</option>

        <option>A-Z</option>

        <option>Z-A</option>
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        size={18}
      />
    </div>
  );
}
