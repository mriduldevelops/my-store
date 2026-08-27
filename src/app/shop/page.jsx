"use client";

import { useState } from "react";

import ShopLayout from "@/components/shop/ShopLayout";
import ShopToolbar from "@/components/shop/ShopToolbar";
import FilterSidebar from "@/components/shop/FilterSidebar";
import Pagination from "@/components/shop/Pagination";

import ProductGrid from "@/components/product/ProductGrid";

import { products } from "@/data/products";

export default function ShopPage() {
  const [page, setPage] = useState(1);

  return (
    <ShopLayout
      toolbar={<ShopToolbar total={products.length} />}
      sidebar={<FilterSidebar />}
      pagination={
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      }
    >
      <ProductGrid products={products} />
    </ShopLayout>
  );
}
