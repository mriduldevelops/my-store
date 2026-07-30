import Link from "next/link";

import ProductImage from "../ProductImage";
import ProductPrice from "../ProductPrice";
import WishlistButton from "../WishlistButton";

export default function ProductCard({
  product,
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative">

        <ProductImage
          images={product.images}
          name={product.name}
        />

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