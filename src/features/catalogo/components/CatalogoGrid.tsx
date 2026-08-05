// src/features/catalogo/components/CatalogoGrid.tsx
import {
  useMemo,
} from "react";

import useCatalogoColumns from "../hooks/useCatalogoColumns";

import type {
  ProductoCatalogo,
} from "../types/catalogo.types";

import CatalogoCard from "./CatalogoCard";

type CatalogoGridProps = {
  productos: ProductoCatalogo[];
};

export default function CatalogoGrid({
  productos,
}: CatalogoGridProps) {
  const columnCount =
    useCatalogoColumns();

  const columns = useMemo(() => {
    const distributedProducts:
      ProductoCatalogo[][] =
        Array.from(
          {
            length: columnCount,
          },
          () => [],
        );

    productos.forEach(
      (producto, index) => {
        const columnIndex =
          index % columnCount;

        distributedProducts[
          columnIndex
        ].push(
          producto,
        );
      },
    );

    return distributedProducts;
  }, [
    columnCount,
    productos,
  ]);

  return (
    <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
      {columns.map(
        (
          columnProducts,
          columnIndex,
        ) => (
          <div
            key={columnIndex}
            className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:gap-5"
          >
            {columnProducts.map(
              (producto) => (
                <CatalogoCard
                  key={producto.id}
                  producto={producto}
                />
              ),
            )}
          </div>
        ),
      )}
    </div>
  );
}