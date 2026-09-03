// src/features/catalogo/components/filters/PriceFilter.tsx

type PriceFilterProps = {
  minimum: string;
  maximum: string;

  minimumPlaceholder?: string | null;
  maximumPlaceholder?: string | null;

  onMinimumChange: (
    value: string,
  ) => void;

  onMaximumChange: (
    value: string,
  ) => void;
};


export default function PriceFilter({
  minimum,
  maximum,
  minimumPlaceholder,
  maximumPlaceholder,
  onMinimumChange,
  onMaximumChange,
}: PriceFilterProps) {
  return (
    <section
      className={[
        "rounded-2xl",
        "border border-brand-100",
        "bg-white p-4",
        "dark:border-brand-900/50",
        "dark:bg-warm-900",
      ].join(" ")}
    >
      <h3 className="text-sm font-extrabold text-warm-900 dark:text-cream-50">
        Precio
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label>
          <span className="mb-2 block text-xs font-bold text-warm-700 dark:text-cream-200">
            Desde
          </span>

          <div className="relative">
            <span
              aria-hidden="true"
              className={[
                "absolute left-3 top-1/2",
                "-translate-y-1/2",
                "text-sm font-bold",
                "text-brand-600",
              ].join(" ")}
            >
              $
            </span>

            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={minimum}
              onChange={(event) => {
                onMinimumChange(
                  event.target.value,
                );
              }}
              placeholder={
                minimumPlaceholder
                ?? "0"
              }
              className={[
                "h-12 w-full rounded-xl",
                "border border-brand-100",
                "bg-cream-50",
                "pl-7 pr-3",
                "text-sm font-semibold",
                "outline-none",
                "focus:border-brand-400",
                "focus:ring-4",
                "focus:ring-brand-100/50",

                "dark:border-brand-900/50",
                "dark:bg-warm-800",
                "dark:focus:ring-brand-900/30",
              ].join(" ")}
            />
          </div>
        </label>

        <label>
          <span className="mb-2 block text-xs font-bold text-warm-700 dark:text-cream-200">
            Hasta
          </span>

          <div className="relative">
            <span
              aria-hidden="true"
              className={[
                "absolute left-3 top-1/2",
                "-translate-y-1/2",
                "text-sm font-bold",
                "text-brand-600",
              ].join(" ")}
            >
              $
            </span>

            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={maximum}
              onChange={(event) => {
                onMaximumChange(
                  event.target.value,
                );
              }}
              placeholder={
                maximumPlaceholder
                ?? "0"
              }
              className={[
                "h-12 w-full rounded-xl",
                "border border-brand-100",
                "bg-cream-50",
                "pl-7 pr-3",
                "text-sm font-semibold",
                "outline-none",
                "focus:border-brand-400",
                "focus:ring-4",
                "focus:ring-brand-100/50",

                "dark:border-brand-900/50",
                "dark:bg-warm-800",
                "dark:focus:ring-brand-900/30",
              ].join(" ")}
            />
          </div>
        </label>
      </div>
    </section>
  );
}