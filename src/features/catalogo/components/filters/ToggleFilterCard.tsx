// src/features/catalogo/components/filters/ToggleFilterCard.tsx

import type {
  ReactNode,
} from "react";


type ToggleFilterCardProps = {
  active: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
};


export default function ToggleFilterCard({
  active,
  label,
  icon,
  onClick,
}: ToggleFilterCardProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "flex min-h-20",
        "flex-col items-center",
        "justify-center gap-2",
        "rounded-2xl border",
        "p-3 text-center",
        "transition",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-brand-500",

        active
          ? [
              "border-brand-500",
              "bg-brand-500",
              "text-white",
            ].join(" ")
          : [
              "border-brand-100",
              "bg-white",
              "text-warm-700",
              "hover:border-brand-300",

              "dark:border-brand-900/50",
              "dark:bg-warm-900",
              "dark:text-cream-200",
            ].join(" "),
      ].join(" ")}
    >
      {icon}

      <span className="text-xs font-extrabold">
        {label}
      </span>
    </button>
  );
}