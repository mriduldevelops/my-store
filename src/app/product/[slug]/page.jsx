import { notFound } from "next/navigation";

import { Container } from "@/components/ui";

import ProductPage from "@/components/product/ProductPage";

import { getProductBySlug } from "@/sanity/lib/products";

export const revalidate = 60;

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product || product.isActive === false) {
    notFound();
  }

  return (
    <Container className="py-12">
      <ProductPage product={product} />
    </Container>
  );
}
