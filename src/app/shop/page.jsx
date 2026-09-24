import ShopPageClient from "@/components/shop/ShopPageClient";

import { getProducts } from "@/sanity/lib/products";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  return <ShopPageClient products={products} />;
}
