"use client";

import { useMemo } from "react";

export default function ProductVariants({
  variants = [],
  selectedVariants = {},
  onChange,
}) {
  const variantTypes = useMemo(() => {
    const types = {};

    variants.forEach((variant) => {
      Object.entries(variant.options).forEach(([name, value]) => {
        if (!types[name]) {
          types[name] = [];
        }

        if (!types[name].includes(value)) {
          types[name].push(value);
        }
      });
    });

    return types;
  }, [variants]);

  const handleSelect = (name, value) => {
    const updated = {
      ...selectedVariants,
      [name]: value,
    };

    onChange?.(updated);
  };

  if (!variants.length) {
    return null;
  }

  return (
    <div className="space-y-7">
      {Object.entries(variantTypes).map(([name, options]) => (
        <div key={name}>
          {/* Variant title */}

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">{name}</h3>

            {selectedVariants[name] && (
              <span className="text-sm text-gray-500">
                {selectedVariants[name]}
              </span>
            )}
          </div>

          {/* Options */}

          <div className="flex flex-wrap gap-3">
            {options.map((option) => {
              const selected = selectedVariants[name] === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(name, option)}
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
