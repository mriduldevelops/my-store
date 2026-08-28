"use client";

import { useSelector } from "react-redux";

import { selectCartSubtotal } from "@/redux/slices/cartSlice";

export default function CartSummary({ onCheckout }) {
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="border-t border-border pt-5">
      {/* Subtotal */}

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Subtotal</span>

        <span className="text-lg font-semibold">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Shipping */}

      <p className="mt-2 text-xs leading-5 text-gray-500">
        Shipping and taxes are calculated at checkout.
      </p>

      {/* Checkout */}

      <button
        type="button"
        onClick={onCheckout}
        disabled={subtotal <= 0}
        className="
          mt-5
          h-14
          w-full
          rounded-xl
          bg-primary
          font-medium
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Checkout
      </button>

      {/* View Cart */}

      <button
        type="button"
        className="
          mt-3
          h-12
          w-full
          rounded-xl
          border
          border-border
          text-sm
          font-medium
          transition
          hover:border-primary
          hover:text-primary
        "
      >
        View Cart
      </button>
    </div>
  );
}
