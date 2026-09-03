// src/features/catalogo/components/filters/FilterChipGroup.tsx

import {
  Check,
} from "lucide-react";


export type FilterOption = {
  value: string;
  label: string;
  count?: number;
};


type FilterChipGroupProps = {
  options: FilterOption[];
  selected: string[];
  onChange: (
    values: string[],
  ) => void;
};


function toggleValue(
  currentValues: string[],
  value: string,
) {
  if (
    currentValues.includes(value)
  ) {
    return currentValues.filter(
      (currentValue) =>
        currentValue !== value,
    );
  }

  return [
    ...currentValues,
    value,
  ];
}


export default function FilterChipGroup({
  options,
  selected,
  onChange,
}: FilterChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected =
          selected.includes(
            option.value,
          );

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={
              isSelected
            }
            onClick={() => {
              onChange(
                toggleValue(
                  selected,
                  option.value,
                ),
              );
            }}
            className={[
              "inline-flex min-h-10 items-center gap-1.5",
              "rounded-full border px-3 py-2",
              "text-xs font-bold transition",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",

              isSelected
                ? [
                    "border-brand-500",
                    "bg-brand-500",
                    "text-white",
                    "shadow-sm",
                  ].join(" ")
                : [
                    "border-brand-100",
                    "bg-cream-50",
                    "text-warm-700",
                    "hover:border-brand-300",
                    "active:bg-brand-100",

                    "dark:border-brand-900/50",
                    "dark:bg-warm-900",
                    "dark:text-cream-200",
                  ].join(" "),
            ].join(" ")}
          >
            {isSelected && (
              <Check
                aria-hidden="true"
                className="size-3.5"
              />
            )}

            <span>
              {option.label}
            </span>

            {option.count !== undefined && (
              <span
                className={[
                  "rounded-full",
                  "px-1.5 py-0.5",
                  "text-[0.6rem]",

                  isSelected
                    ? "bg-white/20"
                    : [
                        "bg-brand-100",
                        "text-brand-700",
                        "dark:bg-brand-950/50",
                        "dark:text-brand-200",
                      ].join(" "),
                ].join(" ")}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}