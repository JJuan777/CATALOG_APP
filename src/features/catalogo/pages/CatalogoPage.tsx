// src/features/catalogo/pages/CatalogoPage.tsx

import {
  useDeferredValue,
  useMemo,
  useState,
} from "react";

import {
  LoaderCircle,
} from "lucide-react";

import CatalogoEmpty
  from "../components/CatalogoEmpty";

import CatalogoError
  from "../components/CatalogoError";

import CatalogoFiltersPanel
  from "../components/filters/CatalogoFiltersPanel";

import CatalogoGrid
  from "../components/CatalogoGrid";

import CatalogoSkeleton
  from "../components/CatalogoSkeleton";

import CatalogoToolbar
  from "../components/CatalogoToolbar";

import {
  INITIAL_CATALOGO_FILTERS,
} from "../constants/catalogo.constants";

import useCatalogo
  from "../hooks/useCatalogo";

import useCatalogoOptions
  from "../hooks/useCatalogoOptions";

import type {
  CatalogoFiltersState,
} from "../types/catalogo.types";

import {
  countActiveCatalogoFilters,
} from "../utils/catalogo.utils";


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


  const deferredSearch =
    useDeferredValue(
      filters.search,
    );


  const queryParams =
    useMemo(
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
  } = useCatalogo(
    queryParams,
  );


  const {
    options,
    loading: optionsLoading,
  } = useCatalogoOptions();


  const activeFilters =
    useMemo(
      () =>
        countActiveCatalogoFilters(
          filters,
        ),
      [filters],
    );


  const initialLoading =
    loading
    && page === 1
    && productos.length === 0;


  const hasProducts =
    productos.length > 0;


  const hasNextPage =
    Boolean(
      paginacion?.siguiente,
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


  function handleSearchChange(
    search: string,
  ) {
    updateImmediateFilters({
      search,
    });
  }


  function handleOrderChange(
    orden: string,
  ) {
    updateImmediateFilters({
      orden,
    });
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

      search:
        filters.search,

      orden:
        filters.orden,
    });
  }


  function loadNextPage() {
    if (
      loading
      || !hasNextPage
    ) {
      return;
    }

    setPage(
      (currentPage) =>
        currentPage + 1,
    );
  }


  return (
    <section
      className={[
        "w-full",
        "px-4 pb-7",

        "sm:px-6",
        "lg:px-8",
      ].join(" ")}
    >
      <CatalogoToolbar
        search={filters.search}
        order={filters.orden}
        totalProducts={
          paginacion
            ?.total_registros
          ?? 0
        }
        activeFilters={
          activeFilters
        }
        orderOptions={
          options
            ?.ordenamientos
          ?? []
        }
        onSearchChange={
          handleSearchChange
        }
        onOrderChange={
          handleOrderChange
        }
        onToggleFilters={
          openFilters
        }
      />

      <CatalogoFiltersPanel
        open={filtersOpen}
        filters={draftFilters}
        options={options}
        loading={
          optionsLoading
        }
        onChange={
          setDraftFilters
        }
        onApply={
          applyFilters
        }
        onClear={
          clearDraftFilters
        }
        onClose={
          closeFilters
        }
      />

      {initialLoading && (
        <CatalogoSkeleton />
      )}

      {!initialLoading
        && error
        && !hasProducts && (
          <CatalogoError
            message={error}
            onRetry={reload}
          />
        )}

      {!initialLoading
        && !error
        && !hasProducts && (
          <CatalogoEmpty />
        )}

      {hasProducts && (
        <CatalogoGrid
          productos={productos}
        />
      )}

      {hasProducts
        && hasNextPage && (
          <div
            className={[
              "flex",
              "justify-center",
              "py-8",
            ].join(" ")}
          >
            <button
              type="button"
              disabled={loading}
              onClick={
                loadNextPage
              }
              className={[
                "inline-flex",
                "min-w-40",
                "items-center",
                "justify-center",
                "gap-2",
                "rounded-2xl",
                "border",
                "border-brand-200",
                "bg-white",
                "px-5 py-3",
                "text-sm",
                "font-extrabold",
                "text-brand-700",
                "shadow-soft",
                "transition",

                "hover:border-brand-300",
                "hover:bg-brand-50",
                "active:scale-95",

                "disabled:cursor-not-allowed",
                "disabled:opacity-60",

                "focus-visible:outline-2",
                "focus-visible:outline-offset-2",
                "focus-visible:outline-brand-500",

                "dark:border-brand-900/60",
                "dark:bg-warm-800",
                "dark:text-brand-200",
                "dark:hover:bg-brand-950/30",
              ].join(" ")}
            >
              {loading && (
                <LoaderCircle
                  aria-hidden="true"
                  className={[
                    "size-4",
                    "animate-spin",
                  ].join(" ")}
                />
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