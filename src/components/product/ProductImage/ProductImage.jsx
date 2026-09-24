import SanityProductImage from "../SanityProductImage";

export default function ProductImage({
  images,
  name,
}) {
  const image = Array.isArray(images) ? images[0] : null;

  if (!image) {
    return null;
  }

  return (
    <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-gray-100">
      <SanityProductImage
        image={image}
        alt={name}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}