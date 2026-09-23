"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

import { selectCartCount, selectCartItems } from "@/redux/slices/cartSlice";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  const isEmpty = items.length === 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}

        <div className="mb-10">
          <Link
            href="/shop"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Shopping Cart
              </h1>

              {!isEmpty && (
                <p className="mt-2 text-sm text-gray-500">
                  {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Empty Cart */}

        {isEmpty ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-gray-200 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag
                size={30}
                strokeWidth={1.6}
                className="text-gray-500"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven't added anything to your cart yet. Explore our
              collection and find something you love.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-sm font-medium text-white transition hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart */

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            {/* Products */}

            <section>
              <div className="rounded-2xl border border-gray-200">
                <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
                  <h2 className="text-base font-semibold">Cart Items</h2>
                </div>

                <div className="divide-y divide-gray-200 px-5 sm:px-6">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.productId}-${item.variantId ?? "default"}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Summary */}

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <CartSummary
                onCheckout={() => {
                  console.log("Checkout clicked");
                }}
              />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
