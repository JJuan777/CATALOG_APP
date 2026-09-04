// src/features/catalogo/hooks/useCatalogo.ts

import {
  useCallback,
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


function mergeProducts(
  currentProducts: ProductoCatalogo[],
  newProducts: ProductoCatalogo[],
) {
  const productsMap =
    new Map<number, ProductoCatalogo>(
      currentProducts.map(
        (product) => [
          product.id,
          product,
        ],
      ),
    );

  newProducts.forEach(
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
}


export default function useCatalogo(
  params: CatalogoQueryParams,
) {
  const [
    productos,
    setProductos,
  ] = useState<ProductoCatalogo[]>(
    [],
  );

  const [
    paginacion,
    setPaginacion,
  ] = useState<
    CatalogoPaginacion | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const [
    reloadKey,
    setReloadKey,
  ] = useState(0);


  useEffect(() => {
    const controller =
      new AbortController();

    const isFirstPage =
      params.page === 1;


    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        if (isFirstPage) {
          setProductos([]);
          setPaginacion(null);
        }

        const response =
          await obtenerProductosCatalogo(
            params,
            controller.signal,
          );

        if (
          controller.signal.aborted
        ) {
          return;
        }

        setProductos(
          (currentProducts) => {
            if (isFirstPage) {
              return response.resultados;
            }

            return mergeProducts(
              currentProducts,
              response.resultados,
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
          || controller.signal.aborted
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


  const reload =
    useCallback(() => {
      setReloadKey(
        (currentKey) =>
          currentKey + 1,
      );
    }, []);


  return {
    productos,
    paginacion,
    loading,
    error,
    reload,
  };
}