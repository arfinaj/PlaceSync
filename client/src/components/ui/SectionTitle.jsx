function SectionTitle({
  badge,
  title,
  highlight,
  description,
  center = true,
}) {
  return (
    <div
      className={`mb-16 ${
        center ? "text-center mx-auto" : ""
      }`}
    >
      <p className="font-semibold uppercase tracking-[0.2em] text-violet-400">
        {badge}
      </p>

      <h2 className="mt-5 text-5xl font-bold leading-tight">
        {title}

        {highlight && (
          <span className="text-violet-500">
            {" "}
            {highlight}
          </span>
        )}
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default SectionTitle;