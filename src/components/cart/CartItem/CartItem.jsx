"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    if (item.quantity <= 1) {
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

  const increaseQuantity = () => {
    if (item.maxStock && item.quantity >= item.maxStock) {
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

  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 py-6 sm:gap-5">
      {/* Product Image */}

      <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-28">
        {item.productImage ? (
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Information */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Name + Remove */}

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold sm:text-base">
              {item.productName}
            </h3>

            {/* Variants */}

            {Object.keys(item.variants || {}).length > 0 && (
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {Object.entries(item.variants).map(([name, value]) => (
                  <span key={name} className="text-xs text-gray-500">
                    {name}: {value}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.productName}`}
            className="shrink-0 text-gray-400 transition hover:text-red-500"
          >
            <Trash2 size={17} />
          </button>
        </div>

        {/* SKU */}

        {item.sku && (
          <p className="mt-2 text-xs text-gray-400">SKU: {item.sku}</p>
        )}

        {/* Bottom */}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
          {/* Quantity */}

          <div className="flex items-center rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>

            <span className="flex h-9 min-w-9 items-center justify-center border-x border-gray-200 px-2 text-sm">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={item.maxStock && item.quantity >= item.maxStock}
              className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}

          <div className="text-right">
            <p className="text-base font-semibold">
              ₹{itemTotal.toLocaleString("en-IN")}
            </p>

            {item.quantity > 1 && (
              <p className="mt-1 text-xs text-gray-400">
                ₹{item.price.toLocaleString("en-IN")} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
