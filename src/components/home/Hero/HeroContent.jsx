import HeroButtons from "./HeroButtons";

export default function HeroContent({ hero }) {
  return (
    <div className="max-w-xl">

      <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        {hero.badge}
      </span>

      <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
        {hero.title}
      </h1>

      <p className="mt-6 text-lg leading-8 text-gray-600">
        {hero.subtitle}
      </p>

      <HeroButtons
        primary={hero.primaryButton}
        secondary={hero.secondaryButton}
      />

    </div>
  );
}