// src/features/catalogo/components/detalle/ProductosRelacionadosSection.tsx

import {
  ArrowRight,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  appRoutes,
} from "@/app/router/routes";

import CatalogoCard
  from "../CatalogoCard";

import useProductosRelacionados
  from "../../hooks/useProductosRelacionados";


type ProductosRelacionadosSectionProps = {
  slug: string;
};


const RELATED_SKELETON_RATIOS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[5/6]",
] as const;


function ProductosRelacionadosSkeleton() {
  return (
    <div
      role="status"
      aria-label="Cargando productos relacionados"
      className={[
        "flex snap-x gap-3",
        "overflow-hidden",

        "lg:grid",
        "lg:grid-cols-4",
        "lg:gap-5",
      ].join(" ")}
    >
      {RELATED_SKELETON_RATIOS.map(
        (
          ratio,
          index,
        ) => (
          <div
            key={`${ratio}-${index}`}
            aria-hidden="true"
            className={[
              "w-[68vw]",
              "max-w-64",
              "shrink-0",
              "snap-start",
              "overflow-hidden",
              "rounded-[1.25rem]",
              "border",
              "border-brand-100",
              "bg-white",

              "sm:w-56",

              "lg:w-auto",
              "lg:max-w-none",

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

            <div className="space-y-3 p-3">
              <div
                className={[
                  "h-3 w-16",
                  "animate-pulse",
                  "rounded-full",
                  "bg-brand-100",
                  "dark:bg-brand-950/40",
                ].join(" ")}
              />

              <div
                className={[
                  "h-5 w-3/4",
                  "animate-pulse",
                  "rounded-full",
                  "bg-cream-300",
                  "dark:bg-warm-700",
                ].join(" ")}
              />

              <div
                className={[
                  "h-3 w-full",
                  "animate-pulse",
                  "rounded-full",
                  "bg-cream-200",
                  "dark:bg-warm-700",
                ].join(" ")}
              />
            </div>
          </div>
        ),
      )}

      <span className="sr-only">
        Cargando productos relacionados.
      </span>
    </div>
  );
}


export default function ProductosRelacionadosSection({
  slug,
}: ProductosRelacionadosSectionProps) {
  const {
    productos,
    loading,
    error,
    reload,
  } = useProductosRelacionados(
    slug,
  );


  if (
    !loading
    && !error
    && productos.length === 0
  ) {
    return null;
  }


  const hasProducts =
    productos.length > 0;


  return (
    <section
      aria-labelledby="productos-relacionados-titulo"
      className={[
        "mt-12",
        "border-t",
        "border-brand-100",
        "pt-8",
        "dark:border-brand-900/40",
      ].join(" ")}
    >
      <div
        className={[
          "mb-5 flex",
          "items-end",
          "justify-between",
          "gap-4",
        ].join(" ")}
      >
        <div>
          <span
            className={[
              "inline-flex",
              "items-center gap-1.5",
              "text-xs",
              "font-extrabold",
              "uppercase",
              "tracking-[0.15em]",
              "text-brand-600",
              "dark:text-brand-300",
            ].join(" ")}
          >
            <Sparkles
              aria-hidden="true"
              className="size-4"
            />

            Descubre más
          </span>

          <h2
            id="productos-relacionados-titulo"
            className={[
              "mt-1",
              "font-display",
              "text-2xl",
              "font-bold",
              "text-warm-900",

              "sm:text-3xl",

              "dark:text-cream-50",
            ].join(" ")}
          >
            También podrían encantarte
          </h2>
        </div>

        <Link
          to={appRoutes.catalogo}
          className={[
            "hidden",
            "items-center gap-1",
            "text-sm font-bold",
            "text-brand-700",
            "transition",
            "hover:text-brand-800",

            "sm:inline-flex",

            "focus-visible:outline-2",
            "focus-visible:outline-offset-2",
            "focus-visible:outline-brand-500",

            "dark:text-brand-200",
          ].join(" ")}
        >
          Ver catálogo

          <ArrowRight
            aria-hidden="true"
            className="size-4"
          />
        </Link>
      </div>

      {loading && (
        <ProductosRelacionadosSkeleton />
      )}

      {!loading && error && (
        <div
          role="alert"
          className={[
            "flex min-h-36",
            "flex-col",
            "items-center",
            "justify-center",
            "rounded-2xl",
            "border",
            "border-dashed",
            "border-brand-200",
            "bg-brand-50/50",
            "px-5",
            "text-center",

            "dark:border-brand-900/50",
            "dark:bg-brand-950/20",
          ].join(" ")}
        >
          <p
            className={[
              "text-sm",
              "font-medium",
              "text-warm-700",
              "dark:text-cream-200",
            ].join(" ")}
          >
            {error}
          </p>

          <button
            type="button"
            onClick={reload}
            className={[
              "mt-3",
              "inline-flex",
              "items-center gap-2",
              "rounded-xl",
              "px-4 py-2",
              "text-sm font-bold",
              "text-brand-700",
              "transition",
              "hover:bg-brand-100",

              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",

              "dark:text-brand-200",
              "dark:hover:bg-brand-950/40",
            ].join(" ")}
          >
            <RefreshCw
              aria-hidden="true"
              className="size-4"
            />

            Intentar nuevamente
          </button>
        </div>
      )}

      {!loading
        && !error
        && hasProducts && (
          <div
            aria-label="Productos relacionados"
            className={[
              "-mx-4",
              "flex",
              "snap-x",
              "snap-mandatory",
              "gap-3",
              "overflow-x-auto",
              "px-4",
              "pb-4",

              "sm:-mx-6",
              "sm:px-6",

              "lg:mx-0",
              "lg:grid",
              "lg:grid-cols-4",
              "lg:gap-5",
              "lg:overflow-visible",
              "lg:px-0",
            ].join(" ")}
          >
            {productos.map(
              (producto) => (
                <div
                  key={producto.id}
                  className={[
                    "w-[68vw]",
                    "max-w-64",
                    "shrink-0",
                    "snap-start",

                    "sm:w-56",

                    "lg:w-auto",
                    "lg:max-w-none",
                  ].join(" ")}
                >
                  <CatalogoCard
                    producto={producto}
                  />
                </div>
              ),
            )}
          </div>
        )}

      {!loading
        && !error
        && hasProducts && (
          <Link
            to={appRoutes.catalogo}
            className={[
              "mt-2",
              "flex h-11",
              "w-full",
              "items-center",
              "justify-center",
              "gap-2",
              "rounded-xl",
              "border",
              "border-brand-200",
              "bg-white",
              "text-sm font-bold",
              "text-brand-700",

              "sm:hidden",

              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",

              "dark:border-brand-900/60",
              "dark:bg-warm-800",
              "dark:text-brand-200",
            ].join(" ")}
          >
            Ver todo el catálogo

            <ArrowRight
              aria-hidden="true"
              className="size-4"
            />
          </Link>
        )}
    </section>
  );
}