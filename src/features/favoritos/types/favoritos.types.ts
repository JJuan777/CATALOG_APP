// src/features/favoritos/types/favoritos.types.ts
export type FavoritosContextValue = {
  favoritosIds: number[];
  totalFavoritos: number;
  esFavorito: (
    productoId: number,
  ) => boolean;
  alternarFavorito: (
    productoId: number,
  ) => void;
  eliminarFavorito: (
    productoId: number,
  ) => void;
  limpiarFavoritos: () => void;
};