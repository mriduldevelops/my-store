"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      dispatch(
        removeFromCart({
          productId: item.productId,
          variantId: item.variantId,
        }),
      );

      return;
    }

    dispatch(
      updateQuantity({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity - 1,
      }),
    );
  };

  const handleIncrease = () => {
    if (item.quantity >= item.maxStock) {
      return;
    }

    dispatch(
      updateQuantity({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        productId: item.productId,
        variantId: item.variantId,
      }),
    );
  };

  return (
    <div className="flex gap-4 border-b border-border py-5">
      {/* Product Image */}

      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {item.productImage ? (
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium">{item.productName}</h3>

            {/* Variants */}

            {Object.entries(item.variants || {}).length > 0 && (
              <div className="mt-1 space-y-0.5">
                {Object.entries(item.variants).map(([name, value]) => (
                  <p key={name} className="text-xs text-gray-500">
                    {name}: {value}
                  </p>
                ))}
              </div>
            )}

            {/* SKU */}

            {item.sku && (
              <p className="mt-1 text-xs text-gray-400">SKU: {item.sku}</p>
            )}
          </div>

          {/* Remove */}

          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.productName}`}
            className="shrink-0 text-gray-400 transition hover:text-red-500"
          >
            <Trash2 size={17} />
          </button>
        </div>

        {/* Bottom */}

        <div className="mt-4 flex items-center justify-between">
          {/* Quantity */}

          <div className="flex items-center rounded-lg border border-border">
            <button
              type="button"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-50"
            >
              <Minus size={14} />
            </button>

            <span className="flex h-8 min-w-8 items-center justify-center text-sm">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={item.quantity >= item.maxStock}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}

          <p className="text-sm font-semibold">
            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
