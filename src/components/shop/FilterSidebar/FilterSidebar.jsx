"use client";

import FilterCheckbox from "../FilterCheckbox";
import FilterSection from "../FilterSection";
import PriceRange from "../PriceRange";

const categories = ["Wallets", "Backpacks", "Watches", "Accessories"];

const brands = ["Urban Craft", "Titan", "Fossil"];

export default function FilterSidebar() {
  return (
    <div
      className="
        sticky
        top-28
        rounded-3xl
        border
        border-border
        bg-white
        p-6
      "
    >
      <h2 className="mb-6 text-xl font-semibold">Filters</h2>

      <FilterSection title="Categories">
        {categories.map((item) => (
          <FilterCheckbox key={item} label={item} />
        ))}
      </FilterSection>

      <FilterSection title="Brand">
        {brands.map((item) => (
          <FilterCheckbox key={item} label={item} />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        <PriceRange />
      </FilterSection>

      <FilterSection title="Availability">
        <FilterCheckbox label="In Stock" />

        <FilterCheckbox label="Out of Stock" />
      </FilterSection>
    </div>
  );
}
