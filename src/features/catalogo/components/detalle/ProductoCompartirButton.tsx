// src/features/catalogo/components/detalle/ProductoCompartirButton.tsx
import {
  useState,
} from "react";

import {
  Share2,
} from "lucide-react";

import type {
  ProductoDetalle,
} from "../../types/catalogo.types";

import ProductoCompartirModal from "./ProductoCompartirModal";

type ProductoCompartirButtonProps = {
  producto: ProductoDetalle;
};

export default function ProductoCompartirButton({
  producto,
}: ProductoCompartirButtonProps) {
  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
        aria-label={
          `Compartir ${producto.nombre}`
        }
        title="Compartir"
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-600 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-brand-900/50 dark:bg-warm-800 dark:text-brand-200 dark:hover:bg-brand-950/30"
      >
        <Share2
          aria-hidden="true"
          className="size-5"
        />
      </button>

      <ProductoCompartirModal
        open={modalOpen}
        producto={producto}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}