// src/features/catalogo/utils/productoCompartir.utils.ts

import {
  appRoutes,
} from "@/app/router/routes";

import {
  formatCurrency,
} from "@/utils/formatters";

import type {
  ProductoDetalle,
} from "../types/catalogo.types";

import {
  getProductoPriceInfo,
} from "./producto.utils";


export type ProductoCompartirData = {
  titulo: string;
  mensaje: string;
  mensajeCompleto: string;
  enlace: string;

  whatsappUrl: string;
  facebookUrl: string;
  xUrl: string;
};


function getProductUrl(
  slug: string,
) {
  return (
    window.location.origin
    + appRoutes.productoDetalle(
      slug,
    )
  );
}


function buildProductMessage(
  producto: ProductoDetalle,
) {
  const {
    tieneOferta,
    precioFinal,
    precioAnterior,
  } = getProductoPriceInfo(
    producto,
  );

  const messageParts: string[] = [
    tieneOferta
      ? `Mira esta oferta: ${producto.nombre}`
      : `Mira este detalle: ${producto.nombre}`,
  ];


  if (
    producto.descripcion_corta
  ) {
    messageParts.push(
      producto.descripcion_corta,
    );
  }


  if (
    tieneOferta
    && precioFinal !== null
  ) {
    const priceParts: string[] = [];

    if (
      precioAnterior !== null
      && precioAnterior
        !== precioFinal
    ) {
      priceParts.push(
        `Antes: ${formatCurrency(
          precioAnterior,
        )}`,
      );
    }

    priceParts.push(
      `Ahora: ${formatCurrency(
        precioFinal,
      )}`,
    );

    messageParts.push(
      priceParts.join("\n"),
    );
  } else if (
    precioFinal !== null
  ) {
    messageParts.push(
      `Precio: ${formatCurrency(
        precioFinal,
      )}`,
    );
  }


  return messageParts.join(
    "\n\n",
  );
}


export function buildProductoCompartirData(
  producto: ProductoDetalle,
): ProductoCompartirData {
  const enlace =
    getProductUrl(
      producto.slug,
    );

  const mensaje =
    buildProductMessage(
      producto,
    );

  const mensajeCompleto = [
    mensaje,
    enlace,
  ].join("\n\n");


  const shortXMessage =
    producto.oferta.vigente
      ? `Mira esta oferta: ${producto.nombre}`
      : `Mira este detalle: ${producto.nombre}`;


  return {
    titulo:
      producto.nombre,

    mensaje,

    mensajeCompleto,

    enlace,

    whatsappUrl:
      "https://wa.me/?text="
      + encodeURIComponent(
        mensajeCompleto,
      ),

    facebookUrl:
      "https://www.facebook.com/sharer/sharer.php?u="
      + encodeURIComponent(
        enlace,
      ),

    xUrl:
      "https://x.com/intent/post?text="
      + encodeURIComponent(
        shortXMessage,
      )
      + "&url="
      + encodeURIComponent(
        enlace,
      ),
  };
}