export default function ProductPrice({
  price,
  compareAtPrice,
  size = "default",
  showDiscount = false,
}) {
  const discount =
    compareAtPrice && compareAtPrice > price
      ? Math.round(
          ((compareAtPrice - price) / compareAtPrice) * 100
        )
      : 0;

  const isLarge = size === "large";

  return (
    <div className="flex items-center gap-3">
      {/* Current Price */}

      <span
        className={`font-semibold ${
          isLarge ? "text-3xl" : "text-lg"
        }`}
      >
        ₹{price.toLocaleString("en-IN")}
      </span>

      {/* Original Price */}

      {compareAtPrice && compareAtPrice > price && (
        <span
          className={`text-gray-400 line-through ${
            isLarge ? "text-lg" : "text-sm"
          }`}
        >
          ₹{compareAtPrice.toLocaleString("en-IN")}
        </span>
      )}

      {/* Discount */}

      {showDiscount && discount > 0 && (
        <span
          className="
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-sm
            font-medium
            text-primary
          "
        >
          {discount}% OFF
        </span>
      )}
    </div>
  );
}