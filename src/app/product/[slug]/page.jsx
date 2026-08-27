import { notFound } from "next/navigation";

import { Container } from "@/components/ui";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

import { products } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <Container className="py-12">

      {/* Product */}

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

        <ProductGallery
          product={product}
        />

        <ProductInfo
          product={product}
        />

      </div>

      {/* Product Information */}

      <ProductTabs
        product={product}
      />

      {/* Related Products */}

      <RelatedProducts
        currentProduct={product}
      />

    </Container>
  );
}