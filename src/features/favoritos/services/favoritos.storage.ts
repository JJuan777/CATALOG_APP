// src/features/favoritos/services/favoritos.storage.ts

import {
  FAVORITOS_STORAGE_KEY,
} from "../constants/favoritos.constants";


function esIdValido(
  value: unknown,
): value is number {
  return (
    typeof value === "number"
    && Number.isInteger(value)
    && value > 0
  );
}


function normalizarFavoritos(
  value: unknown,
): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const idsValidos =
    value.filter(
      esIdValido,
    );

  return Array.from(
    new Set(idsValidos),
  );
}


export function interpretarFavoritosStorage(
  value: string | null,
): number[] {
  if (!value) {
    return [];
  }

  try {
    const parsedValue: unknown =
      JSON.parse(value);

    return normalizarFavoritos(
      parsedValue,
    );
  } catch {
    return [];
  }
}


export function obtenerFavoritosStorage():
  number[] {
  try {
    const storedValue =
      window.localStorage.getItem(
        FAVORITOS_STORAGE_KEY,
      );

    return interpretarFavoritosStorage(
      storedValue,
    );
  } catch {
    return [];
  }
}


export function guardarFavoritosStorage(
  favoritosIds: number[],
) {
  try {
    const normalizedIds =
      normalizarFavoritos(
        favoritosIds,
      );

    window.localStorage.setItem(
      FAVORITOS_STORAGE_KEY,
      JSON.stringify(
        normalizedIds,
      ),
    );
  } catch {
    /*
     * La aplicación continúa funcionando
     * aunque localStorage no esté disponible.
     */
  }
}


export function limpiarFavoritosStorage() {
  try {
    window.localStorage.removeItem(
      FAVORITOS_STORAGE_KEY,
    );
  } catch {
    /*
     * No se requiere una acción adicional.
     */
  }
}