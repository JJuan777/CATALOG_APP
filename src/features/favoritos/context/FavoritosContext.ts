// src/features/favoritos/context/FavoritosContext.ts
import {
  createContext,
} from "react";

import type {
  FavoritosContextValue,
} from "../types/favoritos.types";

const FavoritosContext =
  createContext<FavoritosContextValue | null>(
    null,
  );

export default FavoritosContext;