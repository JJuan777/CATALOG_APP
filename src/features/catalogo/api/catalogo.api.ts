// src/features/catalogo/api/catalogo.api.ts

import {
  httpClient,
} from "@/lib/http/httpClient";

import {
  HttpError,
} from "@/lib/http/httpError";

import type {
  CatalogoOpcionesResponse,
  CatalogoQueryParams,
  CatalogoResponse,
  ProductoCatalogo,
  ProductoDetalle,
} from "../types/catalogo.types";

import {
  buildCatalogoSearchParams,
} from "../utils/catalogo.utils";


function buildProductoEndpoint(
  slug: string,
) {
  return (
    "/catalogo/productos/"
    + `${encodeURIComponent(slug)}/`
  );
}


export function obtenerProductosCatalogo(
  params: CatalogoQueryParams,
  signal?: AbortSignal,
) {
  const searchParams =
    buildCatalogoSearchParams(
      params,
    );

  return httpClient<CatalogoResponse>(
    `/catalogo/productos/?${searchParams.toString()}`,
    {
      method: "GET",
      signal,

      errorMessage:
        "No fue posible cargar el catálogo.",
    },
  );
}


export function obtenerOpcionesCatalogo(
  signal?: AbortSignal,
) {
  return httpClient<CatalogoOpcionesResponse>(
    "/catalogo/opciones/",
    {
      method: "GET",
      signal,

      errorMessage:
        "No fue posible cargar las opciones del catálogo.",
    },
  );
}


export async function obtenerProductoDetalle(
  slug: string,
  signal?: AbortSignal,
) {
  try {
    return await httpClient<ProductoDetalle>(
      buildProductoEndpoint(
        slug,
      ),
      {
        method: "GET",
        signal,

        errorMessage:
          "No fue posible cargar el producto.",
      },
    );
  } catch (error) {
    if (
      error instanceof HttpError
      && error.status === 404
    ) {
      throw new HttpError(
        "El producto solicitado no existe o ya no está disponible.",
        error.status,
        error.data,
      );
    }

    throw error;
  }
}


export async function obtenerProductosRelacionados(
  slug: string,
  signal?: AbortSignal,
) {
  try {
    return await httpClient<
      ProductoCatalogo[]
    >(
      `${
        buildProductoEndpoint(
          slug,
        )
      }relacionados/`,
      {
        method: "GET",
        signal,

        errorMessage:
          "No fue posible cargar los productos relacionados.",
      },
    );
  } catch (error) {
    if (
      error instanceof HttpError
      && error.status === 404
    ) {
      throw new HttpError(
        "No fue posible encontrar el producto para consultar sus relacionados.",
        error.status,
        error.data,
      );
    }

    throw error;
  }
}