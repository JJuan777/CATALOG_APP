// src/features/catalogo/components/detalle/ProductoDetalleInfo.tsx

import {
  BadgePercent,
  Box,
  Clock3,
  Heart,
  Maximize2,
  Palette,
  Sparkles,
  Weight,
} from "lucide-react";

import useFavoritos
  from "@/features/favoritos/hooks/useFavoritos";

import {
  formatCurrency,
  formatPercentage,
  formatShortDate,
} from "@/utils/formatters";

import type {
  ProductoDetalle,
} from "../../types/catalogo.types";

import {
  getProductoPriceInfo,
} from "../../utils/producto.utils";

import ProductoCompartirButton
  from "./ProductoCompartirButton";


type ProductoDetalleInfoProps = {
  producto: ProductoDetalle;
};


type CaracteristicaCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};


function CaracteristicaCard({
  icon,
  label,
  value,
}: CaracteristicaCardProps) {
  return (
    <div
      className={[
        "rounded-2xl",
        "bg-white p-4",
        "shadow-soft",
        "dark:bg-warm-800",
      ].join(" ")}
    >
      {icon}

      <span
        className={[
          "mt-3 block",
          "text-xs font-bold",
          "text-warm-700/60",
          "dark:text-cream-200/50",
        ].join(" ")}
      >
        {label}
      </span>

      <strong
        className={[
          "mt-1 block",
          "text-sm",
          "text-warm-900",
          "dark:text-cream-50",
        ].join(" ")}
      >
        {value}
      </strong>
    </div>
  );
}


export default function ProductoDetalleInfo({
  producto,
}: ProductoDetalleInfoProps) {
  const {
    esFavorito,
    alternarFavorito,
  } = useFavoritos();

  const productIsFavorite =
    esFavorito(producto.id);

  const {
    tieneOferta,
    precioFinal,
    precioAnterior,
    porcentajeDescuento,
    fechaFinOferta,
    textoOferta,
  } = getProductoPriceInfo(
    producto,
  );


  function handleToggleFavorite() {
    alternarFavorito(
      producto.id,
    );
  }


  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={[
            "rounded-full",
            "bg-brand-100",
            "px-3 py-1.5",
            "text-xs font-extrabold",
            "uppercase tracking-wider",
            "text-brand-700",

            "dark:bg-brand-950/50",
            "dark:text-brand-200",
          ].join(" ")}
        >
          {producto.categoria.nombre}
        </span>

        {producto.coleccion && (
          <span
            className={[
              "rounded-full",
              "border border-brand-100",
              "px-3 py-1.5",
              "text-xs font-bold",
              "text-warm-700",

              "dark:border-brand-900/50",
              "dark:text-cream-200",
            ].join(" ")}
          >
            {producto.coleccion.nombre}
          </span>
        )}

        {producto.destacado && (
          <span
            className={[
              "inline-flex items-center gap-1",
              "rounded-full",
              "bg-cream-200",
              "px-3 py-1.5",
              "text-xs font-bold",
              "text-brand-700",

              "dark:bg-warm-700",
              "dark:text-brand-200",
            ].join(" ")}
          >
            <Sparkles
              aria-hidden="true"
              className="size-3.5"
            />

            Destacado
          </span>
        )}
      </div>

      <div
        className={[
          "mt-4 flex",
          "items-start",
          "justify-between",
          "gap-4",
        ].join(" ")}
      >
        <div className="min-w-0">
          <h1
            className={[
              "font-display",
              "text-3xl font-bold",
              "leading-tight",
              "text-warm-900",

              "sm:text-4xl",
              "dark:text-cream-50",
            ].join(" ")}
          >
            {producto.nombre}
          </h1>

          {producto.codigo && (
            <p
              className={[
                "mt-2",
                "text-xs font-bold",
                "uppercase tracking-wider",
                "text-warm-700/50",
                "dark:text-cream-200/40",
              ].join(" ")}
            >
              {producto.codigo}
            </p>
          )}
        </div>

        <div
          className={[
            "flex shrink-0",
            "items-center gap-2",
          ].join(" ")}
        >
          <ProductoCompartirButton
            producto={producto}
          />

          <button
            type="button"
            onClick={
              handleToggleFavorite
            }
            aria-label={
              productIsFavorite
                ? `Eliminar ${producto.nombre} de favoritos`
                : `Agregar ${producto.nombre} a favoritos`
            }
            aria-pressed={
              productIsFavorite
            }
            title={
              productIsFavorite
                ? "Eliminar de favoritos"
                : "Agregar a favoritos"
            }
            className={[
              "flex size-11",
              "shrink-0",
              "items-center",
              "justify-center",
              "rounded-full border",
              "shadow-sm",
              "transition duration-200",
              "active:scale-90",

              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",

              productIsFavorite
                ? [
                    "border-brand-600",
                    "bg-brand-600",
                    "text-white",
                    "hover:bg-brand-700",
                  ].join(" ")
                : [
                    "border-brand-100",
                    "bg-white",
                    "text-brand-600",
                    "hover:border-brand-300",
                    "hover:bg-brand-50",

                    "dark:border-brand-900/50",
                    "dark:bg-warm-800",
                    "dark:text-brand-200",
                    "dark:hover:bg-brand-950/30",
                  ].join(" "),
            ].join(" ")}
          >
            <Heart
              aria-hidden="true"
              className={[
                "size-5",
                "transition-transform",

                productIsFavorite
                  ? "scale-105 fill-current"
                  : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {producto.descripcion_corta && (
        <p
          className={[
            "mt-4",
            "text-base leading-7",
            "text-warm-700",
            "dark:text-cream-200",
          ].join(" ")}
        >
          {producto.descripcion_corta}
        </p>
      )}

      {tieneOferta ? (
        <section
          aria-label="Oferta del producto"
          className={[
            "mt-6",
            "rounded-2xl border",
            "border-brand-200",
            "bg-brand-50",
            "p-4",

            "dark:border-brand-900/60",
            "dark:bg-brand-950/25",
          ].join(" ")}
        >
          <div
            className={[
              "flex items-start",
              "justify-between",
              "gap-4",
            ].join(" ")}
          >
            <div className="min-w-0">
              <span
                className={[
                  "inline-flex",
                  "items-center gap-1.5",
                  "text-xs font-extrabold",
                  "uppercase tracking-wider",
                  "text-brand-700",
                  "dark:text-brand-200",
                ].join(" ")}
              >
                <BadgePercent
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />

                <span className="truncate">
                  {textoOferta
                    || "Oferta especial"}
                </span>
              </span>

              <div
                className={[
                  "mt-2 flex",
                  "flex-wrap",
                  "items-baseline",
                  "gap-2",
                ].join(" ")}
              >
                {precioFinal !== null && (
                  <span
                    className={[
                      "font-display",
                      "text-3xl font-bold",
                      "text-brand-700",
                      "dark:text-brand-200",
                    ].join(" ")}
                  >
                    {formatCurrency(
                      precioFinal,
                    )}
                  </span>
                )}

                {precioAnterior !== null
                  && precioAnterior !== precioFinal && (
                  <span
                    className={[
                      "text-sm font-semibold",
                      "text-warm-700/50",
                      "line-through",
                      "dark:text-cream-200/40",
                    ].join(" ")}
                  >
                    {formatCurrency(
                      precioAnterior,
                    )}
                  </span>
                )}
              </div>
            </div>

            {porcentajeDescuento
              !== null && (
              <span
                className={[
                  "shrink-0",
                  "rounded-xl",
                  "bg-brand-600",
                  "px-3 py-2",
                  "text-sm font-extrabold",
                  "text-white",
                ].join(" ")}
              >
                -
                {formatPercentage(
                  porcentajeDescuento,
                )}
              </span>
            )}
          </div>

          {fechaFinOferta && (
            <p
              className={[
                "mt-3 flex",
                "items-center gap-2",
                "text-xs font-bold",
                "text-brand-700",
                "dark:text-brand-200",
              ].join(" ")}
            >
              <Clock3
                aria-hidden="true"
                className="size-4 shrink-0"
              />

              <span>
                Termina el{" "}
                {formatShortDate(
                  fechaFinOferta,
                )}
              </span>
            </p>
          )}
        </section>
      ) : (
        precioFinal !== null && (
          <p
            className={[
              "mt-6",
              "font-display",
              "text-3xl font-bold",
              "text-brand-700",
              "dark:text-brand-200",
            ].join(" ")}
          >
            {formatCurrency(
              precioFinal,
            )}
          </p>
        )
      )}

      <section className="mt-7">
        <h2
          className={[
            "font-display",
            "text-xl font-bold",
            "text-warm-900",
            "dark:text-cream-50",
          ].join(" ")}
        >
          Características
        </h2>

        <div
          className={[
            "mt-4 grid",
            "grid-cols-2",
            "gap-3",
          ].join(" ")}
        >
          {producto.material && (
            <CaracteristicaCard
              icon={
                <Box
                  aria-hidden="true"
                  className="size-5 text-brand-500"
                />
              }
              label="Material"
              value={producto.material}
            />
          )}

          {producto.color && (
            <CaracteristicaCard
              icon={
                <Palette
                  aria-hidden="true"
                  className="size-5 text-brand-500"
                />
              }
              label="Color"
              value={producto.color}
            />
          )}

          {producto.dimensiones && (
            <CaracteristicaCard
              icon={
                <Maximize2
                  aria-hidden="true"
                  className="size-5 text-brand-500"
                />
              }
              label="Dimensiones"
              value={
                producto.dimensiones
              }
            />
          )}

          {producto.peso && (
            <CaracteristicaCard
              icon={
                <Weight
                  aria-hidden="true"
                  className="size-5 text-brand-500"
                />
              }
              label="Peso"
              value={`${producto.peso} kg`}
            />
          )}
        </div>
      </section>

      {producto.descripcion && (
        <section className="mt-7">
          <h2
            className={[
              "font-display",
              "text-xl font-bold",
              "text-warm-900",
              "dark:text-cream-50",
            ].join(" ")}
          >
            Acerca de esta pieza
          </h2>

          <p
            className={[
              "mt-3",
              "whitespace-pre-line",
              "text-sm leading-7",
              "text-warm-700",
              "dark:text-cream-200/80",
            ].join(" ")}
          >
            {producto.descripcion}
          </p>
        </section>
      )}

      {producto.etiquetas.length > 0 && (
        <section
          aria-label="Etiquetas del producto"
          className="mt-7"
        >
          <div className="flex flex-wrap gap-2">
            {producto.etiquetas.map(
              (etiqueta) => (
                <span
                  key={etiqueta.id}
                  className={[
                    "rounded-full",
                    "border border-brand-100",
                    "bg-white",
                    "px-3 py-1.5",
                    "text-xs font-bold",
                    "text-brand-700",

                    "dark:border-brand-900/50",
                    "dark:bg-warm-800",
                    "dark:text-brand-200",
                  ].join(" ")}
                >
                  #{etiqueta.nombre}
                </span>
              ),
            )}
          </div>
        </section>
      )}
    </div>
  );
}