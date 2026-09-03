// src/app/router/routes.ts

export const appRoutes = {
  home: "/",
  catalogo: "/catalogo",

  productoDetallePattern:
    "/catalogo/productos/:slug",

  productoDetalle: (
    slug: string,
  ) =>
    `/catalogo/productos/${encodeURIComponent(slug)}`,
} as const;