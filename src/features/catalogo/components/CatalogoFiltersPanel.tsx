// src/features/catalogo/components/CatalogoFiltersPanel.tsx
// src/features/catalogo/components/CatalogoFiltersPanel.tsx

import {
  useEffect,
} from "react";

import {
  createPortal,
} from "react-dom";

import {
  BadgePercent,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

import type {
  CatalogoFiltersState,
  CatalogoOpcionesResponse,
} from "../types/catalogo.types";

type CatalogoFiltersPanelProps = {
  open: boolean;
  filters: CatalogoFiltersState;
  options: CatalogoOpcionesResponse | null;
  loading: boolean;
  onChange: (
    filters: CatalogoFiltersState,
  ) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
};

type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

type FilterChipGroupProps = {
  options: FilterOption[];
  selected: string[];
  onChange: (
    values: string[],
  ) => void;
};

function toggleValue(
  currentValues: string[],
  value: string,
) {
  if (currentValues.includes(value)) {
    return currentValues.filter(
      (currentValue) => (
        currentValue !== value
      ),
    );
  }

  return [
    ...currentValues,
    value,
  ];
}

function FilterChipGroup({
  options,
  selected,
  onChange,
}: FilterChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected =
          selected.includes(
            option.value,
          );

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              onChange(
                toggleValue(
                  selected,
                  option.value,
                ),
              );
            }}
            className={[
              "inline-flex min-h-10 items-center gap-1.5",
              "rounded-full border px-3 py-2",
              "text-xs font-bold transition",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",
              isSelected
                ? [
                    "border-brand-500",
                    "bg-brand-500 text-white",
                    "shadow-sm",
                  ].join(" ")
                : [
                    "border-brand-100",
                    "bg-cream-50 text-warm-700",
                    "hover:border-brand-300",
                    "active:bg-brand-100",
                    "dark:border-brand-900/50",
                    "dark:bg-warm-900",
                    "dark:text-cream-200",
                  ].join(" "),
            ].join(" ")}
          >
            {isSelected && (
              <Check
                aria-hidden="true"
                className="size-3.5"
              />
            )}

            {option.label}

            {option.count !== undefined && (
              <span
                className={[
                  "rounded-full px-1.5 py-0.5",
                  "text-[0.6rem]",
                  isSelected
                    ? "bg-white/20"
                    : "bg-brand-100 text-brand-700 dark:bg-brand-950/50 dark:text-brand-200",
                ].join(" ")}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function CatalogoFiltersPanel({
  open,
  filters,
  options,
  loading,
  onChange,
  onApply,
  onClear,
  onClose,
}: CatalogoFiltersPanelProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    onClose,
    open,
  ]);

  if (!open) {
    return null;
  }

  function updateFilters(
    changes: Partial<CatalogoFiltersState>,
  ) {
    onChange({
      ...filters,
      ...changes,
    });
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogo-filtros-titulo"
      className="fixed inset-0 z-[100] flex items-end justify-center bg-warm-900/40 backdrop-blur-sm sm:items-center sm:p-5"
    >
      <button
        type="button"
        aria-label="Cerrar filtros"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-cream-50 shadow-2xl sm:max-w-2xl sm:rounded-[2rem] dark:bg-warm-800">
        <div className="flex justify-center py-2 sm:hidden">
          <span className="h-1.5 w-12 rounded-full bg-brand-200 dark:bg-brand-900" />
        </div>

        <header className="flex items-center justify-between border-b border-brand-100 px-5 pb-4 pt-2 sm:pt-5 dark:border-brand-900/40">
          <div>
            <h2
              id="catalogo-filtros-titulo"
              className="font-display text-2xl font-bold text-warm-900 dark:text-cream-50"
            >
              Filtrar catálogo
            </h2>

            <p className="mt-1 text-xs font-medium text-warm-700 dark:text-cream-200/70">
              Selecciona tus preferencias
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:bg-brand-950/40 dark:text-brand-200 dark:hover:bg-brand-950/70"
          >
            <X
              aria-hidden="true"
              className="size-5"
            />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          {loading && (
            <div className="space-y-4">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-2xl bg-brand-100/60 dark:bg-warm-700"
                />
              ))}
            </div>
          )}

          {!loading && options && (
            <div className="space-y-4">
              <details
                open
                className="group rounded-2xl border border-brand-100 bg-white p-4 dark:border-brand-900/50 dark:bg-warm-900"
              >
                <summary className="cursor-pointer list-none text-sm font-extrabold text-warm-900 dark:text-cream-50">
                  Categorías

                  {filters.categorias.length > 0 && (
                    <span className="ml-2 text-brand-600 dark:text-brand-300">
                      ({filters.categorias.length})
                    </span>
                  )}
                </summary>

                <div className="mt-4">
                  <FilterChipGroup
                    options={options.categorias.map(
                      (category) => ({
                        value: category.slug,
                        label: category.nombre,
                        count: category.total_productos,
                      }),
                    )}
                    selected={filters.categorias}
                    onChange={(categorias) => {
                      updateFilters({
                        categorias,
                      });
                    }}
                  />
                </div>
              </details>

              <details className="rounded-2xl border border-brand-100 bg-white p-4 dark:border-brand-900/50 dark:bg-warm-900">
                <summary className="cursor-pointer list-none text-sm font-extrabold text-warm-900 dark:text-cream-50">
                  Colecciones

                  {filters.colecciones.length > 0 && (
                    <span className="ml-2 text-brand-600 dark:text-brand-300">
                      ({filters.colecciones.length})
                    </span>
                  )}
                </summary>

                <div className="mt-4">
                  <FilterChipGroup
                    options={options.colecciones.map(
                      (collection) => ({
                        value: collection.slug,
                        label: collection.nombre,
                        count: collection.total_productos,
                      }),
                    )}
                    selected={filters.colecciones}
                    onChange={(colecciones) => {
                      updateFilters({
                        colecciones,
                      });
                    }}
                  />
                </div>
              </details>

              <details className="rounded-2xl border border-brand-100 bg-white p-4 dark:border-brand-900/50 dark:bg-warm-900">
                <summary className="cursor-pointer list-none text-sm font-extrabold text-warm-900 dark:text-cream-50">
                  Materiales

                  {filters.materiales.length > 0 && (
                    <span className="ml-2 text-brand-600 dark:text-brand-300">
                      ({filters.materiales.length})
                    </span>
                  )}
                </summary>

                <div className="mt-4">
                  <FilterChipGroup
                    options={options.materiales.map(
                      (material) => ({
                        value: material,
                        label: material,
                      }),
                    )}
                    selected={filters.materiales}
                    onChange={(materiales) => {
                      updateFilters({
                        materiales,
                      });
                    }}
                  />
                </div>
              </details>

              <details className="rounded-2xl border border-brand-100 bg-white p-4 dark:border-brand-900/50 dark:bg-warm-900">
                <summary className="cursor-pointer list-none text-sm font-extrabold text-warm-900 dark:text-cream-50">
                  Colores

                  {filters.colores.length > 0 && (
                    <span className="ml-2 text-brand-600 dark:text-brand-300">
                      ({filters.colores.length})
                    </span>
                  )}
                </summary>

                <div className="mt-4">
                  <FilterChipGroup
                    options={options.colores.map(
                      (color) => ({
                        value: color,
                        label: color,
                      }),
                    )}
                    selected={filters.colores}
                    onChange={(colores) => {
                      updateFilters({
                        colores,
                      });
                    }}
                  />
                </div>
              </details>

              <details className="rounded-2xl border border-brand-100 bg-white p-4 dark:border-brand-900/50 dark:bg-warm-900">
                <summary className="cursor-pointer list-none text-sm font-extrabold text-warm-900 dark:text-cream-50">
                  Etiquetas

                  {filters.etiquetas.length > 0 && (
                    <span className="ml-2 text-brand-600 dark:text-brand-300">
                      ({filters.etiquetas.length})
                    </span>
                  )}
                </summary>

                <div className="mt-4">
                  <FilterChipGroup
                    options={options.etiquetas.map(
                      (tag) => ({
                        value: tag.slug,
                        label: tag.nombre,
                        count: tag.total_productos,
                      }),
                    )}
                    selected={filters.etiquetas}
                    onChange={(etiquetas) => {
                      updateFilters({
                        etiquetas,
                      });
                    }}
                  />
                </div>
              </details>

              <section className="rounded-2xl border border-brand-100 bg-white p-4 dark:border-brand-900/50 dark:bg-warm-900">
                <h3 className="text-sm font-extrabold text-warm-900 dark:text-cream-50">
                  Precio
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label>
                    <span className="mb-2 block text-xs font-bold text-warm-700 dark:text-cream-200">
                      Desde
                    </span>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-600">
                        $
                      </span>

                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={filters.precioMinimo}
                        onChange={(event) => {
                          updateFilters({
                            precioMinimo:
                              event.target.value,
                          });
                        }}
                        placeholder={
                          options.rango_precios.minimo
                          ?? "0"
                        }
                        className="h-12 w-full rounded-xl border border-brand-100 bg-cream-50 pl-7 pr-3 text-sm font-semibold outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100/50 dark:border-brand-900/50 dark:bg-warm-800 dark:focus:ring-brand-900/30"
                      />
                    </div>
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold text-warm-700 dark:text-cream-200">
                      Hasta
                    </span>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-600">
                        $
                      </span>

                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        value={filters.precioMaximo}
                        onChange={(event) => {
                          updateFilters({
                            precioMaximo:
                              event.target.value,
                          });
                        }}
                        placeholder={
                          options.rango_precios.maximo
                          ?? "0"
                        }
                        className="h-12 w-full rounded-xl border border-brand-100 bg-cream-50 pl-7 pr-3 text-sm font-semibold outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100/50 dark:border-brand-900/50 dark:bg-warm-800 dark:focus:ring-brand-900/30"
                      />
                    </div>
                  </label>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    updateFilters({
                      enOferta:
                        !filters.enOferta,
                    });
                  }}
                  className={[
                    "flex min-h-20 flex-col items-center",
                    "justify-center gap-2 rounded-2xl",
                    "border p-3 text-center transition",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-2",
                    "focus-visible:outline-brand-500",
                    filters.enOferta
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-brand-100 bg-white text-warm-700 hover:border-brand-300 dark:border-brand-900/50 dark:bg-warm-900 dark:text-cream-200",
                  ].join(" ")}
                >
                  <BadgePercent
                    aria-hidden="true"
                    className="size-5"
                  />

                  <span className="text-xs font-extrabold">
                    Solo ofertas
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateFilters({
                      destacado:
                        !filters.destacado,
                    });
                  }}
                  className={[
                    "flex min-h-20 flex-col items-center",
                    "justify-center gap-2 rounded-2xl",
                    "border p-3 text-center transition",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-2",
                    "focus-visible:outline-brand-500",
                    filters.destacado
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-brand-100 bg-white text-warm-700 hover:border-brand-300 dark:border-brand-900/50 dark:bg-warm-900 dark:text-cream-200",
                  ].join(" ")}
                >
                  <Sparkles
                    aria-hidden="true"
                    className="size-5"
                  />

                  <span className="text-xs font-extrabold">
                    Destacados
                  </span>
                </button>
              </section>
            </div>
          )}
        </div>

        <footer className="grid grid-cols-[auto_1fr] gap-3 border-t border-brand-100 bg-cream-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-brand-900/40 dark:bg-warm-800">
          <button
            type="button"
            onClick={onClear}
            className="flex size-12 items-center justify-center rounded-2xl border border-brand-200 text-brand-700 transition hover:bg-brand-50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-brand-900 dark:text-brand-200 dark:hover:bg-brand-950/30"
            aria-label="Limpiar filtros"
            title="Limpiar filtros"
          >
            <RotateCcw
              aria-hidden="true"
              className="size-4"
            />
          </button>

          <button
            type="button"
            onClick={onApply}
            className="h-12 rounded-2xl bg-brand-600 px-5 text-sm font-extrabold text-white shadow-soft transition hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Ver resultados
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}