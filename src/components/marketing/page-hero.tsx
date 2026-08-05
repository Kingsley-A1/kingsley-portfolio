import { cn } from "@/lib/utils";

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  gradient?: "blue" | "warm" | "full";
}

export function PageHero({
  label,
  title,
  description,
  gradient = "blue",
}: PageHeroProps) {
  const gradientMap = {
    blue: "text-gradient-blue",
    warm: "text-gradient-warm",
    full: "text-gradient-full",
  };

  return (
    <section className="relative overflow-hidden bg-animated-gradient pt-24 pb-14 sm:pt-32 sm:pb-22">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-blue/8 dark:bg-brand-blue/4 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-brand-teal/8 dark:bg-brand-teal/4 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
          {label}
        </p>
        <h1 className="mt-4 text-display font-bold leading-display tracking-tight text-neutral-900 dark:text-neutral-50">
          {title.split(" ").map((word, i, arr) => {
            // Highlight the last two words with gradient
            if (i === arr.length - 2 && arr[i + 1]) {
              return (
                <span key={i}>
                  {word}{" "}
                  <span className={gradientMap[gradient]}>{arr[i + 1]}</span>
                </span>
              );
            }
            if (i === arr.length - 1 && arr.length > 1) return null;
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
