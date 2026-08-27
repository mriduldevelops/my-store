import Image from "next/image";

export default function GalleryImage({
  image,
  productName,
}) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50">
      <Image
        src={image}
        alt={productName}
        fill
        priority
        sizes="
          (max-width: 1024px) 100vw,
          50vw
        "
        className="
          object-cover
          transition-transform
          duration-500
          hover:scale-105
        "
      />
    </div>
  );
}