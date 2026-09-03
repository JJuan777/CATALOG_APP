// src/features/catalogo/components/filters/FilterSection.tsx

import type {
  PropsWithChildren,
} from "react";


type FilterSectionProps =
  PropsWithChildren<{
    title: string;
    selectedCount?: number;
    defaultOpen?: boolean;
  }>;


export default function FilterSection({
  title,
  selectedCount = 0,
  defaultOpen = false,
  children,
}: FilterSectionProps) {
  return (
    <details
      {...(
        defaultOpen
          ? { open: true }
          : {}
      )}
      className={[
        "rounded-2xl",
        "border border-brand-100",
        "bg-white p-4",
        "dark:border-brand-900/50",
        "dark:bg-warm-900",
      ].join(" ")}
    >
      <summary className="cursor-pointer list-none text-sm font-extrabold text-warm-900 dark:text-cream-50">
        {title}

        {selectedCount > 0 && (
          <span className="ml-2 text-brand-600 dark:text-brand-300">
            ({selectedCount})
          </span>
        )}
      </summary>

      <div className="mt-4">
        {children}
      </div>
    </details>
  );
}