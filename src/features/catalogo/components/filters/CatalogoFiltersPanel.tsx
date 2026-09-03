// src/features/catalogo/components/filters/CatalogoFiltersPanel.tsx

import {
  useEffect,
  useRef,
} from "react";

import {
  createPortal,
} from "react-dom";

import {
  BadgePercent,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

import type {
  CatalogoFiltersState,
  CatalogoOpcionesResponse,
} from "../../types/catalogo.types";

import FilterChipGroup from "./FilterChipGroup";
import FilterSection from "./FilterSection";
import PriceFilter from "./PriceFilter";
import ToggleFilterCard from "./ToggleFilterCard";


type CatalogoFiltersPanelProps = {
  open: boolean;

  filters: CatalogoFiltersState;

  options:
    CatalogoOpcionesResponse
    | null;

  loading: boolean;

  onChange: (
    filters: CatalogoFiltersState,
  ) => void;

  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
};


const FOCUSABLE_ELEMENTS = [
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");


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
  const dialogRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const closeButtonRef =
    useRef<HTMLButtonElement | null>(
      null,
    );


  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const previouslyFocusedElement =
      document.activeElement
        instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow =
      "hidden";

    requestAnimationFrame(() => {
      closeButtonRef.current
        ?.focus();
    });


    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();

        return;
      }

      if (
        event.key !== "Tab"
        || !dialogRef.current
      ) {
        return;
      }

      const focusableElements =
        Array.from(
          dialogRef.current
            .querySelectorAll<HTMLElement>(
              FOCUSABLE_ELEMENTS,
            ),
        ).filter(
          (element) =>
            !element.hasAttribute(
              "disabled",
            ),
        );

      if (
        focusableElements.length === 0
      ) {
        event.preventDefault();

        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey
        && document.activeElement
          === firstElement
      ) {
        event.preventDefault();

        lastElement.focus();

        return;
      }

      if (
        !event.shiftKey
        && document.activeElement
          === lastElement
      ) {
        event.preventDefault();

        firstElement.focus();
      }
    }


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

      previouslyFocusedElement
        ?.focus();
    };
  }, [
    onClose,
    open,
  ]);


  if (!open) {
    return null;
  }


  function updateFilters(
    changes:
      Partial<CatalogoFiltersState>,
  ) {
    onChange({
      ...filters,
      ...changes,
    });
  }


  return createPortal(
    <div
      className={[
        "fixed inset-0 z-[100]",
        "flex items-end justify-center",
        "bg-warm-900/40",
        "backdrop-blur-sm",
        "sm:items-center sm:p-5",
      ].join(" ")}
    >
      <button
        type="button"
        aria-label="Cerrar filtros"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalogo-filtros-titulo"
        aria-describedby="catalogo-filtros-descripcion"
        className={[
          "relative",
          "flex max-h-[92dvh]",
          "w-full flex-col",
          "overflow-hidden",
          "rounded-t-[2rem]",
          "bg-cream-50",
          "shadow-2xl",

          "sm:max-w-2xl",
          "sm:rounded-[2rem]",

          "dark:bg-warm-800",
        ].join(" ")}
      >
        <div className="flex justify-center py-2 sm:hidden">
          <span className="h-1.5 w-12 rounded-full bg-brand-200 dark:bg-brand-900" />
        </div>

        <header
          className={[
            "flex items-center",
            "justify-between",
            "border-b",
            "border-brand-100",
            "px-5 pb-4 pt-2",
            "sm:pt-5",
            "dark:border-brand-900/40",
          ].join(" ")}
        >
          <div>
            <h2
              id="catalogo-filtros-titulo"
              className={[
                "font-display",
                "text-2xl font-bold",
                "text-warm-900",
                "dark:text-cream-50",
              ].join(" ")}
            >
              Filtrar catálogo
            </h2>

            <p
              id="catalogo-filtros-descripcion"
              className="mt-1 text-xs font-medium text-warm-700 dark:text-cream-200/70"
            >
              Selecciona tus preferencias
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar filtros"
            className={[
              "flex size-10",
              "items-center justify-center",
              "rounded-full",
              "bg-brand-50",
              "text-brand-700",
              "transition",
              "hover:bg-brand-100",
              "active:scale-95",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",

              "dark:bg-brand-950/40",
              "dark:text-brand-200",
              "dark:hover:bg-brand-950/70",
            ].join(" ")}
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
              <FilterSection
                title="Categorías"
                selectedCount={
                  filters
                    .categorias
                    .length
                }
                defaultOpen
              >
                <FilterChipGroup
                  options={
                    options.categorias.map(
                      (category) => ({
                        value:
                          category.slug,

                        label:
                          category.nombre,

                        count:
                          category
                            .total_productos,
                      }),
                    )
                  }
                  selected={
                    filters.categorias
                  }
                  onChange={(
                    categorias,
                  ) => {
                    updateFilters({
                      categorias,
                    });
                  }}
                />
              </FilterSection>

              <FilterSection
                title="Colecciones"
                selectedCount={
                  filters
                    .colecciones
                    .length
                }
              >
                <FilterChipGroup
                  options={
                    options.colecciones.map(
                      (collection) => ({
                        value:
                          collection.slug,

                        label:
                          collection.nombre,

                        count:
                          collection
                            .total_productos,
                      }),
                    )
                  }
                  selected={
                    filters.colecciones
                  }
                  onChange={(
                    colecciones,
                  ) => {
                    updateFilters({
                      colecciones,
                    });
                  }}
                />
              </FilterSection>

              <FilterSection
                title="Materiales"
                selectedCount={
                  filters
                    .materiales
                    .length
                }
              >
                <FilterChipGroup
                  options={
                    options.materiales.map(
                      (material) => ({
                        value:
                          material,

                        label:
                          material,
                      }),
                    )
                  }
                  selected={
                    filters.materiales
                  }
                  onChange={(
                    materiales,
                  ) => {
                    updateFilters({
                      materiales,
                    });
                  }}
                />
              </FilterSection>

              <FilterSection
                title="Colores"
                selectedCount={
                  filters
                    .colores
                    .length
                }
              >
                <FilterChipGroup
                  options={
                    options.colores.map(
                      (color) => ({
                        value: color,
                        label: color,
                      }),
                    )
                  }
                  selected={
                    filters.colores
                  }
                  onChange={(
                    colores,
                  ) => {
                    updateFilters({
                      colores,
                    });
                  }}
                />
              </FilterSection>

              <FilterSection
                title="Etiquetas"
                selectedCount={
                  filters
                    .etiquetas
                    .length
                }
              >
                <FilterChipGroup
                  options={
                    options.etiquetas.map(
                      (tag) => ({
                        value:
                          tag.slug,

                        label:
                          tag.nombre,

                        count:
                          tag.total_productos,
                      }),
                    )
                  }
                  selected={
                    filters.etiquetas
                  }
                  onChange={(
                    etiquetas,
                  ) => {
                    updateFilters({
                      etiquetas,
                    });
                  }}
                />
              </FilterSection>

              <PriceFilter
                minimum={
                  filters.precioMinimo
                }
                maximum={
                  filters.precioMaximo
                }
                minimumPlaceholder={
                  options
                    .rango_precios
                    .minimo
                }
                maximumPlaceholder={
                  options
                    .rango_precios
                    .maximo
                }
                onMinimumChange={(
                  precioMinimo,
                ) => {
                  updateFilters({
                    precioMinimo,
                  });
                }}
                onMaximumChange={(
                  precioMaximo,
                ) => {
                  updateFilters({
                    precioMaximo,
                  });
                }}
              />

              <section className="grid grid-cols-2 gap-3">
                <ToggleFilterCard
                  active={
                    filters.enOferta
                  }
                  label="Solo ofertas"
                  icon={
                    <BadgePercent
                      aria-hidden="true"
                      className="size-5"
                    />
                  }
                  onClick={() => {
                    updateFilters({
                      enOferta:
                        !filters.enOferta,
                    });
                  }}
                />

                <ToggleFilterCard
                  active={
                    filters.destacado
                  }
                  label="Destacados"
                  icon={
                    <Sparkles
                      aria-hidden="true"
                      className="size-5"
                    />
                  }
                  onClick={() => {
                    updateFilters({
                      destacado:
                        !filters.destacado,
                    });
                  }}
                />
              </section>
            </div>
          )}
        </div>

        <footer
          className={[
            "grid grid-cols-[auto_1fr]",
            "gap-3",
            "border-t",
            "border-brand-100",
            "bg-cream-50",
            "p-4",
            "pb-[max(1rem,env(safe-area-inset-bottom))]",

            "dark:border-brand-900/40",
            "dark:bg-warm-800",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar filtros"
            title="Limpiar filtros"
            className={[
              "flex size-12",
              "items-center justify-center",
              "rounded-2xl",
              "border border-brand-200",
              "text-brand-700",
              "transition",
              "hover:bg-brand-50",
              "active:scale-95",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",

              "dark:border-brand-900",
              "dark:text-brand-200",
              "dark:hover:bg-brand-950/30",
            ].join(" ")}
          >
            <RotateCcw
              aria-hidden="true"
              className="size-4"
            />
          </button>

          <button
            type="button"
            onClick={onApply}
            className={[
              "h-12 rounded-2xl",
              "bg-brand-600 px-5",
              "text-sm font-extrabold",
              "text-white",
              "shadow-soft",
              "transition",
              "hover:bg-brand-700",
              "active:scale-[0.98]",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",
            ].join(" ")}
          >
            Ver resultados
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}