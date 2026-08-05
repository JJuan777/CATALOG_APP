// src/features/catalogo/components/detalle/ProductoDetalleSkeleton.tsx
export default function ProductoDetalleSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="aspect-[4/5] animate-pulse rounded-[1.75rem] bg-brand-100 dark:bg-warm-800" />

      <div className="space-y-4 py-2">
        <div className="h-6 w-24 animate-pulse rounded-full bg-brand-100 dark:bg-warm-800" />
        <div className="h-10 w-3/4 animate-pulse rounded-xl bg-brand-100 dark:bg-warm-800" />
        <div className="h-4 w-full animate-pulse rounded-full bg-brand-100 dark:bg-warm-800" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-brand-100 dark:bg-warm-800" />
        <div className="h-32 animate-pulse rounded-2xl bg-brand-100 dark:bg-warm-800" />

        <div className="grid grid-cols-2 gap-3">
          <div className="h-28 animate-pulse rounded-2xl bg-brand-100 dark:bg-warm-800" />
          <div className="h-28 animate-pulse rounded-2xl bg-brand-100 dark:bg-warm-800" />
        </div>
      </div>
    </div>
  );
}