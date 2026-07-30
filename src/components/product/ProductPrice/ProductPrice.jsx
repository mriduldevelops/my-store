export default function ProductPrice({
  price,
  compareAtPrice,
}) {
  return (
    <div className="mt-3 flex items-center gap-3">

      <span className="text-lg font-semibold">
        ₹{price.toLocaleString("en-IN")}
      </span>

      {compareAtPrice && (
        <span className="text-sm text-gray-400 line-through">
          ₹{compareAtPrice.toLocaleString("en-IN")}
        </span>
      )}

    </div>
  );
}