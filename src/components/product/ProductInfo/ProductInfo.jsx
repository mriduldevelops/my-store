"use client";

import { useState } from "react";

import {
  Heart,
  ShieldCheck,
  Truck,
} from "lucide-react";

import ProductRating from "../ProductRating";
import ProductPrice from "../ProductPrice";
import ProductQuantity from "../ProductQuantity";
import ProductVariants from "../ProductVariants";
import AddToCartButton from "../AddToCartButton";

export default function ProductInfo({
  product,
}) {
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [selectedVariants, setSelectedVariants] =
    useState({});

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleVariantChange = (variants) => {
    setSelectedVariants(variants);
  };

  const handleAddToCart = () => {
    console.log({
      productId: product.id,
      quantity,
      variants: selectedVariants,
    });
  };

  return (
    <div className="flex flex-col">

      {/* Brand */}

      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
        {product.brand}
      </p>

      {/* Name */}

      <h1 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="mt-5">
        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Price */}

      <div className="mt-6">
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          size="large"
          showDiscount
        />
      </div>

      {/* Short Description */}

      {product.shortDescription && (
        <p className="mt-6 max-w-xl leading-7 text-gray-600">
          {product.shortDescription}
        </p>
      )}

      {/* Stock */}

      <div className="mt-6">
        {product.stock > 0 ? (
          <p className="text-sm font-medium text-green-600">
            In Stock
          </p>
        ) : (
          <p className="text-sm font-medium text-red-600">
            Out of Stock
          </p>
        )}
      </div>

      {/* Variants */}

      {product.variants?.length > 0 && (
        <div className="mt-8">
          <ProductVariants
            variants={product.variants}
            onChange={handleVariantChange}
          />
        </div>
      )}

      {/* Quantity + Wishlist */}

      <div className="mt-8 flex items-center gap-4">

        <ProductQuantity
          quantity={quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          maxQuantity={product.stock}
        />

        <button
          type="button"
          onClick={() =>
            setWishlist((prev) => !prev)
          }
          aria-label={
            wishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-border
            transition
            hover:border-primary
          "
        >
          <Heart
            size={20}
            className={
              wishlist
                ? "fill-red-500 text-red-500"
                : "text-gray-700"
            }
          />
        </button>

      </div>

      {/* Add To Cart */}

      <div className="mt-4 flex">
        <AddToCartButton
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        />
      </div>

      {/* Buy Now */}

      <button
        type="button"
        disabled={product.stock <= 0}
        className="
          mt-3
          h-14
          w-full
          rounded-xl
          border
          border-primary
          font-medium
          text-primary
          transition
          hover:bg-primary
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Buy Now
      </button>

      {/* Benefits */}

      <div className="mt-8 divide-y divide-border border-y border-border">

        <div className="flex items-center gap-4 py-5">

          <Truck
            size={22}
            className="text-primary"
          />

          <div>
            <p className="text-sm font-medium">
              Fast & Secure Delivery
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Delivered safely to your doorstep.
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 py-5">

          <ShieldCheck
            size={22}
            className="text-primary"
          />

          <div>
            <p className="text-sm font-medium">
              Secure Payments
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Your payment information is protected.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}