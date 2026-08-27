"use client";

import SortDropdown from "../SortDropdown";

export default function ShopToolbar({ total }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
      <p className="text-text-secondary">
        Showing <span className="font-semibold text-text-primary">{total}</span>{" "}
        products
      </p>

      <SortDropdown />
    </div>
  );
}
