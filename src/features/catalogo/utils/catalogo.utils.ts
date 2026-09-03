// src/features/catalogo/utils/catalogo.utils.ts

import type {
  CatalogoFiltersState,
  CatalogoQueryParams,
} from "../types/catalogo.types";


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


function appendOptionalParam(
  searchParams: URLSearchParams,
  name: string,
  value: string,
) {
  const normalizedValue =
    value.trim();

  if (!normalizedValue) {
    return;
  }

  searchParams.set(
    name,
    normalizedValue,
  );
}


export function buildCatalogoSearchParams(
  params: CatalogoQueryParams,
) {
  const searchParams =
    new URLSearchParams();

  searchParams.set(
    "page",
    String(params.page),
  );

  appendOptionalParam(
    searchParams,
    "search",
    params.search,
  );

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

  appendOptionalParam(
    searchParams,
    "precio_minimo",
    params.precioMinimo,
  );

  appendOptionalParam(
    searchParams,
    "precio_maximo",
    params.precioMaximo,
  );

  appendOptionalParam(
    searchParams,
    "orden",
    params.orden,
  );

  return searchParams.toString();
}


export function countActiveCatalogoFilters(
  filters: CatalogoFiltersState,
) {
  return (
    filters.categorias.length
    + filters.colecciones.length
    + filters.etiquetas.length
    + filters.materiales.length
    + filters.colores.length
    + Number(filters.destacado)
    + Number(filters.enOferta)
    + Number(Boolean(
      filters.precioMinimo,
    ))
    + Number(Boolean(
      filters.precioMaximo,
    ))
  );
}