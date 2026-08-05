// src/features/catalogo/components/CatalogoEmpty.tsx
import {
  SearchX,
} from "lucide-react";

export default function CatalogoEmpty() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-[2rem] border border-dashed border-brand-200 bg-white/60 px-6 text-center dark:border-brand-900/60 dark:bg-warm-800/50">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-950/50 dark:text-brand-200">
        <SearchX className="size-6" />
      </span>

      <h2 className="mt-4 font-display text-2xl font-bold text-warm-900 dark:text-cream-50">
        No encontramos piezas
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-warm-700 dark:text-cream-200">
        Intenta utilizar otra palabra o limpia la búsqueda.
      </p>
    </div>
  );
}