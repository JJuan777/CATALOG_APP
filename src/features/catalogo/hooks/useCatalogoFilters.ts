// src/features/catalogo/hooks/useCatalogoFilters.ts

import {
  useDeferredValue,
  useMemo,
  useState,
} from "react";

import {
  INITIAL_CATALOGO_FILTERS,
} from "../constants/catalogo.constants";

import {
  countActiveCatalogoFilters,
} from "../utils/catalogo.utils";

import type {
  CatalogoFiltersState,
  CatalogoQueryParams,
} from "../types/catalogo.types";


export default function useCatalogoFilters() {
  const [
    filters,
    setFilters,
  ] = useState<CatalogoFiltersState>(
    INITIAL_CATALOGO_FILTERS,
  );

  const [
    draftFilters,
    setDraftFilters,
  ] = useState<CatalogoFiltersState>(
    INITIAL_CATALOGO_FILTERS,
  );

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);

  const deferredSearch =
    useDeferredValue(
      filters.search,
    );

  const queryParams =
    useMemo<CatalogoQueryParams>(
      () => ({
        ...filters,
        search: deferredSearch,
        page,
      }),
      [
        filters,
        deferredSearch,
        page,
      ],
    );

  const activeFilters =
    useMemo(
      () =>
        countActiveCatalogoFilters(
          filters,
        ),
      [
        filters,
      ],
    );


  function updateImmediateFilters(
    changes: Partial<CatalogoFiltersState>,
  ) {
    setFilters(
      (currentFilters) => ({
        ...currentFilters,
        ...changes,
      }),
    );

    setPage(1);
  }


  function openFilters() {
    setDraftFilters({
      ...filters,
      categorias: [
        ...filters.categorias,
      ],
      colecciones: [
        ...filters.colecciones,
      ],
      etiquetas: [
        ...filters.etiquetas,
      ],
      materiales: [
        ...filters.materiales,
      ],
      colores: [
        ...filters.colores,
      ],
    });

    setFiltersOpen(true);
  }


  function closeFilters() {
    setDraftFilters({
      ...filters,
      categorias: [
        ...filters.categorias,
      ],
      colecciones: [
        ...filters.colecciones,
      ],
      etiquetas: [
        ...filters.etiquetas,
      ],
      materiales: [
        ...filters.materiales,
      ],
      colores: [
        ...filters.colores,
      ],
    });

    setFiltersOpen(false);
  }


  function updateDraftFilters(
    nextFilters: CatalogoFiltersState,
  ) {
    setDraftFilters(
      nextFilters,
    );
  }


  function applyFilters() {
    setFilters({
      ...draftFilters,
      categorias: [
        ...draftFilters.categorias,
      ],
      colecciones: [
        ...draftFilters.colecciones,
      ],
      etiquetas: [
        ...draftFilters.etiquetas,
      ],
      materiales: [
        ...draftFilters.materiales,
      ],
      colores: [
        ...draftFilters.colores,
      ],
    });

    setPage(1);
    setFiltersOpen(false);
  }


  function clearDraftFilters() {
    setDraftFilters({
      ...INITIAL_CATALOGO_FILTERS,

      search:
        filters.search,

      orden:
        filters.orden,
    });
  }


  function goToNextPage() {
    setPage(
      (currentPage) =>
        currentPage + 1,
    );
  }


  return {
    filters,
    draftFilters,

    page,

    filtersOpen,

    queryParams,

    activeFilters,

    updateImmediateFilters,
    updateDraftFilters,

    openFilters,
    closeFilters,

    applyFilters,
    clearDraftFilters,

    goToNextPage,
  };
}