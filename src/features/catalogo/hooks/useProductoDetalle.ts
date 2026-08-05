// src/features/catalogo/hooks/useProductoDetalle.ts
import {
  useEffect,
  useState,
} from "react";

import {
  obtenerProductoDetalle,
} from "../api/catalogo.api";

import type {
  ProductoDetalle,
} from "../types/catalogo.types";

export default function useProductoDetalle(
  slug: string | undefined,
) {
  const [
    producto,
    setProducto,
  ] = useState<ProductoDetalle | null>(
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
    if (!slug) {
      setProducto(null);
      setLoading(false);
      setError(
        "No se proporcionó un producto válido.",
      );

      return;
    }

    const productSlug = slug;
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await obtenerProductoDetalle(
            productSlug,
            controller.signal,
          );

        setProducto(
          response,
        );
      } catch (requestError) {
        if (
          requestError instanceof DOMException
          && requestError.name === "AbortError"
        ) {
          return;
        }

        setProducto(null);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "No fue posible cargar el producto.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

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
    producto,
    loading,
    error,
    reload,
  };
}