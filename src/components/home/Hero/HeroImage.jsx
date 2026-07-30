import Image from "next/image";

export default function HeroImage({ image }) {
  return (
    <div className="relative flex justify-center">

      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />

      <Image
        src={image}
        alt="Hero"
        width={650}
        height={650}
        priority
        className="relative z-10 rounded-3xl object-cover"
      />

    </div>
  );
}