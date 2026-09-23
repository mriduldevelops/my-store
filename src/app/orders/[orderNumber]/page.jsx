"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui";

import OrderItem from "@/components/orders/OrderItem";
import OrderStatus from "@/components/orders/OrderStatus";

export default function OrderDetailsPage({ params }) {
  const { orderNumber } = use(params);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const storedOrders = sessionStorage.getItem("orders");

        if (!storedOrders) {
          setLoading(false);
          return;
        }

        const orders = JSON.parse(storedOrders);

        const foundOrder = orders.find(
          (item) => item.orderNumber === orderNumber,
        );

        setOrder(foundOrder || null);
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-sm text-gray-500">Loading order...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Order not found
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              We couldn&apos;t find this order.
            </p>

            <Link
              href="/orders"
              className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Back to Orders
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 sm:py-14">
      <Container>
        {/* Back */}
        <Link
          href="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <div className="mx-auto max-w-4xl space-y-6">
          {/* Header */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Order</p>

                <h1 className="mt-1 text-2xl font-semibold text-gray-900">
                  #{order.orderNumber}
                </h1>
              </div>

              <OrderStatus status={order.status || "confirmed"} />
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-green-50 p-4">
              <CheckCircle2 size={22} className="shrink-0 text-green-600" />

              <div>
                <p className="text-sm font-medium text-green-800">
                  Order confirmed
                </p>

                <p className="mt-0.5 text-xs text-green-700">
                  Your order has been successfully placed.
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-2xl border border-gray-200 bg-white px-6 sm:px-8">
            <h2 className="border-b border-gray-100 py-5 text-lg font-semibold text-gray-900">
              Order Items
            </h2>

            {order.items?.map((item, index) => (
              <OrderItem key={`${item.productId}-${index}`} item={item} />
            ))}
          </div>

          {/* Delivery */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Delivery Address
            </h2>

            <div className="mt-4 text-sm leading-6 text-gray-600">
              <p className="font-medium text-gray-900">
                {order.customer?.firstName} {order.customer?.lastName}
              </p>

              <p>{order.customer?.address}</p>

              {order.customer?.apartment && <p>{order.customer.apartment}</p>}

              <p>
                {order.customer?.city}, {order.customer?.state} -{" "}
                {order.customer?.pincode}
              </p>

              <p className="mt-2">Phone: {order.customer?.phone}</p>

              <p>Email: {order.customer?.email}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Payment Details
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>

                <span className="font-medium text-gray-900">
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>

                <span>
                  ₹{Number(order.subtotal || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>

                <span>
                  {Number(order.shipping || 0) === 0
                    ? "Free"
                    : `₹${Number(order.shipping).toLocaleString("en-IN")}`}
                </span>
              </div>

              {Number(order.discount || 0) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>

                  <span>
                    -₹
                    {Number(order.discount).toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {Number(order.tax || 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>

                  <span>₹{Number(order.tax).toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-gray-100 pt-4 text-base font-semibold">
                <span>Total</span>

                <span>₹{Number(order.total || 0).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
