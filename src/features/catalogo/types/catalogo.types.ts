// src/features/catalogo/types/catalogo.types.ts
export type CategoriaResumen = {
  id: number;
  nombre: string;
  slug: string;
};

export type ColeccionResumen = {
  id: number;
  nombre: string;
  slug: string;
};

export type ProductoImagenPrincipal = {
  id: number;
  url: string | null;
  texto_alternativo: string;
};

export type ProductoOferta = {
  vigente: boolean;
  texto: string;
  precio_original: string | null;
  precio_oferta: string | null;
  precio_actual: string | null;
  porcentaje_descuento: string | null;
  inicia_en: string | null;
  finaliza_en: string | null;
};

export type ProductoCatalogo = {
  id: number;
  nombre: string;
  slug: string;
  descripcion_corta: string;
  categoria: CategoriaResumen;
  coleccion: ColeccionResumen | null;
  material: string;
  color: string;
  precio_referencia: string | null;
  destacado: boolean;
  imagen_principal: ProductoImagenPrincipal | null;
  oferta: ProductoOferta;
};

export type CatalogoPaginacion = {
  total_registros: number;
  total_paginas: number;
  pagina_actual: number;
  registros_por_pagina: number;
  siguiente: string | null;
  anterior: string | null;
};

export type CatalogoResponse = {
  paginacion: CatalogoPaginacion;
  resultados: ProductoCatalogo[];
};

export type CatalogoOpcion = {
  id: number;
  nombre: string;
  slug: string;
  total_productos: number;
};

export type ColeccionOpcion = CatalogoOpcion & {
  destacada: boolean;
};

export type OrdenamientoOpcion = {
  value: string;
  label: string;
};

export type CatalogoOpcionesResponse = {
  categorias: CatalogoOpcion[];
  colecciones: ColeccionOpcion[];
  etiquetas: CatalogoOpcion[];
  materiales: string[];
  colores: string[];
  rango_precios: {
    minimo: string | null;
    maximo: string | null;
  };
  ordenamientos: OrdenamientoOpcion[];
};

export type CatalogoFiltersState = {
  search: string;
  categorias: string[];
  colecciones: string[];
  etiquetas: string[];
  materiales: string[];
  colores: string[];
  destacado: boolean;
  enOferta: boolean;
  precioMinimo: string;
  precioMaximo: string;
  orden: string;
};

export type CatalogoQueryParams =
  CatalogoFiltersState & {
    page: number;
  };
export type EtiquetaResumen = {
  id: number;
  nombre: string;
  slug: string;
};

export type ProductoImagen = {
  id: number;
  url: string | null;
  texto_alternativo: string;
  es_principal: boolean;
  orden: number;
};

export type ProductoDetalle = {
  id: number;
  codigo: string | null;
  nombre: string;
  slug: string;
  descripcion_corta: string;
  descripcion: string;
  categoria: CategoriaResumen;
  coleccion: ColeccionResumen | null;
  etiquetas: EtiquetaResumen[];
  material: string;
  color: string;
  dimensiones: string;
  peso: string | null;
  precio_referencia: string | null;
  destacado: boolean;
  imagen_principal: ProductoImagen | null;
  imagenes: ProductoImagen[];
  oferta: ProductoOferta;
};