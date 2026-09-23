"use client";

import Link from "next/link";

import { Check, Package, ArrowRight, ShoppingBag } from "lucide-react";

import { Container } from "@/components/ui";

export default function OrderSuccess({ order }) {
  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <h1 className="text-xl font-semibold">Order not found</h1>

            <p className="mt-3 text-sm text-gray-500">
              We couldn't find the order you're looking for.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* ================================= */}
          {/* SUCCESS HEADER                     */}
          {/* ================================= */}

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check size={32} className="text-green-600" strokeWidth={2.5} />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-green-600">
              Order Confirmed
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Thank you for your order!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
              Your order has been successfully placed. We've received your order
              details and will process it shortly.
            </p>
          </div>

          {/* ================================= */}
          {/* ORDER INFORMATION                  */}
          {/* ================================= */}

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white">
            <div className="grid gap-6 border-b border-gray-200 p-6 sm:grid-cols-3 sm:p-8">
              <InfoItem label="Order Number" value={order.orderNumber} />

              <InfoItem
                label="Payment"
                value={
                  order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"
                }
              />

              <InfoItem
                label="Total"
                value={`₹${order.total.toLocaleString("en-IN")}`}
              />
            </div>

            {/* ================================= */}
            {/* CUSTOMER                          */}
            {/* ================================= */}

            <div className="border-b border-gray-200 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Package size={20} className="text-primary" />

                <h2 className="font-semibold">Delivery Information</h2>
              </div>

              <div className="mt-5 text-sm">
                <p className="font-medium">
                  {order.customer.firstName} {order.customer.lastName}
                </p>

                <p className="mt-1 text-gray-500">{order.customer.email}</p>

                <p className="mt-1 text-gray-500">{order.customer.phone}</p>

                <div className="mt-4 leading-6 text-gray-500">
                  <p>{order.customer.address}</p>

                  {order.customer.apartment && (
                    <p>{order.customer.apartment}</p>
                  )}

                  <p>
                    {order.customer.city}, {order.customer.state}{" "}
                    {order.customer.pincode}
                  </p>
                </div>
              </div>
            </div>

            {/* ================================= */}
            {/* ORDER ITEMS                        */}
            {/* ================================= */}

            <div className="p-6 sm:p-8">
              <h2 className="font-semibold">Order Items</h2>

              <div className="mt-5 divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.variantId ?? index}`}
                    className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.productName}
                      </p>

                      {Object.keys(item.variants || {}).length > 0 && (
                        <div className="mt-1">
                          {Object.entries(item.variants).map(
                            ([name, value]) => (
                              <span
                                key={name}
                                className="mr-3 text-xs text-gray-500"
                              >
                                {name}: {value}
                              </span>
                            ),
                          )}
                        </div>
                      )}

                      <p className="mt-1 text-xs text-gray-500">
                        ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* ================================= */}
              {/* TOTALS                             */}
              {/* ================================= */}

              <div className="mt-6 border-t border-gray-200 pt-5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>

                  <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="mt-3 flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>

                  <span>
                    {order.shipping === 0
                      ? "Free"
                      : `₹${order.shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="mt-3 flex justify-between text-sm text-green-600">
                    <span>Discount</span>

                    <span>
                      -₹
                      {order.discount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {order.tax > 0 && (
                  <div className="mt-3 flex justify-between text-sm text-gray-500">
                    <span>Tax</span>

                    <span>₹{order.tax.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="mt-5 flex justify-between border-t border-gray-200 pt-5">
                  <span className="font-semibold">Total</span>

                  <span className="text-xl font-semibold">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* ACTIONS                            */}
          {/* ================================= */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="
                flex
                h-13
                flex-1
                items-center
                justify-center
                gap-2
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
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="
                flex
                h-13
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-5
                text-sm
                font-medium
                transition
                hover:bg-gray-50
              "
            >
              View Orders
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* ================================= */}
          {/* FOOTNOTE                           */}
          {/* ================================= */}

          <p className="mt-8 text-center text-xs leading-5 text-gray-400">
            A confirmation email will be sent to {order.customer.email}.
          </p>
        </div>
      </Container>
    </main>
  );
}

/* ========================================= */
/* INFO ITEM                                 */
/* ========================================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}
