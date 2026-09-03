// src/features/catalogo/components/CatalogoError.tsx

import {
  RefreshCw,
  TriangleAlert,
} from "lucide-react";


type CatalogoErrorProps = {
  message: string;
  onRetry: () => void;
};


export default function CatalogoError({
  message,
  onRetry,
}: CatalogoErrorProps) {
  return (
    <div
      role="alert"
      className={[
        "flex min-h-80",
        "flex-col items-center",
        "justify-center",
        "rounded-[2rem]",
        "border border-brand-200",
        "bg-brand-50/60",
        "px-6 text-center",

        "dark:border-brand-900/60",
        "dark:bg-brand-950/20",
      ].join(" ")}
    >
      <TriangleAlert
        aria-hidden="true"
        className="size-8 text-brand-600 dark:text-brand-300"
      />

      <h2 className="mt-4 font-display text-2xl font-bold text-warm-900 dark:text-cream-50">
        No pudimos cargar el catálogo
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-warm-700 dark:text-cream-200">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className={[
          "mt-5 inline-flex",
          "items-center gap-2",
          "rounded-xl",
          "bg-brand-600",
          "px-4 py-2.5",
          "text-sm font-bold",
          "text-white",
          "transition",

          "hover:bg-brand-700",
          "active:scale-95",

          "focus-visible:outline-2",
          "focus-visible:outline-offset-2",
          "focus-visible:outline-brand-500",
        ].join(" ")}
      >
        <RefreshCw
          aria-hidden="true"
          className="size-4"
        />

        Intentar nuevamente
      </button>
    </div>
  );
}