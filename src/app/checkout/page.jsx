"use client";

import { useState } from "react";

import { Container } from "@/components/ui";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CheckoutReview from "@/components/checkout/CheckoutReview";
import CheckoutPayment from "@/components/checkout/CheckoutPayment";

import { useDispatch, useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartSubtotal,
  clearCart,
} from "@/redux/slices/cartSlice";

import { addOrder } from "@/redux/slices/orderSlice";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const [step, setStep] = useState("details");

  const [customer, setCustomer] = useState(null);

  const items = useSelector(selectCartItems);

  const subtotal = useSelector(selectCartSubtotal);

  const shipping = 0;
  const discount = 0;
  const tax = 0;

  const total = subtotal + shipping + tax - discount;

  /* -------------------------------- */
  /* Empty Cart                       */
  /* -------------------------------- */

  if (!items?.length) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
            <h1 className="text-2xl font-semibold">Your cart is empty</h1>

            <p className="mt-3 text-sm text-gray-500">
              Add some products to your cart before proceeding to checkout.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  /* -------------------------------- */
  /* Details → Review                 */
  /* -------------------------------- */

  const handleDetailsSubmit = (data) => {
    setCustomer(data);
    setStep("review");
  };

  /* -------------------------------- */
  /* Review → Payment                 */
  /* -------------------------------- */

  const handleContinueToPayment = () => {
    setStep("payment");
  };

  /* -------------------------------- */
  /* Payment → Success                */
  /* -------------------------------- */

  const handlePaymentSuccess = async (payment) => {
    try {
      /* -------------------------------- */
      /* COD                               */
      /* -------------------------------- */

      if (payment.paymentMethod === "cod") {
        sessionStorage.setItem(
          "latestOrder",
          JSON.stringify({
            orderNumber: payment.order.orderNumber,
            status: payment.order.status,
            createdAt: payment.order.createdAt,
            total: payment.order.total,
          }),
        );

        dispatch(clearCart());

        window.location.href = `/order-success?orderNumber=${payment.order.orderNumber}`;

        return;
      }

      /* -------------------------------- */
      /* Online Payment                    */
      /* -------------------------------- */

      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          razorpayOrderId: payment.razorpayOrderId,

          razorpayPaymentId: payment.razorpayPaymentId,

          razorpaySignature: payment.razorpaySignature,

          items,

          customer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment verification failed.");
      }

      sessionStorage.setItem(
        "latestOrder",
        JSON.stringify({
          orderNumber: data.order.orderNumber,
          status: data.order.status,
          createdAt: data.order.createdAt,
          total: data.order.total,
        }),
      );

      dispatch(clearCart());

      window.location.href = `/order-success?orderNumber=${data.order.orderNumber}`;
    } catch (error) {
      console.error("PAYMENT_VERIFICATION_ERROR:", error);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 py-10 sm:py-14">
        <Container>
          {/* ================================= */}
          {/* HEADER                             */}
          {/* ================================= */}

          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Checkout
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {step === "details" && "Complete your order"}

              {step === "review" && "Review your order"}

              {step === "payment" && "Choose payment method"}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              {step === "details" &&
                "Enter your delivery details and review your order before payment."}

              {step === "review" &&
                "Check your delivery information and products before continuing."}

              {step === "payment" &&
                "Choose your preferred payment method to complete your order."}
            </p>
          </div>

          {/* ================================= */}
          {/* CHECKOUT STEPS                     */}
          {/* ================================= */}

          <div className="mb-8 flex items-center">
            <Step
              number="1"
              label="Details"
              active={step === "details"}
              completed={step === "review" || step === "payment"}
            />

            <div className="mx-3 h-px flex-1 bg-gray-200" />

            <Step
              number="2"
              label="Review"
              active={step === "review"}
              completed={step === "payment"}
            />

            <div className="mx-3 h-px flex-1 bg-gray-200" />

            <Step number="3" label="Payment" active={step === "payment"} />
          </div>

          {/* ================================= */}
          {/* DETAILS                            */}
          {/* ================================= */}

          {step === "details" && (
            <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <CheckoutForm onSuccess={handleDetailsSubmit} />
              </div>

              <div className="lg:sticky lg:top-28">
                <CheckoutSummary />
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* REVIEW                             */}
          {/* ================================= */}

          {step === "review" && (
            <div className="mx-auto max-w-3xl">
              <CheckoutReview
                customer={customer}
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                tax={tax}
                onBack={() => setStep("details")}
                onPlaceOrder={handleContinueToPayment}
              />
            </div>
          )}

          {/* ================================= */}
          {/* PAYMENT                            */}
          {/* ================================= */}

          {step === "payment" && (
            <div className="mx-auto max-w-3xl">
              <CheckoutPayment
                total={total}
                customer={customer}
                items={items}
                onBack={() => setStep("review")}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          )}
        </Container>
      </main>
    </ProtectedRoute>
  );
}

/* ========================================= */
/* STEP                                      */
/* ========================================= */

function Step({ number, label, active, completed = false }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          text-xs
          font-semibold
          ${
            active || completed
              ? "bg-primary text-white"
              : "border border-gray-200 bg-white text-gray-400"
          }
        `}
      >
        {completed ? "✓" : number}
      </div>

      <span
        className={`
          hidden
          text-sm
          sm:block
          ${active || completed ? "font-medium" : "text-gray-400"}
        `}
      >
        {label}
      </span>
    </div>
  );
}
