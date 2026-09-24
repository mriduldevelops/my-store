import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

export default function SanityProductImage({
  image,
  alt,
  className,
  priority = false,
  fill = false,
}) {
  if (!image) {
    return null;
  }

  const imageUrl = urlFor(image).width(1000).height(1000).quality(85).url();

  return (
    <Image
      src={imageUrl}
      alt={alt || image.alt || ""}
    //   width={1000}
    //   height={1000}
      priority={priority}
      fill={fill}
      sizes={fill ? "(max-width: 768px) 100vw, 50vw" : undefined}
      className={className}
    />
  );
}
