// src/features/catalogo/constants/catalogo.constants.ts
import type {
  CatalogoFiltersState,
} from "../types/catalogo.types";

export const INITIAL_CATALOGO_FILTERS:
  CatalogoFiltersState = {
    search: "",
    categorias: [],
    colecciones: [],
    etiquetas: [],
    materiales: [],
    colores: [],
    destacado: false,
    enOferta: false,
    precioMinimo: "",
    precioMaximo: "",
    orden: "predeterminado",
  };