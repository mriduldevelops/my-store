"use client";

import SanityProductImage from "@/components/product/SanityProductImage";

export default function CheckoutReview({
  customer,
  items,
  subtotal,
  shipping = 0,
  discount = 0,
  tax = 0,
  onBack,
  onPlaceOrder,
}) {
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="space-y-6">
      {/* ================================= */}
      {/* CUSTOMER INFORMATION              */}
      {/* ================================= */}

      <section className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Delivery Information</h2>

              <p className="mt-1 text-sm text-gray-500">
                Please check your delivery details.
              </p>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="text-sm font-medium text-primary hover:underline"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-2 text-sm">
            <p className="font-medium">
              {customer.firstName} {customer.lastName}
            </p>

            <p className="text-gray-500">{customer.email}</p>

            <p className="text-gray-500">{customer.phone}</p>

            <div className="pt-2 leading-6 text-gray-500">
              <p>{customer.address}</p>

              {customer.apartment && <p>{customer.apartment}</p>}

              <p>
                {customer.city}, {customer.state} {customer.pincode}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* PRODUCTS                          */}
      {/* ================================= */}

      <section className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold">Review Items</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const lineTotal = item.price * item.quantity;

            return (
              <div
                key={`${item.productId}-${item.variantId ?? "default"}`}
                className="flex gap-4 px-6 py-5"
              >
                {/* Image */}

                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {item.productImage ? (
                    <SanityProductImage
                      image={item.productImage}
                      alt={item.productName || "Product"}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                      No Image
                    </div>
                  )}

                  {/* <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] text-white">
                    {item.quantity}
                  </span> */}
                </div>

                {/* Details */}

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-4">
                    <h3 className="text-sm font-medium">{item.productName}</h3>

                    <p className="shrink-0 text-sm font-semibold">
                      ₹{lineTotal.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Variants */}

                  {Object.keys(item.variants || {}).length > 0 && (
                    <div className="mt-1">
                      {Object.entries(item.variants).map(([name, value]) => (
                        <p key={name} className="text-xs text-gray-500">
                          {name}: {value}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Pricing */}

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
                    <span>
                      Unit price: ₹{item.price.toLocaleString("en-IN")}
                    </span>

                    <span>Quantity: {item.quantity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================= */}
      {/* PRICE SUMMARY                     */}
      {/* ================================= */}

      <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6">
        <h2 className="text-lg font-semibold">Price Details</h2>

        <div className="mt-5 space-y-3">
          <PriceRow label="Subtotal" value={subtotal} />

          <PriceRow label="Shipping" value={shipping} free={shipping === 0} />

          {discount > 0 && (
            <PriceRow label="Discount" value={discount} negative />
          )}

          <PriceRow label="Tax" value={tax} />
        </div>

        <div className="my-5 border-t border-gray-200" />

        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>

          <span className="text-xl font-semibold">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </section>

      {/* ================================= */}
      {/* ACTIONS                           */}
      {/* ================================= */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="
            min-h-13
            flex-1
            rounded-xl
            border
            border-gray-200
            px-5
            text-sm
            font-medium
            transition
            hover:bg-gray-50
          "
        >
          Back to Details
        </button>

        <button
          type="button"
          onClick={onPlaceOrder}
          className="
            min-h-13
            flex-1
            rounded-xl
            bg-primary
            px-5
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

/* ========================================= */
/* PRICE ROW                                 */
/* ========================================= */

function PriceRow({ label, value, free = false, negative = false }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>

      {free ? (
        <span className="font-medium text-green-600">Free</span>
      ) : (
        <span
          className={negative ? "font-medium text-green-600" : "font-medium"}
        >
          {negative && "- "}₹{value.toLocaleString("en-IN")}
        </span>
      )}
    </div>
  );
}
