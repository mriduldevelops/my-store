"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package } from "lucide-react";

import { Container } from "@/components/ui";

import { selectOrders, setOrders } from "@/redux/slices/orderSlice";

import OrderCard from "@/components/orders/OrderCard";
import OrdersEmpty from "@/components/orders/OrdersEmpty";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);

  useEffect(() => {
    const storedOrders = sessionStorage.getItem("orders");

    if (!storedOrders) {
      return;
    }

    try {
      const parsedOrders = JSON.parse(storedOrders);

      if (Array.isArray(parsedOrders)) {
        dispatch(setOrders(parsedOrders));
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 py-10 sm:py-14">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <Package size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                My Orders
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View and manage your orders
              </p>
            </div>
          </div>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <OrdersEmpty />
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <OrderCard key={order.orderNumber} order={order} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
