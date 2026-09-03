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

import {
  appRoutes,
} from "@/app/router/routes";

import useFavoritos
  from "@/features/favoritos/hooks/useFavoritos";

import {
  formatCurrency,
  formatPercentage,
  formatShortDate,
} from "@/utils/formatters";

import type {
  ProductoCatalogo,
} from "../types/catalogo.types";

import {
  getProductoImageRatio,
  getProductoPriceInfo,
} from "../utils/producto.utils";


type CatalogoCardProps = {
  producto: ProductoCatalogo;
};


export default function CatalogoCard({
  producto,
}: CatalogoCardProps) {
  const {
    esFavorito,
    alternarFavorito,
  } = useFavoritos();

  const isFavorite =
    esFavorito(
      producto.id,
    );

  const productUrl =
    appRoutes.productoDetalle(
      producto.slug,
    );

  const imageRatio =
    getProductoImageRatio(
      producto.id,
    );

  const {
    precioFinal,
    precioAnterior,
    tieneOferta,
    porcentajeDescuento,
    fechaFinOferta,
    textoOferta,
  } = getProductoPriceInfo(
    producto,
  );

  const imagenPrincipal =
    producto.imagen_principal;

  const hasImage =
    Boolean(
      imagenPrincipal?.url,
    );


  function handleFavoriteClick() {
    alternarFavorito(
      producto.id,
    );
  }


  return (
    <article
      className={[
        "group overflow-hidden",
        "rounded-[1.25rem]",
        "border border-brand-100",
        "bg-white",
        "shadow-sm",
        "transition",

        "hover:-translate-y-0.5",
        "hover:shadow-soft",

        "sm:rounded-[1.6rem]",

        "dark:border-brand-900/40",
        "dark:bg-warm-800",
      ].join(" ")}
    >
      <div className="relative">
        <Link
          to={productUrl}
          aria-label={`Ver ${producto.nombre}`}
          className="block"
        >
          <div
            className={[
              imageRatio,
              "overflow-hidden",
              "bg-cream-100",
              "dark:bg-warm-900",
            ].join(" ")}
          >
            {hasImage ? (
              <img
                src={
                  imagenPrincipal
                    ?.url
                    ?? undefined
                }
                alt={
                  imagenPrincipal
                    ?.texto_alternativo
                  || producto.nombre
                }
                loading="lazy"
                className={[
                  "size-full",
                  "object-cover",
                  "transition",
                  "duration-500",

                  "group-hover:scale-[1.03]",
                ].join(" ")}
              />
            ) : (
              <div
                className={[
                  "flex size-full",
                  "items-center",
                  "justify-center",
                  "text-brand-300",
                  "dark:text-brand-800",
                ].join(" ")}
              >
                <ImageOff
                  aria-hidden="true"
                  className="size-8"
                />
              </div>
            )}
          </div>
        </Link>

        <button
          type="button"
          onClick={
            handleFavoriteClick
          }
          aria-pressed={
            isFavorite
          }
          aria-label={
            isFavorite
              ? `Quitar ${producto.nombre} de favoritos`
              : `Agregar ${producto.nombre} a favoritos`
          }
          className={[
            "absolute right-3 top-3",
            "flex size-9",
            "items-center",
            "justify-center",
            "rounded-full",
            "backdrop-blur-md",
            "transition",
            "active:scale-90",

            "focus-visible:outline-2",
            "focus-visible:outline-offset-2",
            "focus-visible:outline-brand-500",

            isFavorite
              ? [
                  "bg-brand-600",
                  "text-white",
                ].join(" ")
              : [
                  "bg-white/90",
                  "text-warm-700",
                  "hover:text-brand-600",

                  "dark:bg-warm-900/80",
                  "dark:text-cream-200",
                ].join(" "),
          ].join(" ")}
        >
          <Heart
            aria-hidden="true"
            className={[
              "size-4",
              isFavorite
                ? "fill-current"
                : "",
            ].join(" ")}
          />
        </button>

        {tieneOferta && (
          <span
            className={[
              "absolute left-3 top-3",
              "inline-flex",
              "items-center gap-1",
              "rounded-full",
              "bg-brand-600",
              "px-2.5 py-1",
              "text-[0.65rem]",
              "font-extrabold",
              "text-white",
              "shadow-sm",
            ].join(" ")}
          >
            <Sparkles
              aria-hidden="true"
              className="size-3"
            />

            {porcentajeDescuento
              !== null
              ? `${formatPercentage(
                  porcentajeDescuento,
                )} OFF`
              : (
                  textoOferta
                  || "Oferta"
                )}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <p
          className={[
            "text-[0.65rem]",
            "font-extrabold",
            "uppercase",
            "tracking-[0.14em]",
            "text-brand-600",
            "dark:text-brand-300",
          ].join(" ")}
        >
          {
            producto
              .categoria
              .nombre
          }
        </p>

        <Link
          to={productUrl}
          className="group/title"
        >
          <h2
            className={[
              "mt-1",
              "font-display",
              "text-lg font-bold",
              "leading-tight",
              "text-warm-900",
              "transition",

              "group-hover/title:text-brand-700",

              "dark:text-cream-50",
              "dark:group-hover/title:text-brand-200",
            ].join(" ")}
          >
            {producto.nombre}
          </h2>
        </Link>

        {producto.descripcion_corta && (
          <p
            className={[
              "mt-2",
              "line-clamp-2",
              "text-xs",
              "leading-5",
              "text-warm-700",
              "dark:text-cream-200/80",
            ].join(" ")}
          >
            {
              producto
                .descripcion_corta
            }
          </p>
        )}

        {tieneOferta
          && fechaFinOferta && (
          <div
            className={[
              "mt-3 flex",
              "items-center gap-1.5",
              "text-[0.65rem]",
              "font-bold",
              "text-brand-600",
              "dark:text-brand-300",
            ].join(" ")}
          >
            <Clock3
              aria-hidden="true"
              className="size-3.5"
            />

            <span>
              Oferta hasta{" "}
              {formatShortDate(
                fechaFinOferta,
              )}
            </span>
          </div>
        )}

        {(producto.material
          || producto.color) && (
          <p
            className={[
              "mt-3",
              "text-[0.7rem]",
              "font-semibold",
              "text-warm-500",
              "dark:text-cream-300/60",
            ].join(" ")}
          >
            {[
              producto.material,
              producto.color,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}

        <div className="mt-3">
          {precioFinal !== null ? (
            <div className="flex flex-wrap items-baseline gap-2">
              <span
                className={[
                  "text-base",
                  "font-extrabold",

                  tieneOferta
                    ? [
                        "text-brand-600",
                        "dark:text-brand-300",
                      ].join(" ")
                    : [
                        "text-warm-900",
                        "dark:text-cream-50",
                      ].join(" "),
                ].join(" ")}
              >
                {formatCurrency(
                  precioFinal,
                )}
              </span>

              {precioAnterior
                !== null
                && precioAnterior
                  !== precioFinal && (
                <span
                  className={[
                    "text-xs",
                    "font-semibold",
                    "text-warm-400",
                    "line-through",
                    "dark:text-cream-300/50",
                  ].join(" ")}
                >
                  {formatCurrency(
                    precioAnterior,
                  )}
                </span>
              )}
            </div>
          ) : (
            <span
              className={[
                "text-xs",
                "font-semibold",
                "text-warm-500",
                "dark:text-cream-300/60",
              ].join(" ")}
            >
              Precio no disponible
            </span>
          )}
        </div>
      </div>
    </article>
  );
}