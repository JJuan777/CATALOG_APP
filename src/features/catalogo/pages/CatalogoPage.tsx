// src/features/catalogo/pages/CatalogoPage.tsx
import {
  useDeferredValue,
  useMemo,
  useState,
} from "react";

import {
  LoaderCircle,
} from "lucide-react";

import {
  INITIAL_CATALOGO_FILTERS,
} from "../constants/catalogo.constants";

import CatalogoEmpty from "../components/CatalogoEmpty";
import CatalogoError from "../components/CatalogoError";
import CatalogoFiltersPanel
  from "../components/filters/CatalogoFiltersPanel";
import CatalogoGrid from "../components/CatalogoGrid";
import CatalogoSkeleton from "../components/CatalogoSkeleton";
import CatalogoToolbar from "../components/CatalogoToolbar";

import useCatalogo from "../hooks/useCatalogo";
import useCatalogoOptions from "../hooks/useCatalogoOptions";

import type {
  CatalogoFiltersState,
} from "../types/catalogo.types";

export default function CatalogoPage() {
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

  const deferredSearch = useDeferredValue(
    filters.search,
  );

  const queryParams = useMemo(
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

  const {
    productos,
    paginacion,
    loading,
    error,
    reload,
  } = useCatalogo(queryParams);

  const {
    options,
    loading: optionsLoading,
  } = useCatalogoOptions();

  const activeFilters = useMemo(
    () => (
      filters.categorias.length
      + filters.colecciones.length
      + filters.etiquetas.length
      + filters.materiales.length
      + filters.colores.length
      + Number(filters.destacado)
      + Number(filters.enOferta)
      + Number(Boolean(filters.precioMinimo))
      + Number(Boolean(filters.precioMaximo))
    ),
    [filters],
  );

  function updateImmediateFilters(
    changes: Partial<CatalogoFiltersState>,
  ) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...changes,
    }));

    setPage(1);
  }

  function openFilters() {
    setDraftFilters(
      filters,
    );

    setFiltersOpen(true);
  }

  function closeFilters() {
    setDraftFilters(
      filters,
    );

    setFiltersOpen(false);
  }

  function applyFilters() {
    setFilters(
      draftFilters,
    );

    setPage(1);
    setFiltersOpen(false);
  }

  function clearDraftFilters() {
    setDraftFilters({
      ...INITIAL_CATALOGO_FILTERS,
      search: filters.search,
      orden: filters.orden,
    });
  }

  const initialLoading =
    loading
    && page === 1
    && productos.length === 0;

  return (
    <section className="w-full px-4 pb-7 sm:px-6 lg:px-8">
      <CatalogoToolbar
        search={filters.search}
        order={filters.orden}
        totalProducts={
          paginacion?.total_registros ?? 0
        }
        activeFilters={activeFilters}
        orderOptions={
          options?.ordenamientos ?? []
        }
        onSearchChange={(search) => {
          updateImmediateFilters({
            search,
          });
        }}
        onOrderChange={(orden) => {
          updateImmediateFilters({
            orden,
          });
        }}
        onToggleFilters={openFilters}
      />

      <CatalogoFiltersPanel
        open={filtersOpen}
        filters={draftFilters}
        options={options}
        loading={optionsLoading}
        onChange={setDraftFilters}
        onApply={applyFilters}
        onClear={clearDraftFilters}
        onClose={closeFilters}
      />

      {initialLoading && (
        <CatalogoSkeleton />
      )}

      {!initialLoading
        && error
        && productos.length === 0 && (
          <CatalogoError
            message={error}
            onRetry={reload}
          />
        )}

      {!initialLoading
        && !error
        && productos.length === 0 && (
          <CatalogoEmpty />
        )}

      {productos.length > 0 && (
        <CatalogoGrid
          productos={productos}
        />
      )}

      {productos.length > 0
        && paginacion?.siguiente && (
          <div className="flex justify-center py-8">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setPage((currentPage) => (
                  currentPage + 1
                ));
              }}
              className="inline-flex min-w-40 items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-5 py-3 text-sm font-extrabold text-brand-700 shadow-soft transition active:scale-95 disabled:opacity-60 dark:border-brand-900/60 dark:bg-warm-800 dark:text-brand-200"
            >
              {loading && (
                <LoaderCircle className="size-4 animate-spin" />
              )}

              {loading
                ? "Cargando..."
                : "Descubrir más"}
            </button>
          </div>
        )}
    </section>
  );
}