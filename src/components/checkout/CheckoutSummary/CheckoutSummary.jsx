"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

import { selectCartItems, selectCartSubtotal } from "@/redux/slices/cartSlice";

export default function CheckoutSummary() {
  const items = useSelector(selectCartItems);

  const subtotal = useSelector(selectCartSubtotal);

  /*
   * These values can later come from
   * your backend / checkout calculation.
   */
  const shipping = 0;
  const discount = 0;
  const tax = 0;

  const total = subtotal + shipping + tax - discount;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      {/* Header */}

      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <p className="mt-1 text-sm text-gray-500">
          {items.reduce((total, item) => total + item.quantity, 0)} items
        </p>
      </div>

      {/* Products */}

      <div className="max-h-[420px] space-y-6 overflow-y-auto px-6 py-6">
        {items.map((item) => {
          const unitPrice = item.price;

          const quantity = item.quantity;

          const lineTotal = unitPrice * quantity;

          return (
            <div
              key={`${item.productId}-${item.variantId ?? "default"}`}
              className="flex gap-4"
            >
              {/* Product Image */}

              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {item.productImage ? (
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                    No Image
                  </div>
                )}

                {/* Quantity Badge */}

                {/* <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                  {quantity}
                </span> */}
              </div>

              {/* Product Details */}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium leading-5">
                    {item.productName}
                  </h3>

                  <p className="shrink-0 text-sm font-semibold">
                    ₹{lineTotal.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Variants */}

                {Object.keys(item.variants || {}).length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {Object.entries(item.variants).map(([name, value]) => (
                      <p key={name} className="text-xs text-gray-500">
                        {name}: {value}
                      </p>
                    ))}
                  </div>
                )}

                {/* Unit Price */}

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Unit price</span>

                  <span className="font-medium text-gray-700">
                    ₹{unitPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Quantity */}

                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Quantity</span>

                  <span className="font-medium text-gray-700">
                    × {quantity}
                  </span>
                </div>

                {/* Calculation */}

                <div className="mt-2 border-t border-dashed border-gray-200 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {quantity} × ₹{unitPrice.toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm font-semibold">
                      ₹{lineTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Breakdown */}

      <div className="border-t border-gray-200 px-6 py-5">
        <div className="space-y-3">
          {/* Subtotal */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>

            <span className="font-medium">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Shipping */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Shipping</span>

            <span className="font-medium">
              {shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}
            </span>
          </div>

          {/* Discount */}

          {discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Discount</span>

              <span className="font-medium text-green-600">
                - ₹{discount.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {/* Tax */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Taxes</span>

            <span className="font-medium">
              {tax === 0
                ? "Calculated at checkout"
                : `₹${tax.toLocaleString("en-IN")}`}
            </span>
          </div>
        </div>

        {/* Total Divider */}

        <div className="my-5 border-t border-gray-200" />

        {/* Total */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold">Total</p>

            <p className="mt-1 text-xs text-gray-400">
              Inclusive of applicable taxes
            </p>
          </div>

          <p className="text-xl font-semibold">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
