export default function FooterBottom() {
  return (
    <div
      className="
      mt-16
      flex
      flex-col
      items-center
      justify-between
      gap-6
      border-t
      border-white/10
      pt-8
      text-sm
      text-white/60
      lg:flex-row
      "
    >
      <p>
        © {new Date().getFullYear()} YourBrand.
        All rights reserved.
      </p>

      {/* <div className="flex gap-3">

        <img
          src="/images/payments/visa.png"
          alt="Visa"
          className="h-8"
        />

        <img
          src="/images/payments/mastercard.webp"
          alt="Mastercard"
          className="h-8"
        />

        <img
          src="/images/payments/rupay.png"
          alt="RuPay"
          className="h-8"
        />

      </div> */}

    </div>
  );
}