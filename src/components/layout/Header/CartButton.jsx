"use client";

import { ShoppingCart } from "lucide-react";

import CartDrawer from "@/components/cart/CartDrawer";

export default function CartButton({isCartOpen, setIsCartOpen, cartCount }) {

  return (
    <>
      {/* Cart Button */}

      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Shopping cart with ${cartCount} items`}
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          transition
          hover:bg-gray-100
        "
      >
        <ShoppingCart size={22} strokeWidth={1.8} />

        {cartCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-primary
              px-1
              text-[10px]
              font-semibold
              text-white
            "
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}

      {/* <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
    </>
  );
}
