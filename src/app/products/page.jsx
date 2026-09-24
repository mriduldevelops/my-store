// src/app/products/page.jsx

import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/sanity/lib/products";

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  console.log(products)

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>

          <p className="mt-2 text-gray-500">Explore our latest collection.</p>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
