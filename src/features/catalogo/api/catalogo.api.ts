// src/features/catalogo/api/catalogo.api.ts
// src/features/catalogo/api/catalogo.api.ts

import type {
  CatalogoOpcionesResponse,
  CatalogoQueryParams,
  CatalogoResponse,
  ProductoDetalle,
} from "../types/catalogo.types";

const DEFAULT_API_URL =
  "http://127.0.0.1:8000/api";

const API_URL = (
  import.meta.env.VITE_API_URL
  ?? DEFAULT_API_URL
).replace(
  /\/$/,
  "",
);

function appendArrayParam(
  searchParams: URLSearchParams,
  name: string,
  values: string[],
) {
  if (values.length === 0) {
    return;
  }

  searchParams.set(
    name,
    values.join(","),
  );
}

function buildCatalogoSearchParams(
  params: CatalogoQueryParams,
) {
  const searchParams =
    new URLSearchParams();

  searchParams.set(
    "page",
    String(params.page),
  );

  const normalizedSearch =
    params.search.trim();

  if (normalizedSearch) {
    searchParams.set(
      "search",
      normalizedSearch,
    );
  }

  appendArrayParam(
    searchParams,
    "categoria",
    params.categorias,
  );

  appendArrayParam(
    searchParams,
    "coleccion",
    params.colecciones,
  );

  appendArrayParam(
    searchParams,
    "etiqueta",
    params.etiquetas,
  );

  appendArrayParam(
    searchParams,
    "material",
    params.materiales,
  );

  appendArrayParam(
    searchParams,
    "color",
    params.colores,
  );

  if (params.destacado) {
    searchParams.set(
      "destacado",
      "true",
    );
  }

  if (params.enOferta) {
    searchParams.set(
      "en_oferta",
      "true",
    );
  }

  if (params.precioMinimo) {
    searchParams.set(
      "precio_minimo",
      params.precioMinimo,
    );
  }

  if (params.precioMaximo) {
    searchParams.set(
      "precio_maximo",
      params.precioMaximo,
    );
  }

  if (params.orden) {
    searchParams.set(
      "orden",
      params.orden,
    );
  }

  return searchParams;
}

export async function obtenerProductosCatalogo(
  params: CatalogoQueryParams,
  signal?: AbortSignal,
): Promise<CatalogoResponse> {
  const searchParams =
    buildCatalogoSearchParams(
      params,
    );

  const response = await fetch(
    `${API_URL}/catalogo/productos/?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      "No fue posible obtener los productos.",
    );
  }

  const data: CatalogoResponse =
    await response.json();

  return data;
}

export async function obtenerOpcionesCatalogo(
  signal?: AbortSignal,
): Promise<CatalogoOpcionesResponse> {
  const response = await fetch(
    `${API_URL}/catalogo/opciones/`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      "No fue posible obtener los filtros.",
    );
  }

  const data: CatalogoOpcionesResponse =
    await response.json();

  return data;
}
export async function obtenerProductoDetalle(
  slug: string,
  signal?: AbortSignal,
): Promise<ProductoDetalle> {
  const response = await fetch(
    `${API_URL}/catalogo/productos/${encodeURIComponent(slug)}/`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    },
  );

  if (response.status === 404) {
    throw new Error(
      "El producto no existe o ya no está disponible.",
    );
  }

  if (!response.ok) {
    throw new Error(
      "No fue posible obtener el detalle del producto.",
    );
  }

  const data: ProductoDetalle =
    await response.json();

  return data;
}