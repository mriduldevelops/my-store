import Link from "next/link";

import ProductImage from "../ProductImage";
import ProductPrice from "../ProductPrice";
import SanityProductImage from "../SanityProductImage";
import WishlistButton from "../WishlistButton";

const isSanityImage = (value) => {
  return !!value && typeof value === "object" && "asset" in value;
};

export default function ProductCard({
  product,
}) {
  const primaryImage = Array.isArray(product?.images)
    ? product.images.find(isSanityImage) ?? product?.image
    : product?.image;

  const shouldUseSanityImage = isSanityImage(primaryImage);

  return (
    <Link
      href={`/product/${product?.slug?.current || product.slug}`}
      className="group block"
    >
      <div className="relative">
        {shouldUseSanityImage ? (
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-100">
            <SanityProductImage
              image={primaryImage}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <ProductImage
            images={product?.images ?? []}
            name={product.name}
          />
        )}

        <WishlistButton />
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {product.brand}
        </p>

        <h3 className="mt-2 line-clamp-1 text-lg font-medium transition group-hover:text-primary">
          {product.name}
        </h3>

        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
        />
      </div>
    </Link>
  );
}