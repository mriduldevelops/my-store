
export default function OrderItem({ item }) {
  const variants = item?.variants ? Object.entries(item.variants) : [];

  const lineTotal = Number(item?.price || 0) * Number(item?.quantity || 0);

  return (
    <div className="flex gap-4 border-b border-gray-100 py-5 last:border-b-0">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {item?.productImage ? (
          <img
            src={item.productImage}
            alt={item.productName}
            className="h-20 w-20 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-gray-900">
          {item?.productName || "Product"}
        </h3>

        {variants.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {variants.map(([key, value]) => (
              <span key={key} className="text-xs text-gray-500">
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        {item?.sku && (
          <p className="mt-1 text-xs text-gray-400">SKU: {item.sku}</p>
        )}

        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <span>₹{Number(item?.price || 0).toLocaleString("en-IN")}</span>

          <span>×</span>

          <span>{item?.quantity || 0}</span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold text-gray-900">
          ₹{lineTotal.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
