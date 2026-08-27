import ProductGrid from "../ProductGrid";

import { products } from "@/data/products";

export default function RelatedProducts({
  currentProduct,
}) {
  const relatedProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category === currentProduct.category
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-24 border-t border-border pt-16">
      
      {/* Section Header */}

      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          You May Also Like
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Related Products
        </h2>
      </div>

      {/* Products */}

      <ProductGrid
        products={relatedProducts}
      />

    </section>
  );
}