"use client";

import { useMemo, useState } from "react";

import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";
import ProductTabs from "../ProductTabs";
import RelatedProducts from "../RelatedProducts";

export default function ProductPage({ product }) {
  const [selectedVariants, setSelectedVariants] = useState({});

  /*
   * Find selected variant
   */

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) {
      return null;
    }

    return product.variants.find((variant) => {
      return Object.entries(variant.options).every(
        ([name, value]) => selectedVariants[name] === value,
      );
    });
  }, [product.variants, selectedVariants]);

  /*
   * Selected variant image
   */

  const selectedVariantImage = selectedVariant?.image ?? null;

  return (
    <>
      {/* Main Product */}

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          product={product}
          selectedImage={selectedVariantImage}
        />

        <ProductInfo
          product={product}
          selectedVariants={selectedVariants}
          onVariantChange={setSelectedVariants}
        />
      </div>

      {/* Product Details */}

      <ProductTabs product={product} />

      {/* Related Products */}

      <RelatedProducts currentProduct={product} />
    </>
  );
}
