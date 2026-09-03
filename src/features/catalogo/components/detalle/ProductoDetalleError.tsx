// src/features/catalogo/components/detalle/ProductoDetalleError.tsx

import {
  RefreshCw,
  TriangleAlert,
} from "lucide-react";


type ProductoDetalleErrorProps = {
  message: string;
  onRetry: () => void;
};


export default function ProductoDetalleError({
  message,
  onRetry,
}: ProductoDetalleErrorProps) {
  return (
    <div
      role="alert"
      className={[
        "flex min-h-[60dvh]",
        "flex-col items-center",
        "justify-center",
        "px-6 text-center",
      ].join(" ")}
    >
      <span
        className={[
          "flex size-14",
          "items-center",
          "justify-center",
          "rounded-2xl",
          "bg-brand-100",
          "text-brand-600",

          "dark:bg-brand-950/40",
          "dark:text-brand-200",
        ].join(" ")}
      >
        <TriangleAlert
          aria-hidden="true"
          className="size-6"
        />
      </span>

      <h1
        className={[
          "mt-4",
          "font-display",
          "text-2xl font-bold",
          "text-warm-900",
          "dark:text-cream-50",
        ].join(" ")}
      >
        No pudimos mostrar el producto
      </h1>

      <p
        className={[
          "mt-2 max-w-sm",
          "text-sm leading-6",
          "text-warm-700",
          "dark:text-cream-200",
        ].join(" ")}
      >
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
          "px-4 py-3",
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