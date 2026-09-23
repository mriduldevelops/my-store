"use client";

import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useSelector } from "react-redux";

import { selectCartCount, selectCartItems } from "@/redux/slices/cartSlice";

import CartItem from "../CartItem";
import CartSummary from "../CartSummary";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }) {
  const items = useSelector(selectCartItems);

  const cartCount = useSelector(selectCartCount);

  /*
   * Prevent body scrolling
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /*
   * Escape key
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[100]
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
    >
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className={`
          absolute
          inset-0
          bg-black/40
          transition-opacity
          duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Drawer */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`
          absolute
          right-0
          top-0
          flex
          h-full
          w-full
          max-w-md
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} strokeWidth={1.8} />

            <h2 className="text-lg font-semibold">Your Cart</h2>

            {cartCount > 0 && (
              <span className="text-sm text-gray-500">({cartCount})</span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              transition
              hover:bg-gray-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Empty Cart */}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag size={26} className="text-gray-500" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">Your cart is empty</h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="
                mt-6
                rounded-xl
                bg-primary
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:opacity-90
              "
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}

            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.variantId}`}
                  item={item}
                />
              ))}
            </div>

            {/* Summary */}

            <div className="border-t border-border px-6 pb-6 pt-5">
              <CartSummary
                onClose={onClose}
              />
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
