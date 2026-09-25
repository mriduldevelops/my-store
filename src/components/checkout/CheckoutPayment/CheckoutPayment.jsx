"use client";

import { useState } from "react";
import Script from "next/script";

export default function CheckoutPayment({
  total,
  customer,
  items,
  onBack,
  onPaymentSuccess,
}) {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      /* -------------------------------- */
      /* Cash On Delivery                 */
      /* -------------------------------- */

      if (paymentMethod === "cod") {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            items,
            customer,
            paymentMethod: "cod",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to place COD order.");
        }

        await onPaymentSuccess({
          paymentMethod: "cod",
          order: data.order,
        });

        return;
      }

      /* -------------------------------- */
      /* Online Payment                   */
      /* -------------------------------- */

      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          items,
          customer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create payment order.");
      }

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay checkout is not loaded yet. Please try again.",
        );
      }

      /* -------------------------------- */
      /* Razorpay Options                 */
      /* -------------------------------- */

      const options = {
        key: data.keyId,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Your Store Name",

        description: "Order Payment",

        order_id: data.order.id,

        prefill: {
          name: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          contact: customer.phone,
        },

        theme: {
          color: "#000000",
        },

        handler: async (paymentResponse) => {
          try {
            await onPaymentSuccess({
              paymentMethod: "online",

              razorpayOrderId: paymentResponse.razorpay_order_id,

              razorpayPaymentId: paymentResponse.razorpay_payment_id,

              razorpaySignature: paymentResponse.razorpay_signature,
            });
          } catch (error) {
            console.error("PAYMENT_SUCCESS_HANDLER_ERROR:", error);

            setError(
              "Payment was successful, but we could not complete your order. Please contact support.",
            );

            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("RAZORPAY_PAYMENT_FAILED:", response.error);

        setError(
          response.error?.description || "Payment failed. Please try again.",
        );

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("PAYMENT_ERROR:", error);

      setError(
        error.message || "Something went wrong while processing your payment.",
      );

      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        {/* -------------------------------- */}
        {/* Header                           */}
        {/* -------------------------------- */}

        <h2 className="text-xl font-semibold text-gray-900">Payment</h2>

        <p className="mt-2 text-sm text-gray-500">
          Choose your preferred payment method.
        </p>

        {/* -------------------------------- */}
        {/* Payment Methods                  */}
        {/* -------------------------------- */}

        <div className="mt-6 space-y-3">
          {/* Online */}

          <button
            type="button"
            onClick={() => {
              if (loading) return;

              setPaymentMethod("online");
              setError("");
            }}
            disabled={loading}
            className={`w-full rounded-xl border p-4 text-left transition ${
              paymentMethod === "online"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Radio */}

              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  paymentMethod === "online"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod === "online" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Text */}

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Online Payment
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Pay securely using Razorpay
                </p>
              </div>
            </div>
          </button>

          {/* COD */}

          <button
            type="button"
            onClick={() => {
              if (loading) return;

              setPaymentMethod("cod");
              setError("");
            }}
            disabled={loading}
            className={`w-full rounded-xl border p-4 text-left transition ${
              paymentMethod === "cod"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Radio */}

              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  paymentMethod === "cod" ? "border-primary" : "border-gray-300"
                }`}
              >
                {paymentMethod === "cod" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Text */}

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Cash on Delivery
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Pay when your order is delivered
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* -------------------------------- */}
        {/* Error                            */}
        {/* -------------------------------- */}

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* -------------------------------- */}
        {/* Total                            */}
        {/* -------------------------------- */}

        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
          <span className="text-sm text-gray-500">Total</span>

          <span className="text-xl font-semibold text-gray-900">
            ₹{Number(total).toLocaleString("en-IN")}
          </span>
        </div>

        {/* -------------------------------- */}
        {/* Actions                          */}
        {/* -------------------------------- */}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? paymentMethod === "cod"
                ? "Placing Order..."
                : "Opening Payment..."
              : paymentMethod === "cod"
                ? "Place Order"
                : "Pay Now"}
          </button>
        </div>
      </div>
    </>
  );
}
