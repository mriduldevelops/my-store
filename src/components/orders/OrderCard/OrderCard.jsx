"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import OrderItem from "../OrderItem";
import OrderStatus from "../OrderStatus";

export default function OrderCard({ order }) {
  if (!order) return null;

  const orderDate = order.createdAt ? new Date(order.createdAt) : null;

  const formattedDate =
    orderDate && !Number.isNaN(orderDate.getTime())
      ? orderDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Recently";

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-gray-500">Order placed</p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              {formattedDate}
            </p>
          </div>

          <OrderStatus status={order.status || "confirmed"} />
        </div>

        <div className="mt-4 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-gray-500">Order:</span>{" "}
            <span className="font-medium text-gray-900">
              #{order.orderNumber}
            </span>
          </div>

          <div>
            <span className="text-gray-500">Total:</span>{" "}
            <span className="font-semibold text-gray-900">
              ₹{Number(order.total || 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-5 sm:px-6">
        {order.items?.map((item, index) => (
          <OrderItem
            key={`${item.productId}-${item.variantId || "default"}-${index}`}
            item={item}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="text-xs text-gray-500">
          {order.items?.length || 0}{" "}
          {(order.items?.length || 0) === 1 ? "item" : "items"}
        </div>

        <Link
          href={`/orders/${order.orderNumber}`}
          className="inline-flex items-center justify-center gap-1 text-sm font-medium text-black transition hover:opacity-70"
        >
          View Order
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
