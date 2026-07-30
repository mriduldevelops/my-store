import Image from "next/image";

export default function ProductImage({
  images,
  name,
}) {
  return (
    <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-100">

      <Image
        src={images[0]}
        alt={name}
        fill
        priority={false}
        className="object-cover transition duration-500 group-hover:scale-105"
      />

    </div>
  );
}