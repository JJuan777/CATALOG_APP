// src/features/catalogo/components/CatalogoToolbar.tsx
import {
  ChevronDown,
  ListFilter,
  Search,
  X,
} from "lucide-react";

import type {
  OrdenamientoOpcion,
} from "../types/catalogo.types";

type CatalogoToolbarProps = {
  search: string;
  order: string;
  totalProducts: number;
  activeFilters: number;
  orderOptions: OrdenamientoOpcion[];
  onSearchChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onToggleFilters: () => void;
};

export default function CatalogoToolbar({
  search,
  order,
  totalProducts,
  activeFilters,
  orderOptions,
  onSearchChange,
  onOrderChange,
  onToggleFilters,
}: CatalogoToolbarProps) {
  return (
    <div className="sticky top-[4.5rem] z-30 -mx-4 mb-5 border-b border-brand-100/80 bg-cream-50/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 dark:border-brand-900/40 dark:bg-warm-900/95">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-500" />

        <input
          type="search"
          value={search}
          onChange={(event) => {
            onSearchChange(
              event.target.value,
            );
          }}
          placeholder="¿Qué estás buscando?"
          aria-label="Buscar en el catálogo"
          className="h-12 w-full rounded-2xl border border-brand-100 bg-white pl-11 pr-11 text-sm font-semibold text-warm-900 shadow-sm outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-100/60 dark:border-brand-900/50 dark:bg-warm-800 dark:text-cream-50"
        />

        {search && (
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
            }}
            aria-label="Limpiar búsqueda"
            className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-warm-700 active:bg-brand-100 dark:text-cream-200"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <select
            value={order}
            onChange={(event) => {
              onOrderChange(
                event.target.value,
              );
            }}
            aria-label="Ordenar productos"
            className="h-10 w-full appearance-none truncate rounded-xl border border-brand-100 bg-white pl-3 pr-9 text-xs font-bold text-warm-700 outline-none dark:border-brand-900/50 dark:bg-warm-800 dark:text-cream-200"
          >
            {orderOptions.length === 0 && (
              <option value="predeterminado">
                Recomendados
              </option>
            )}

            {orderOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-brand-500" />
        </div>

        <button
          type="button"
          onClick={onToggleFilters}
          className="relative inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-4 text-xs font-extrabold text-white shadow-sm active:scale-95"
        >
          <ListFilter className="size-4" />
          Filtros

          {activeFilters > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-white text-[0.6rem] font-extrabold text-brand-700">
              {activeFilters}
            </span>
          )}
        </button>

        <span className="hidden shrink-0 text-xs font-bold text-warm-700 sm:block dark:text-cream-200">
          {totalProducts} resultados
        </span>
      </div>
    </div>
  );
}