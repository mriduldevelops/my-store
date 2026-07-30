import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  category,
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl"
    >
      <div className="aspect-square">

        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

      </div>

      <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />

      <div className="absolute bottom-6 left-6">

        <h3 className="text-2xl font-semibold text-white">
          {category.name}
        </h3>

      </div>
    </Link>
  );
}