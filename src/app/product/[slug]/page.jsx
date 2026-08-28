import { notFound } from "next/navigation";

import { Container } from "@/components/ui";

import ProductPage from "@/components/product/ProductPage";

import { products } from "@/data/products";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <Container className="py-12">
      <ProductPage product={product} />
    </Container>
  );
}
