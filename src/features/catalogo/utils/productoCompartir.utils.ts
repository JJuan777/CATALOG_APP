// src/features/catalogo/utils/productoCompartir.utils.ts
import type {
  ProductoDetalle,
} from "../types/catalogo.types";

export type ProductoCompartirData = {
  titulo: string;
  mensaje: string;
  mensajeCompleto: string;
  enlace: string;
  whatsappUrl: string;
  facebookUrl: string;
  xUrl: string;
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

function getProductUrl(
  slug: string,
) {
  const encodedSlug =
    encodeURIComponent(slug);

  return (
    `${window.location.origin}`
    + `/catalogo/productos/${encodedSlug}`
  );
}

function buildProductMessage(
  producto: ProductoDetalle,
) {
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

  const messageParts = [
    hasOffer
      ? `Mira esta oferta: ${producto.nombre}`
      : `Mira este detalle: ${producto.nombre}`,
  ];

  if (producto.descripcion_corta) {
    messageParts.push(
      producto.descripcion_corta,
    );
  }

  if (
    hasOffer
    && originalPrice
    && offerPrice
  ) {
    messageParts.push(
      `Antes: ${originalPrice}\nAhora: ${offerPrice}`,
    );
  } else if (regularPrice) {
    messageParts.push(
      `Precio: ${regularPrice}`,
    );
  }

  return messageParts.join(
    "\n\n",
  );
}

export function buildProductoCompartirData(
  producto: ProductoDetalle,
): ProductoCompartirData {
  const enlace = getProductUrl(
    producto.slug,
  );

  const mensaje = buildProductMessage(
    producto,
  );

  const mensajeCompleto = [
    mensaje,
    enlace,
  ].join(
    "\n\n",
  );

  const shortXMessage = producto.oferta.vigente
    ? `Mira esta oferta: ${producto.nombre}`
    : `Mira este detalle: ${producto.nombre}`;

  return {
    titulo: producto.nombre,
    mensaje,
    mensajeCompleto,
    enlace,
    whatsappUrl: (
      "https://wa.me/?text="
      + encodeURIComponent(
        mensajeCompleto,
      )
    ),
    facebookUrl: (
      "https://www.facebook.com/sharer/sharer.php?u="
      + encodeURIComponent(
        enlace,
      )
    ),
    xUrl: (
      "https://x.com/intent/post?text="
      + encodeURIComponent(
        shortXMessage,
      )
      + "&url="
      + encodeURIComponent(
        enlace,
      )
    ),
  };
}