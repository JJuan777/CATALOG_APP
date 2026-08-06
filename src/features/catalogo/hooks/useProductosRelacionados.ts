// src/features/catalogo/hooks/useProductosRelacionados.ts
import {
  useEffect,
  useState,
} from "react";

import {
  obtenerProductosRelacionados,
} from "../api/catalogo.api";

import type {
  ProductoCatalogo,
} from "../types/catalogo.types";

export default function useProductosRelacionados(
  slug: string,
) {
  const [
    productos,
    setProductos,
  ] = useState<ProductoCatalogo[]>([]);

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

    async function loadRelatedProducts() {
      try {
        setLoading(true);
        setError(null);
        setProductos([]);

        const response =
          await obtenerProductosRelacionados(
            slug,
            controller.signal,
          );

        setProductos(
          response,
        );
      } catch (requestError) {
        if (
          requestError instanceof DOMException
          && requestError.name === "AbortError"
        ) {
          return;
        }

        setProductos([]);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "No fue posible cargar las recomendaciones.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadRelatedProducts();

    return () => {
      controller.abort();
    };
  }, [
    reloadKey,
    slug,
  ]);

  function reload() {
    setReloadKey((currentKey) => (
      currentKey + 1
    ));
  }

  return {
    productos,
    loading,
    error,
    reload,
  };
}