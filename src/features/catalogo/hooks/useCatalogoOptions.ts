// src/features/catalogo/hooks/useCatalogoOptions.ts

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  obtenerOpcionesCatalogo,
} from "../api/catalogo.api";

import type {
  CatalogoOpcionesResponse,
} from "../types/catalogo.types";


function isAbortError(
  error: unknown,
) {
  return (
    error instanceof DOMException
    && error.name === "AbortError"
  );
}


export default function useCatalogoOptions() {
  const [
    options,
    setOptions,
  ] = useState<
    CatalogoOpcionesResponse | null
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


    async function loadOptions() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await obtenerOpcionesCatalogo(
            controller.signal,
          );

        if (
          controller.signal.aborted
        ) {
          return;
        }

        setOptions(
          response,
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

        setOptions(null);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "No fue posible cargar los filtros.",
        );
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }


    void loadOptions();


    return () => {
      controller.abort();
    };
  }, [
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
    options,
    loading,
    error,
    reload,
  };
}