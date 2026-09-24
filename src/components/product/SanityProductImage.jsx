import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

const isSanityImage = (value) => {
  return !!value && typeof value === "object" && "asset" in value;
};

export default function SanityProductImage({
  image,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  sizes,
}) {
  if (!image) {
    return null;
  }

  const imageUrl = isSanityImage(image)
    ? urlFor(image).width(width ?? 1000).height(height ?? 1000).quality(85).url()
    : image;

  if (!imageUrl) {
    return null;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt || image?.alt || ""}
      width={fill ? undefined : width ?? 1000}
      height={fill ? undefined : height ?? 1000}
      priority={priority}
      fill={fill}
      sizes={sizes ?? (fill ? "(max-width: 768px) 100vw, 50vw" : undefined)}
      className={className}
    />
  );
}
