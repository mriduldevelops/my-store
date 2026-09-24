import Image from "next/image";

import SanityProductImage from "../SanityProductImage";

const isSanityImage = (value) => {
  return !!value && typeof value === "object" && "asset" in value;
};

export default function GalleryImage({
  image,
  productName,
}) {
  if (!image) {
    return null;
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50">
      {isSanityImage(image) ? (
        <SanityProductImage
          image={image}
          alt={productName}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <Image
          src={image}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      )}
    </div>
  );
}