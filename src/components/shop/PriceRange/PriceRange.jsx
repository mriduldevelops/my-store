"use client";

export default function PriceRange() {
  return (
    <div>
      <input
        type="range"
        min={500}
        max={10000}
        defaultValue={5000}
        className="w-full accent-primary"
      />

      <div className="mt-3 flex justify-between text-sm text-text-secondary">
        <span>₹500</span>

        <span>₹10,000</span>
      </div>
    </div>
  );
}
