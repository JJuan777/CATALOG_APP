// src/features/favoritos/hooks/useFavoritos.ts
import {
  useContext,
} from "react";

import FavoritosContext from "../context/FavoritosContext";

export default function useFavoritos() {
  const context = useContext(
    FavoritosContext,
  );

  if (!context) {
    throw new Error(
      "useFavoritos debe utilizarse dentro de FavoritosProvider.",
    );
  }

  return context;
}