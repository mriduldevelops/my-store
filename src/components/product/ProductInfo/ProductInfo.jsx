"use client";

import { useDispatch } from "react-redux";

import { addToCart } from "@/redux/slices/cartSlice";

import { useMemo, useState } from "react";

import { ShieldCheck, Truck } from "lucide-react";

import ProductPrice from "../ProductPrice";
import ProductRating from "../ProductRating";
import ProductVariants from "../ProductVariants";
import ProductQuantity from "../ProductQuantity";
import AddToCartButton from "../AddToCartButton";
import WishlistButton from "../WishlistButton";

export default function ProductInfo({
  product,
  selectedVariants,
  onVariantChange,
}) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  /*
   * Find the currently selected variant
   */

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) {
      return null;
    }

    return product.variants.find((variant) => {
      if (variant.isActive === false) {
        return false;
      }

      return Object.entries(variant.options || {}).every(
        ([name, value]) => selectedVariants[name] === value,
      );
    });
  }, [product.variants, selectedVariants]);

  /*
   * Current price
   */

  const currentPrice = selectedVariant?.price ?? product.price;

  const currentCompareAtPrice =
    selectedVariant?.compareAtPrice ?? product.compareAtPrice;

  /*
   * Current stock
   */

  const currentStock = selectedVariant?.stock ?? product.stock ?? 0;

  /*
   * Current SKU
   */

  const currentSku = selectedVariant?.sku ?? product.sku;

  /*
   * Handle variant selection
   */

  const handleVariantChange = (variants) => {
    onVariantChange?.(variants);

    setQuantity(1);
  };

  /*
   * Quantity
   */

  const increaseQuantity = () => {
    if (quantity < currentStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  /*
   * Add to cart
   */

  const handleAddToCart = () => {
    if (product.variants?.length && !selectedVariant) {
      console.log("Please select all product options");

      return;
    }

    if (currentStock <= 0) {
      return;
    }

    const cartItem = {
      productId: product._id,

      productName: product.name,

      productSlug: product.slug,

      productImage: selectedVariant?.image ?? product.images?.[0] ?? null,

      variantId: selectedVariant?._key ?? null,

      variants: selectedVariant?.options ?? {},

      quantity,

      price: currentPrice,

      compareAtPrice: currentCompareAtPrice,

      sku: currentSku,

      maxStock: currentStock,
    };

    dispatch(addToCart(cartItem));
  };

  /*
   * Buy now
   */

  const handleBuyNow = () => {
    if (product.variants?.length && !selectedVariant) {
      console.log("Please select all product options");

      return;
    }

    console.log("Buy now:", {
      productId: product._id,

      variantId: selectedVariant?._key ?? null,

      quantity,

      variants: selectedVariant?.options ?? {},

      price: currentPrice,

      sku: currentSku,
    });
  };

  /*
   * Variant selection status
   */

  const requiresVariantSelection =
    product.variants?.length > 0 && !selectedVariant;

  /*
   * Available for purchase
   */

  const isOutOfStock = currentStock <= 0;

  return (
    <div className="flex flex-col">
      {/* Brand */}

      {product.brand && (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          {product.brand}
        </p>
      )}

      {/* Product Name */}

      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="mt-5">
        <ProductRating
          rating={product.rating || 0}
          reviewCount={product.reviewCount || 0}
        />
      </div>

      {/* Price */}

      <div className="mt-6">
        <ProductPrice
          price={currentPrice}
          compareAtPrice={currentCompareAtPrice}
          size="large"
          showDiscount
        />
      </div>

      {/* Description */}

      {product.shortDescription && (
        <p className="mt-6 max-w-xl text-[15px] leading-7 text-gray-600">
          {product.shortDescription}
        </p>
      )}

      {/* SKU */}

      {currentSku && (
        <p className="mt-4 text-sm text-gray-500">SKU: {currentSku}</p>
      )}

      {/* Stock */}

      <div className="mt-5">
        {isOutOfStock ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />

            <span className="text-sm font-medium text-red-600">
              Out of Stock
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-sm font-medium text-green-600">In Stock</span>
          </div>
        )}
      </div>

      {/* Variants */}

      {product.variants?.length > 0 && (
        <div className="mt-8">
          <ProductVariants
            variants={product.variants}
            selectedVariants={selectedVariants}
            onChange={handleVariantChange}
          />
        </div>
      )}

      {/* Variant message */}

      {requiresVariantSelection && (
        <p className="mt-5 text-sm text-amber-600">
          Please select all available options before adding this product to
          cart.
        </p>
      )}

      {/* Quantity */}

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium">Quantity</p>

        <div className="flex items-center gap-4">
          <ProductQuantity
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            maxQuantity={currentStock}
          />

          <WishlistButton product={product} />
        </div>
      </div>

      {/* Add To Cart */}

      <div className="mt-5 flex">
        <AddToCartButton
          onClick={handleAddToCart}
          disabled={isOutOfStock || requiresVariantSelection}
        />
      </div>

      {/* Buy Now */}

      <button
        type="button"
        onClick={handleBuyNow}
        disabled={isOutOfStock || requiresVariantSelection}
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
        {/* Delivery */}

        <div className="flex gap-4 py-5">
          <Truck size={22} className="mt-0.5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">Fast & Secure Delivery</p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Carefully packed and delivered safely to your doorstep.
            </p>
          </div>
        </div>

        {/* Payment */}

        <div className="flex gap-4 py-5">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">Secure Payments</p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Your payment information is protected with secure checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
