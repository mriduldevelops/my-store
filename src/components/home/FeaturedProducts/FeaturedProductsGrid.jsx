import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProductsGrid({
  products,
}) {
  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}