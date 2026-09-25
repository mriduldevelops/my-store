"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import OrderSuccess from "@/components/checkout/OrderSuccess";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  const orderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      setError("Order number is missing.");
      return;
    }

    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/orders/${encodeURIComponent(orderNumber)}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load order.");
        }

        setOrder(data.order || null);
      } catch (error) {
        console.error("LOAD_ORDER_SUCCESS_ERROR:", error);
        setError(error.message || "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />

            <p className="mt-4 text-sm text-gray-500">Loading your order...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h1 className="text-xl font-semibold">Order not found</h1>

            <p className="mt-3 text-sm text-gray-500">
              {error || "We couldn't find the order you're looking for."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return <OrderSuccess order={order} />;
}
