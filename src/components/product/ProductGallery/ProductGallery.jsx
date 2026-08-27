"use client";

import { useState } from "react";

import GalleryThumbnail from "./GalleryThumbnail";
import GalleryImage from "./GalleryImage";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product?.images?.length) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-gray-100">
        <p className="text-sm text-gray-500">
          No image available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[72px_1fr] gap-4 sm:grid-cols-[88px_1fr] sm:gap-6">

      {/* Thumbnails */}

      <GalleryThumbnail
        images={product.images}
        selectedImage={selectedImage}
        onSelect={setSelectedImage}
        productName={product.name}
      />

      {/* Main Image */}

      <GalleryImage
        image={product.images[selectedImage]}
        productName={product.name}
      />

    </div>
  );
}