import Image from "next/image";

import SanityProductImage from "../SanityProductImage";

const isSanityImage = (value) => {
  return !!value && typeof value === "object" && "asset" in value;
};

export default function GalleryThumbnail({
  images,
  selectedImage,
  onSelect,
  productName,
}) {
  return (
    <div className="flex flex-col gap-3">
      {images.map((image, index) => {
        const isSelected = selectedImage === index;

        return (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`View ${productName} image ${index + 1}`}
            aria-current={isSelected ? "true" : "false"}
            className={`
              relative
              aspect-square
              w-full
              overflow-hidden
              rounded-xl
              border
              bg-gray-50
              transition
              ${
                isSelected
                  ? "border-primary ring-1 ring-primary"
                  : "border-border hover:border-gray-400"
              }
            `}
          >
            {isSanityImage(image) ? (
              <SanityProductImage
                image={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="88px"
                className="object-cover"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}