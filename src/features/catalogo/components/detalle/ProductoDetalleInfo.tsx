// src/features/catalogo/components/detalle/ProductoDetalleInfo.tsx
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

import useFavoritos from "@/features/favoritos/hooks/useFavoritos";

import type {
  ProductoDetalle,
} from "../../types/catalogo.types";

type ProductoDetalleInfoProps = {
  producto: ProductoDetalle;
};

function formatPrice(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  const price = Number(value);

  if (Number.isNaN(price)) {
    return null;
  }

  return new Intl.NumberFormat(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
    },
  ).format(price);
}

function formatDate(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "es-MX",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}

function formatDiscount(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  const discount = Number(value);

  if (Number.isNaN(discount)) {
    return null;
  }

  return Math.round(
    discount,
  );
}

export default function ProductoDetalleInfo({
  producto,
}: ProductoDetalleInfoProps) {
  const {
    esFavorito,
    alternarFavorito,
  } = useFavoritos();

  const productIsFavorite = esFavorito(
    producto.id,
  );

  const hasOffer = Boolean(
    producto.oferta.vigente
    && producto.oferta.precio_oferta,
  );

  const regularPrice = formatPrice(
    producto.precio_referencia,
  );

  const originalPrice = formatPrice(
    producto.oferta.precio_original,
  );

  const offerPrice = formatPrice(
    producto.oferta.precio_oferta,
  );

  const offerEnd = formatDate(
    producto.oferta.finaliza_en,
  );

  const discount = formatDiscount(
    producto.oferta
      .porcentaje_descuento,
  );

  function handleToggleFavorite() {
    alternarFavorito(
      producto.id,
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-100 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700 dark:bg-brand-950/50 dark:text-brand-200">
          {producto.categoria.nombre}
        </span>

        {producto.coleccion && (
          <span className="rounded-full border border-brand-100 px-3 py-1.5 text-xs font-bold text-warm-700 dark:border-brand-900/50 dark:text-cream-200">
            {producto.coleccion.nombre}
          </span>
        )}

        {producto.destacado && (
          <span className="inline-flex items-center gap-1 rounded-full bg-cream-200 px-3 py-1.5 text-xs font-bold text-brand-700 dark:bg-warm-700 dark:text-brand-200">
            <Sparkles
              aria-hidden="true"
              className="size-3.5"
            />

            Destacado
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold leading-tight text-warm-900 sm:text-4xl dark:text-cream-50">
            {producto.nombre}
          </h1>

          {producto.codigo && (
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-warm-700/50 dark:text-cream-200/40">
              {producto.codigo}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={
            productIsFavorite
              ? `Eliminar ${producto.nombre} de favoritos`
              : `Agregar ${producto.nombre} a favoritos`
          }
          aria-pressed={productIsFavorite}
          title={
            productIsFavorite
              ? "Eliminar de favoritos"
              : "Agregar a favoritos"
          }
          className={[
            "flex size-11 shrink-0",
            "items-center justify-center",
            "rounded-full border shadow-sm",
            "transition duration-200",
            "active:scale-90",
            "focus-visible:outline-2",
            "focus-visible:outline-offset-2",
            "focus-visible:outline-brand-500",
            productIsFavorite
              ? [
                  "border-brand-600",
                  "bg-brand-600 text-white",
                  "hover:bg-brand-700",
                ].join(" ")
              : [
                  "border-brand-100",
                  "bg-white text-brand-600",
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

      {producto.descripcion_corta && (
        <p className="mt-4 text-base leading-7 text-warm-700 dark:text-cream-200">
          {producto.descripcion_corta}
        </p>
      )}

      {hasOffer ? (
        <section className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-900/60 dark:bg-brand-950/25">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-200">
                <BadgePercent
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />

                <span className="truncate">
                  {producto.oferta.texto
                    || "Oferta especial"}
                </span>
              </span>

              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                {offerPrice && (
                  <span className="font-display text-3xl font-bold text-brand-700 dark:text-brand-200">
                    {offerPrice}
                  </span>
                )}

                {originalPrice && (
                  <span className="text-sm font-semibold text-warm-700/50 line-through dark:text-cream-200/40">
                    {originalPrice}
                  </span>
                )}
              </div>
            </div>

            {discount !== null && (
              <span className="shrink-0 rounded-xl bg-brand-600 px-3 py-2 text-sm font-extrabold text-white">
                -{discount}%
              </span>
            )}
          </div>

          {offerEnd && (
            <p className="mt-3 flex items-center gap-2 text-xs font-bold text-brand-700 dark:text-brand-200">
              <Clock3
                aria-hidden="true"
                className="size-4 shrink-0"
              />

              <span>
                Termina el {offerEnd}
              </span>
            </p>
          )}
        </section>
      ) : (
        regularPrice && (
          <p className="mt-6 font-display text-3xl font-bold text-brand-700 dark:text-brand-200">
            {regularPrice}
          </p>
        )
      )}

      <section className="mt-7">
        <h2 className="font-display text-xl font-bold text-warm-900 dark:text-cream-50">
          Características
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {producto.material && (
            <div className="rounded-2xl bg-white p-4 shadow-soft dark:bg-warm-800">
              <Box
                aria-hidden="true"
                className="size-5 text-brand-500"
              />

              <span className="mt-3 block text-xs font-bold text-warm-700/60 dark:text-cream-200/50">
                Material
              </span>

              <strong className="mt-1 block text-sm text-warm-900 dark:text-cream-50">
                {producto.material}
              </strong>
            </div>
          )}

          {producto.color && (
            <div className="rounded-2xl bg-white p-4 shadow-soft dark:bg-warm-800">
              <Palette
                aria-hidden="true"
                className="size-5 text-brand-500"
              />

              <span className="mt-3 block text-xs font-bold text-warm-700/60 dark:text-cream-200/50">
                Color
              </span>

              <strong className="mt-1 block text-sm text-warm-900 dark:text-cream-50">
                {producto.color}
              </strong>
            </div>
          )}

          {producto.dimensiones && (
            <div className="rounded-2xl bg-white p-4 shadow-soft dark:bg-warm-800">
              <Maximize2
                aria-hidden="true"
                className="size-5 text-brand-500"
              />

              <span className="mt-3 block text-xs font-bold text-warm-700/60 dark:text-cream-200/50">
                Dimensiones
              </span>

              <strong className="mt-1 block text-sm text-warm-900 dark:text-cream-50">
                {producto.dimensiones}
              </strong>
            </div>
          )}

          {producto.peso && (
            <div className="rounded-2xl bg-white p-4 shadow-soft dark:bg-warm-800">
              <Weight
                aria-hidden="true"
                className="size-5 text-brand-500"
              />

              <span className="mt-3 block text-xs font-bold text-warm-700/60 dark:text-cream-200/50">
                Peso
              </span>

              <strong className="mt-1 block text-sm text-warm-900 dark:text-cream-50">
                {producto.peso} kg
              </strong>
            </div>
          )}
        </div>
      </section>

      {producto.descripcion && (
        <section className="mt-7">
          <h2 className="font-display text-xl font-bold text-warm-900 dark:text-cream-50">
            Acerca de esta pieza
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-warm-700 dark:text-cream-200/80">
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
                  className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-bold text-brand-700 dark:border-brand-900/50 dark:bg-warm-800 dark:text-brand-200"
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