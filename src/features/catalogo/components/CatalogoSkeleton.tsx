// src/features/catalogo/components/CatalogoSkeleton.tsx

const SKELETON_RATIOS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/6]",
  "aspect-[5/6]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
] as const;


export default function CatalogoSkeleton() {
  return (
    <div
      role="status"
      aria-label="Cargando productos"
      aria-live="polite"
      className={[
        "grid grid-cols-2",
        "items-start gap-3",

        "md:grid-cols-3",
        "md:gap-4",

        "xl:grid-cols-4",

        "2xl:grid-cols-5",
      ].join(" ")}
    >
      {SKELETON_RATIOS.map(
        (
          ratio,
          index,
        ) => (
          <div
            key={`${ratio}-${index}`}
            aria-hidden="true"
            className={[
              "overflow-hidden",
              "rounded-[1.25rem]",
              "border",
              "border-brand-100",
              "bg-white",

              "sm:rounded-[1.6rem]",

              "dark:border-brand-900/40",
              "dark:bg-warm-800",
            ].join(" ")}
          >
            <div
              className={[
                ratio,
                "animate-pulse",
                "bg-brand-100/70",
                "dark:bg-brand-950/30",
              ].join(" ")}
            />

            <div className="space-y-2 p-3 sm:space-y-3 sm:p-4">
              <div className="h-3 w-16 animate-pulse rounded-full bg-brand-100 dark:bg-brand-950/40" />

              <div className="h-4 w-3/4 animate-pulse rounded-full bg-cream-300 dark:bg-warm-700" />

              <div className="h-3 w-full animate-pulse rounded-full bg-cream-200 dark:bg-warm-700" />
            </div>
          </div>
        ),
      )}

      <span className="sr-only">
        Cargando productos del catálogo.
      </span>
    </div>
  );
}