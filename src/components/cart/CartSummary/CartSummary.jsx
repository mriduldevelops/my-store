"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { selectCartSubtotal } from "@/redux/slices/cartSlice";
import { usePathname, useRouter } from "next/navigation";

export default function CartSummary({ onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const subtotal = useSelector(selectCartSubtotal);

  const shipping = 0;

  const total = subtotal + shipping;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      {/* Heading */}

      <h2 className="text-lg font-semibold">Order Summary</h2>

      {/* Price */}

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>

          <span className="font-medium">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Shipping</span>

          <span className="font-medium">
            {shipping === 0
              ? "Calculated at checkout"
              : `₹${shipping.toLocaleString("en-IN")}`}
          </span>
        </div>
      </div>

      {/* Divider */}

      <div className="my-5 border-t border-gray-200" />

      {/* Total */}

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Total</span>

        <span className="text-xl font-semibold">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-gray-400">
        Taxes and shipping charges will be calculated at checkout.
      </p>

      {/* Checkout */}

      <button
        type="button"
        onClick={handleCheckout}
        className="
          mt-6
          flex
          h-13
          w-full
          items-center
          justify-center
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
        Proceed to Checkout
      </button>

      {pathname === "/cart" ? (
        <Link
          href="/shop"
          className="
          mt-3
          flex
          h-13
          w-full
          items-center
          justify-center
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
          Continue Shopping
        </Link>
      ) : (
        <Link
          href="/cart"
          onClick={onClose}
          className="
    mt-3
    flex
    h-13
    w-full
    items-center
    justify-center
    rounded-xl
    border
    border-gray-200
    text-sm
    font-medium
    transition
    hover:bg-gray-50"
        >
          View Cart
        </Link>
      )}
    </div>
  );
}
