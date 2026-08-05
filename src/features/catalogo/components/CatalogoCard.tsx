// src/features/catalogo/components/CatalogoCard.tsx
import {
  Clock3,
  Heart,
  ImageOff,
  Sparkles,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import useFavoritos from "@/features/favoritos/hooks/useFavoritos";

import type {
  ProductoCatalogo,
} from "../types/catalogo.types";

type CatalogoCardProps = {
  producto: ProductoCatalogo;
};

const imageRatios = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/6]",
  "aspect-[5/6]",
];

function getImageRatio(
  productId: number,
) {
  return imageRatios[
    productId % imageRatios.length
  ];
}

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

function formatOfferEndDate(
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
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(date);
}

export default function CatalogoCard({
  producto,
}: CatalogoCardProps) {
  const {
    esFavorito,
    alternarFavorito,
  } = useFavoritos();

  const productIsFavorite = esFavorito(
    producto.id,
  );

  const productUrl =
    `/catalogo/productos/${producto.slug}`;

  const imageRatio = getImageRatio(
    producto.id,
  );

  const regularPrice = formatPrice(
    producto.precio_referencia,
  );

  const offerIsActive = Boolean(
    producto.oferta?.vigente
    && producto.oferta.precio_oferta,
  );

  const originalPrice = formatPrice(
    producto.oferta?.precio_original
    ?? producto.precio_referencia,
  );

  const offerPrice = formatPrice(
    producto.oferta?.precio_oferta
    ?? null,
  );

  const discount = formatDiscount(
    producto.oferta?.porcentaje_descuento
    ?? null,
  );

  const offerEndDate = formatOfferEndDate(
    producto.oferta?.finaliza_en
    ?? null,
  );

  return (
    <article className="group w-full overflow-hidden rounded-[1.25rem] border border-brand-100/80 bg-white shadow-soft transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card sm:rounded-[1.6rem] dark:border-brand-900/40 dark:bg-warm-800 dark:hover:border-brand-800">
      <div className="relative">
        <Link
          to={productUrl}
          aria-label={
            `Ver detalle de ${producto.nombre}`
          }
          className={[
            "relative block overflow-hidden",
            "bg-cream-100",
            imageRatio,
            "focus-visible:outline-2",
            "focus-visible:outline-offset-[-2px]",
            "focus-visible:outline-brand-500",
            "dark:bg-warm-900",
          ].join(" ")}
        >
          {producto.imagen_principal?.url ? (
            <img
              src={producto.imagen_principal.url}
              alt={
                producto.imagen_principal
                  .texto_alternativo
                || producto.nombre
              }
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-cream-200 dark:from-warm-800 dark:to-brand-950/30">
              <ImageOff className="size-8 text-brand-300 sm:size-10 dark:text-brand-800" />
            </div>
          )}

          {offerIsActive && (
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 sm:bottom-3 sm:left-3 sm:right-auto">
              <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full bg-brand-600 px-2 py-1 text-[0.6rem] font-extrabold text-white shadow-soft sm:px-3 sm:py-1.5 sm:text-xs">
                {discount !== null && (
                  <span className="rounded-full bg-white/20 px-1.5 py-0.5">
                    -{discount}%
                  </span>
                )}

                <span className="truncate">
                  {producto.oferta.texto
                    || "Oferta especial"}
                </span>
              </span>
            </div>
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-2 sm:p-3">
          {producto.destacado ? (
            <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[0.55rem] font-extrabold uppercase tracking-wide text-brand-700 shadow-sm backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[0.65rem] dark:bg-warm-900/85 dark:text-brand-200">
              <Sparkles className="size-3 shrink-0 sm:size-3.5" />

              <span className="truncate">
                Destacado
              </span>
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={() => {
              alternarFavorito(
                producto.id,
              );
            }}
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
              "pointer-events-auto flex size-8",
              "shrink-0 items-center justify-center",
              "rounded-full shadow-sm",
              "backdrop-blur-md transition",
              "active:scale-90 sm:size-9",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",
              productIsFavorite
                ? "bg-brand-600 text-white"
                : "bg-white/90 text-brand-600 hover:bg-brand-500 hover:text-white dark:bg-warm-900/85 dark:text-brand-200",
            ].join(" ")}
          >
            <Heart
              aria-hidden="true"
              className={[
                "size-3.5 sm:size-4",
                productIsFavorite
                  ? "fill-current"
                  : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <span className="inline-block max-w-full truncate rounded-full bg-brand-50 px-2 py-1 text-[0.55rem] font-extrabold uppercase tracking-wide text-brand-700 sm:px-2.5 sm:text-[0.65rem] dark:bg-brand-950/40 dark:text-brand-200">
          {producto.categoria.nombre}
        </span>

        <h2 className="mt-2 font-display text-base font-bold leading-snug text-warm-900 transition-colors group-hover:text-brand-700 sm:mt-3 sm:text-xl dark:text-cream-50 dark:group-hover:text-brand-200">
          <Link
            to={productUrl}
            className="line-clamp-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {producto.nombre}
          </Link>
        </h2>

        {producto.descripcion_corta && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-warm-700 sm:mt-2 sm:line-clamp-3 sm:text-sm sm:leading-6 dark:text-cream-200/80">
            {producto.descripcion_corta}
          </p>
        )}

        {offerIsActive && offerEndDate && (
          <div className="mt-2 flex min-w-0 items-center gap-1 text-[0.65rem] font-bold text-brand-700 sm:mt-3 sm:text-xs dark:text-brand-200">
            <Clock3 className="size-3 shrink-0 sm:size-3.5" />

            <span className="truncate">
              Termina {offerEndDate}
            </span>
          </div>
        )}

        <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-1 text-[0.65rem] font-semibold text-warm-700/70 sm:text-xs dark:text-cream-200/60">
            {producto.material && (
              <span className="truncate">
                {producto.material}
              </span>
            )}

            {producto.material
              && producto.color && (
                <span>·</span>
              )}

            {producto.color && (
              <span className="truncate">
                {producto.color}
              </span>
            )}
          </div>

          {offerIsActive && offerPrice ? (
            <div className="shrink-0 sm:text-right">
              {originalPrice && (
                <span className="mr-1.5 text-[0.65rem] font-semibold text-warm-700/45 line-through sm:mr-0 sm:block sm:text-xs dark:text-cream-200/40">
                  {originalPrice}
                </span>
              )}

              <span className="text-sm font-extrabold text-brand-700 sm:block sm:text-base dark:text-brand-200">
                {offerPrice}
              </span>
            </div>
          ) : (
            regularPrice && (
              <span className="shrink-0 text-sm font-extrabold text-brand-700 dark:text-brand-200">
                {regularPrice}
              </span>
            )
          )}
        </div>
      </div>
    </article>
  );
}