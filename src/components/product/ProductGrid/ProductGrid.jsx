import ProductCard from "../ProductCard";

export default function ProductGrid({
  products = [],
  className = "",
}) {
  return (
    <div
      className={`
        grid
        grid-cols-2
        gap-6
        md:grid-cols-3
        xl:grid-cols-4
        ${className}
      `}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}