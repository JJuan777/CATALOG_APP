// src/features/catalogo/hooks/useCatalogo.ts

import {
  useEffect,
  useState,
} from "react";

import {
  obtenerProductosCatalogo,
} from "../api/catalogo.api";

import type {
  CatalogoPaginacion,
  CatalogoQueryParams,
  ProductoCatalogo,
} from "../types/catalogo.types";


function isAbortError(
  error: unknown,
) {
  return (
    error instanceof DOMException
    && error.name === "AbortError"
  );
}


export default function useCatalogo(
  params: CatalogoQueryParams,
) {
  const [
    productos,
    setProductos,
  ] = useState<ProductoCatalogo[]>([]);

  const [
    paginacion,
    setPaginacion,
  ] = useState<CatalogoPaginacion | null>(
    null,
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const [
    reloadKey,
    setReloadKey,
  ] = useState(0);


  useEffect(() => {
    const controller =
      new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        if (params.page === 1) {
          setProductos([]);
          setPaginacion(null);
        }

        const response =
          await obtenerProductosCatalogo(
            params,
            controller.signal,
          );

        setProductos(
          (currentProducts) => {
            if (params.page === 1) {
              return response.resultados;
            }

            const productsMap =
              new Map(
                currentProducts.map(
                  (product) => [
                    product.id,
                    product,
                  ],
                ),
              );

            response.resultados.forEach(
              (product) => {
                productsMap.set(
                  product.id,
                  product,
                );
              },
            );

            return Array.from(
              productsMap.values(),
            );
          },
        );

        setPaginacion(
          response.paginacion,
        );
      } catch (requestError) {
        if (
          isAbortError(
            requestError,
          )
        ) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "No fue posible cargar el catálogo.",
        );
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      controller.abort();
    };
  }, [
    params,
    reloadKey,
  ]);


  function reload() {
    setReloadKey(
      (currentKey) =>
        currentKey + 1,
    );
  }


  return {
    productos,
    paginacion,
    loading,
    error,
    reload,
  };
}