// src/features/catalogo/pages/ProductoDetallePage.tsx

import {
  useEffect,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  appRoutes,
} from "@/app/router/routes";

import ProductoDetalleError
  from "../components/detalle/ProductoDetalleError";

import ProductoDetalleGallery
  from "../components/detalle/ProductoDetalleGallery";

import ProductoDetalleInfo
  from "../components/detalle/ProductoDetalleInfo";

import ProductoDetalleSkeleton
  from "../components/detalle/ProductoDetalleSkeleton";

import ProductosRelacionadosSection
  from "../components/detalle/ProductosRelacionadosSection";

import useProductoDetalle
  from "../hooks/useProductoDetalle";


export default function ProductoDetallePage() {
  const {
    slug,
  } = useParams<{
    slug: string;
  }>();

  const navigate =
    useNavigate();

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
    if (
      window.history.length > 1
    ) {
      navigate(-1);
      return;
    }

    navigate(
      appRoutes.catalogo,
      {
        replace: true,
      },
    );
  }


  const images =
    producto
      ? (
          producto.imagenes.length > 0
            ? producto.imagenes
            : producto.imagen_principal
              ? [
                  producto.imagen_principal,
                ]
              : []
        )
      : [];


  return (
    <section
      className={[
        "w-full",
        "px-4 pb-10 pt-4",
        "sm:px-6",
        "lg:px-8",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={goBack}
        className={[
          "mb-4 inline-flex h-10",
          "items-center gap-2",
          "rounded-xl px-2",
          "text-sm font-bold",
          "text-warm-700",
          "transition",

          "hover:bg-brand-50",
          "active:bg-brand-100",

          "focus-visible:outline-2",
          "focus-visible:outline-offset-2",
          "focus-visible:outline-brand-500",

          "dark:text-cream-200",
          "dark:hover:bg-brand-950/20",
          "dark:active:bg-brand-900/30",
        ].join(" ")}
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
        <ProductoDetalleError
          message={error}
          onRetry={reload}
        />
      )}

      {!loading
        && !error
        && producto && (
        <>
          <div
            className={[
              "grid items-start gap-6",
              "lg:grid-cols-2",
              "lg:gap-10",
            ].join(" ")}
          >
            <div
              className={[
                "lg:sticky",
                "lg:top-24",
              ].join(" ")}
            >
              <ProductoDetalleGallery
                key={producto.id}
                nombre={
                  producto.nombre
                }
                imagenes={
                  images
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