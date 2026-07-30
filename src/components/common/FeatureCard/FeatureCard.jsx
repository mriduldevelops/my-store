export default function FeatureCard({
  feature,
}) {
  const Icon = feature.icon;

  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-white
        p-8
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-primary/10
        "
      >
        <Icon
          size={28}
          className="text-primary"
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold">
        {feature.title}
      </h3>

      <p className="mt-3 leading-7 text-text-secondary">
        {feature.description}
      </p>
    </div>
  );
}