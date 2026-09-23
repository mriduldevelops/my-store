"use client";

import { useEffect, useState } from "react";

import OrderSuccess from "@/components/checkout/OrderSuccess";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem("latestOrder");

    if (!storedOrder) {
      return;
    }

    try {
      setOrder(JSON.parse(storedOrder));
    } catch (error) {
      console.error("Failed to load order:", error);
    }
  }, []);

  return <OrderSuccess order={order} />;
}
