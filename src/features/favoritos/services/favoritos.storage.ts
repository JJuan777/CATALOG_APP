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

  const idsValidos = value.filter(
    esIdValido,
  );

  return Array.from(
    new Set(idsValidos),
  );
}

export function obtenerFavoritosStorage():
  number[] {
  try {
    const storedValue =
      window.localStorage.getItem(
        FAVORITOS_STORAGE_KEY,
      );

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown =
      JSON.parse(storedValue);

    return normalizarFavoritos(
      parsedValue,
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
    // La aplicación continúa funcionando aunque
    // el navegador bloquee localStorage.
  }
}

export function limpiarFavoritosStorage() {
  try {
    window.localStorage.removeItem(
      FAVORITOS_STORAGE_KEY,
    );
  } catch {
    // No se requiere ninguna acción adicional.
  }
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