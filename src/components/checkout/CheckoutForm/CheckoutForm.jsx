"use client";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { selectCartItems } from "@/redux/slices/cartSlice";
import { checkoutSchema } from "@/lib/validations/checkoutSchema";

export default function CheckoutForm({ onSuccess }) {
  const items = useSelector(selectCartItems);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      pincode: "",
    },

    mode: "onBlur",
  });

  /*
   * Successful validation
   */
  const onSubmit = async (data) => {
    console.log("FORM VALID:", data);

    if (!items || items.length === 0) {
      console.log("Cart is empty");
      return;
    }

    console.log("Calling onSuccess...");

    onSuccess?.(data);
  };

  /*
   * Failed validation
   */
  const onInvalid = (errors) => {
    console.log("FORM VALIDATION ERRORS:", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
        onInvalid
      )}
      noValidate
      className="space-y-10"
    >
      {/* ================================ */}
      {/* CONTACT INFORMATION              */}
      {/* ================================ */}

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Contact Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            We'll use this information to contact you
            about your order.
          </p>
        </div>

        <div className="space-y-5">
          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            error={errors.email}
            autoComplete="email"
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="10-digit mobile number"
            register={register}
            error={errors.phone}
            autoComplete="tel"
            inputMode="numeric"
            maxLength={10}
          />
        </div>
      </section>

      {/* ================================ */}
      {/* SHIPPING ADDRESS                 */}
      {/* ================================ */}

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Shipping Address
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the address where you'd like your
            order delivered.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="First name"
            register={register}
            error={errors.firstName}
            autoComplete="given-name"
          />

          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Last name"
            register={register}
            error={errors.lastName}
            autoComplete="family-name"
          />

          <FormField
            label="Address"
            name="address"
            placeholder="House number, street, area"
            register={register}
            error={errors.address}
            autoComplete="street-address"
            className="sm:col-span-2"
          />

          <FormField
            label="Apartment / Landmark"
            name="apartment"
            placeholder="Apartment, floor, landmark"
            register={register}
            error={errors.apartment}
            autoComplete="address-line2"
            optional
            className="sm:col-span-2"
          />

          <FormField
            label="City"
            name="city"
            placeholder="City"
            register={register}
            error={errors.city}
            autoComplete="address-level2"
          />

          <FormField
            label="State"
            name="state"
            placeholder="State"
            register={register}
            error={errors.state}
            autoComplete="address-level1"
          />

          <FormField
            label="Pincode"
            name="pincode"
            placeholder="6-digit pincode"
            register={register}
            error={errors.pincode}
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={6}
          />
        </div>
      </section>

      {/* ================================ */}
      {/* SUBMIT                           */}
      {/* ================================ */}

      <button
        type="submit"
        disabled={isSubmitting || !items?.length}
        className="
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
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isSubmitting
          ? "Processing..."
          : "Continue to Payment"}
      </button>
    </form>
  );
}

/* ================================= */
/* FORM FIELD                        */
/* ================================= */

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  optional = false,
  autoComplete,
  inputMode,
  maxLength,
  className = "",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium"
      >
        {label}

        {optional && (
          <span className="ml-1 font-normal text-gray-400">
            (Optional)
          </span>
        )}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={!!error}
        {...register(name)}
        className={`
          h-12
          w-full
          rounded-xl
          border
          px-4
          text-sm
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-primary
          ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200"
          }
        `}
      />

      {error?.message && (
        <p className="mt-1.5 text-xs text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}