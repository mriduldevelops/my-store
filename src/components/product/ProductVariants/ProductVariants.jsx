"use client";

import { useState } from "react";

export default function ProductVariants({
  variants = [],
  onChange,
}) {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleChange = (variantName, value) => {
    const updatedVariants = {
      ...selectedVariants,
      [variantName]: value,
    };

    setSelectedVariants(updatedVariants);

    if (onChange) {
      onChange(updatedVariants);
    }
  };

  if (!variants.length) {
    return null;
  }

  return (
    <div className="space-y-7">
      {variants.map((variant) => (
        <div key={variant.name}>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">
              {variant.name}
            </h3>

            {selectedVariants[variant.name] && (
              <span className="text-sm text-gray-500">
                {selectedVariants[variant.name]}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {variant.options.map((option) => {
              const selected =
                selectedVariants[variant.name] === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    handleChange(
                      variant.name,
                      option
                    )
                  }
                  className={`
                    rounded-xl
                    border
                    px-5
                    py-3
                    text-sm
                    transition

                    ${
                      selected
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white hover:border-primary"
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
}