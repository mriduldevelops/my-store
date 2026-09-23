import Link from "next/link";
import { PackageOpen, ShoppingBag } from "lucide-react";

export default function OrdersEmpty() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <PackageOpen size={28} className="text-gray-500" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-gray-900">
        No orders yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        You haven&apos;t placed any orders yet. Start shopping and your orders
        will appear here.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        <ShoppingBag size={17} />
        Start Shopping
      </Link>
    </div>
  );
}
