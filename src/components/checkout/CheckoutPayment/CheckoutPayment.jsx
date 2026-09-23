"use client";

import { useState } from "react";

import { CreditCard, Banknote, ShieldCheck, Lock } from "lucide-react";

export default function CheckoutPayment({
  total,
  customer,
  onBack,
  onPaymentSuccess,
}) {
  const [paymentMethod, setPaymentMethod] = useState("online");

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    /*
     * TEMPORARY
     *
     * Razorpay/payment gateway will be connected here later.
     */

    console.log("Payment Method:", paymentMethod);
    console.log("Customer:", customer);
    console.log("Amount:", total);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);

    onPaymentSuccess?.({
      paymentMethod,
      amount: total,
    });
  };

  return (
    <div className="space-y-6">
      {/* ================================= */}
      {/* PAYMENT METHOD                     */}
      {/* ================================= */}

      <section className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-semibold">Payment Method</h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose how you'd like to pay.
          </p>
        </div>

        <div className="space-y-3 p-6 sm:p-8">
          {/* Online Payment */}

          <PaymentOption
            value="online"
            selected={paymentMethod === "online"}
            onChange={setPaymentMethod}
            icon={CreditCard}
            title="Online Payment"
            description="Pay securely using UPI, cards or net banking"
          />

          {/* Cash on Delivery */}

          <PaymentOption
            value="cod"
            selected={paymentMethod === "cod"}
            onChange={setPaymentMethod}
            icon={Banknote}
            title="Cash on Delivery"
            description="Pay when your order is delivered"
          />
        </div>
      </section>

      {/* ================================= */}
      {/* SECURITY                           */}
      {/* ================================= */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <ShieldCheck size={20} className="text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium">Secure Checkout</p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Your payment information is handled securely. We never store your
              card details.
            </p>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* ACTIONS                            */}
      {/* ================================= */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Amount to pay</span>

          <span className="text-xl font-semibold">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="
            mt-6
            flex
            h-13
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <Lock size={16} />

              {paymentMethod === "cod"
                ? "Place Order"
                : `Pay ₹${total.toLocaleString("en-IN")}`}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="
            mt-3
            w-full
            text-sm
            font-medium
            text-gray-500
            transition
            hover:text-gray-900
            disabled:opacity-50
          "
        >
          Back to Review
        </button>
      </div>
    </div>
  );
}

/* ================================= */
/* PAYMENT OPTION                    */
/* ================================= */

function PaymentOption({
  value,
  selected,
  onChange,
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        border
        p-4
        text-left
        transition
        ${
          selected
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
    >
      {/* Radio */}

      <span
        className={`
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          ${selected ? "border-primary" : "border-gray-300"}
        `}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>

      {/* Icon */}

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
        <Icon size={20} />
      </div>

      {/* Text */}

      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
      </div>
    </button>
  );
}
