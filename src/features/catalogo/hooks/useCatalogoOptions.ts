// src/features/catalogo/hooks/useCatalogoOptions.ts
import {
  useEffect,
  useState,
} from "react";

import {
  obtenerOpcionesCatalogo,
} from "../api/catalogo.api";

import type {
  CatalogoOpcionesResponse,
} from "../types/catalogo.types";

export default function useCatalogoOptions() {
  const [
    options,
    setOptions,
  ] = useState<CatalogoOpcionesResponse | null>(
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

  useEffect(() => {
    const controller = new AbortController();

    async function loadOptions() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await obtenerOpcionesCatalogo(
            controller.signal,
          );

        setOptions(response);
      } catch (requestError) {
        if (
          requestError instanceof DOMException
          && requestError.name === "AbortError"
        ) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "No fue posible cargar los filtros.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadOptions();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    options,
    loading,
    error,
  };
}