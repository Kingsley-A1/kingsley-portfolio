interface PageHeroProps {
  label: string;
  title: string;
  description: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-animated-gradient pt-20 pb-14 sm:pt-24 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-blue/8 dark:bg-brand-blue/4 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
          {label}
        </p>
        <h1 className="mt-4 text-balance text-h2 font-bold leading-tight tracking-tight text-neutral-900 sm:text-h1 sm:leading-display lg:text-display dark:text-neutral-50">
          {title.split(" ").map((word, i, arr) => {
            // Solid single-accent emphasis on the final word — no gradient text.
            if (i === arr.length - 1) {
              return (
                <span key={i} className="text-brand-blue dark:text-brand-blue-bright">
                  {word}
                </span>
              );
            }
            return <span key={i}>{word} </span>;
          })}
        </h1>
        <p className="mt-4 text-body-lg leading-body text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </section>
  );
}
