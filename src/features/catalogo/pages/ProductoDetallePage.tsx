// src/features/catalogo/pages/ProductoDetallePage.tsx
import {
  useEffect,
} from "react";

import {
  ArrowLeft,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProductoDetalleGallery from "../components/detalle/ProductoDetalleGallery";
import ProductoDetalleInfo from "../components/detalle/ProductoDetalleInfo";
import ProductoDetalleSkeleton from "../components/detalle/ProductoDetalleSkeleton";
import ProductosRelacionadosSection from "../components/detalle/ProductosRelacionadosSection";

import useProductoDetalle from "../hooks/useProductoDetalle";

export default function ProductoDetallePage() {
  const {
    slug,
  } = useParams<{
    slug: string;
  }>();

  const navigate = useNavigate();

  const {
    producto,
    loading,
    error,
    reload,
  } = useProductoDetalle(
    slug,
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  function goBack() {
    if (window.history.length > 1) {
      navigate(-1);

      return;
    }

    navigate(
      "/",
      {
        replace: true,
      },
    );
  }

  return (
    <section className="w-full px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={goBack}
        className="mb-4 inline-flex h-10 items-center gap-2 rounded-xl px-2 text-sm font-bold text-warm-700 transition hover:bg-brand-50 active:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-cream-200 dark:hover:bg-brand-950/20 dark:active:bg-brand-900/30"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-4"
        />

        Regresar
      </button>

      {loading && (
        <ProductoDetalleSkeleton />
      )}

      {!loading && error && (
        <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-950/40 dark:text-brand-200">
            <TriangleAlert
              aria-hidden="true"
              className="size-6"
            />
          </span>

          <h1 className="mt-4 font-display text-2xl font-bold text-warm-900 dark:text-cream-50">
            No pudimos mostrar el producto
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-warm-700 dark:text-cream-200">
            {error}
          </p>

          <button
            type="button"
            onClick={reload}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-700 active:scale-95"
          >
            <RefreshCw
              aria-hidden="true"
              className="size-4"
            />

            Intentar nuevamente
          </button>
        </div>
      )}

      {!loading && producto && (
        <>
          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="lg:sticky lg:top-24">
              <ProductoDetalleGallery
                key={producto.id}
                nombre={producto.nombre}
                imagenes={
                  producto.imagenes.length > 0
                    ? producto.imagenes
                    : producto.imagen_principal
                      ? [
                          producto.imagen_principal,
                        ]
                      : []
                }
              />
            </div>

            <ProductoDetalleInfo
              key={producto.id}
              producto={producto}
            />
          </div>

          <ProductosRelacionadosSection
            key={producto.slug}
            slug={producto.slug}
          />
        </>
      )}
    </section>
  );
}