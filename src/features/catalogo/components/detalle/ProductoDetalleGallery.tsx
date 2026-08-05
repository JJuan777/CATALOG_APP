// src/features/catalogo/components/detalle/ProductoDetalleGallery.tsx
import {
  useMemo,
  useState,
} from "react";

import {
  ImageOff,
  Maximize2,
} from "lucide-react";

import Lightbox from "yet-another-react-lightbox";

import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

import type {
  ProductoImagen,
} from "../../types/catalogo.types";

type ProductoDetalleGalleryProps = {
  nombre: string;
  imagenes: ProductoImagen[];
};

export default function ProductoDetalleGallery({
  nombre,
  imagenes,
}: ProductoDetalleGalleryProps) {
  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  const [
    lightboxOpen,
    setLightboxOpen,
  ] = useState(false);

  const validImages = useMemo(
    () => (
      imagenes.filter(
        (
          image,
        ): image is ProductoImagen & {
          url: string;
        } => Boolean(image.url),
      )
    ),
    [imagenes],
  );

  const slides = useMemo(
    () => (
      validImages.map((image) => ({
        src: image.url,
        alt: (
          image.texto_alternativo
          || nombre
        ),
        title: (
          image.texto_alternativo
          || nombre
        ),
      }))
    ),
    [
      nombre,
      validImages,
    ],
  );

  const safeSelectedIndex =
    selectedIndex < validImages.length
      ? selectedIndex
      : 0;

  const selectedImage =
    validImages[safeSelectedIndex]
    ?? null;

  function openLightbox() {
    if (validImages.length === 0) {
      return;
    }

    setLightboxOpen(true);
  }

  return (
    <section aria-label="Imágenes del producto">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-brand-50 shadow-card dark:bg-warm-800">
        {selectedImage ? (
          <button
            type="button"
            onClick={openLightbox}
            aria-label={
              `Ampliar imagen de ${nombre}`
            }
            className="group/image block h-full w-full cursor-zoom-in"
          >
            <img
              src={selectedImage.url}
              alt={
                selectedImage
                  .texto_alternativo
                || nombre
              }
              className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-[1.02]"
            />

            <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-warm-900/75 px-3 py-2 text-xs font-bold text-white shadow-sm backdrop-blur-md">
              <Maximize2 className="size-3.5" />
              Ampliar
            </span>
          </button>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-50 to-cream-200 dark:from-warm-800 dark:to-brand-950/30">
            <ImageOff className="size-12 text-brand-300 dark:text-brand-800" />
          </div>
        )}

        {validImages.length > 1 && (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-warm-900/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            {safeSelectedIndex + 1}
            {" / "}
            {validImages.length}
          </span>
        )}
      </div>

      {validImages.length > 1 && (
        <div
          role="list"
          aria-label="Miniaturas del producto"
          className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2"
        >
          {validImages.map(
            (image, index) => {
              const isSelected =
                index === safeSelectedIndex;

              return (
                <button
                  key={image.id}
                  type="button"
                  role="listitem"
                  onClick={() => {
                    setSelectedIndex(
                      index,
                    );
                  }}
                  aria-label={
                    `Ver imagen ${index + 1} de ${nombre}`
                  }
                  aria-current={
                    isSelected
                      ? "true"
                      : undefined
                  }
                  className={[
                    "relative size-16 shrink-0",
                    "snap-start overflow-hidden",
                    "rounded-xl border-2",
                    "transition",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-2",
                    "focus-visible:outline-brand-500",
                    isSelected
                      ? [
                          "border-brand-500",
                          "opacity-100",
                          "shadow-sm",
                        ].join(" ")
                      : [
                          "border-transparent",
                          "opacity-60",
                          "hover:opacity-100",
                        ].join(" "),
                  ].join(" ")}
                >
                  <img
                    src={image.url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  {isSelected && (
                    <span className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            },
          )}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => {
          setLightboxOpen(false);
        }}
        index={safeSelectedIndex}
        slides={slides}
        plugins={[
          Counter,
          Fullscreen,
          Zoom,
        ]}
        on={{
          view: ({
            index,
          }) => {
            setSelectedIndex(
              index,
            );
          },
        }}
        carousel={{
          finite: validImages.length <= 1,
          preload: 2,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        zoom={{
          maxZoomPixelRatio: 4,
          zoomInMultiplier: 2,
          doubleClickMaxStops: 3,
          scrollToZoom: true,
        }}
        animation={{
          fade: 250,
          swipe: 300,
          zoom: 350,
        }}
        counter={{
          container: {
            style: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: "unset",
              padding: "16px",
            },
          },
        }}
        styles={{
          container: {
            backgroundColor:
              "rgba(53, 38, 40, 0.97)",
          },
        }}
        labels={{
          Close: "Cerrar",
          Next: "Siguiente",
          Previous: "Anterior",
          "Enter Fullscreen":
            "Ver en pantalla completa",
          "Exit Fullscreen":
            "Salir de pantalla completa",
          "Zoom in": "Acercar",
          "Zoom out": "Alejar",
        }}
      />
    </section>
  );
}