// src/features/catalogo/utils/producto.utils.ts

import type {
  ProductoCatalogo,
} from "../types/catalogo.types";


const IMAGE_RATIOS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[5/6]",
] as const;


function parseNumericValue(
  value:
    | string
    | number
    | null
    | undefined,
): number | null {
  if (
    value === null
    || value === undefined
    || value === ""
  ) {
    return null;
  }

  const parsedValue =
    typeof value === "number"
      ? value
      : Number(value);

  return Number.isFinite(
    parsedValue,
  )
    ? parsedValue
    : null;
}


export function getProductoImageRatio(
  productoId: number,
) {
  const index =
    Math.abs(productoId)
    % IMAGE_RATIOS.length;

  return IMAGE_RATIOS[index];
}


export function getProductoPriceInfo(
  producto: ProductoCatalogo,
) {
  const precioReferencia =
    parseNumericValue(
      producto.precio_referencia,
    );

  const precioOriginal =
    parseNumericValue(
      producto.oferta
        .precio_original,
    );

  const precioOferta =
    parseNumericValue(
      producto.oferta
        .precio_oferta,
    );

  const precioActual =
    parseNumericValue(
      producto.oferta
        .precio_actual,
    );

  const porcentajeDescuento =
    parseNumericValue(
      producto.oferta
        .porcentaje_descuento,
    );

  const tieneOferta =
    producto.oferta.vigente;

  const precioFinal =
    tieneOferta
      ? (
          precioActual
          ?? precioOferta
          ?? precioReferencia
        )
      : (
          precioActual
          ?? precioReferencia
        );

  const precioAnterior =
    tieneOferta
      ? (
          precioOriginal
          ?? precioReferencia
        )
      : null;

  return {
    tieneOferta,

    precioReferencia,

    precioOriginal,

    precioOferta,

    precioActual,

    precioFinal,

    precioAnterior,

    porcentajeDescuento,

    fechaInicioOferta:
      producto.oferta
        .inicia_en,

    fechaFinOferta:
      producto.oferta
        .finaliza_en,

    textoOferta:
      producto.oferta.texto,
  };
}