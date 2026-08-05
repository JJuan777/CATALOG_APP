// src/features/favoritos/context/FavoritosProvider.tsx
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  FAVORITOS_STORAGE_KEY,
} from "../constants/favoritos.constants";

import {
  guardarFavoritosStorage,
  interpretarFavoritosStorage,
  limpiarFavoritosStorage,
  obtenerFavoritosStorage,
} from "../services/favoritos.storage";

import type {
  FavoritosContextValue,
} from "../types/favoritos.types";

import FavoritosContext from "./FavoritosContext";

type FavoritosProviderProps = {
  children: ReactNode;
};

export default function FavoritosProvider({
  children,
}: FavoritosProviderProps) {
  const [
    favoritosIds,
    setFavoritosIds,
  ] = useState<number[]>(
    obtenerFavoritosStorage,
  );

  useEffect(() => {
    function handleStorage(
      event: StorageEvent,
    ) {
      if (
        event.key
        !== FAVORITOS_STORAGE_KEY
      ) {
        return;
      }

      setFavoritosIds(
        interpretarFavoritosStorage(
          event.newValue,
        ),
      );
    }

    window.addEventListener(
      "storage",
      handleStorage,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  const esFavorito = useCallback(
    (
      productoId: number,
    ) => (
      favoritosIds.includes(
        productoId,
      )
    ),
    [favoritosIds],
  );

  const alternarFavorito = useCallback(
    (
      productoId: number,
    ) => {
      setFavoritosIds(
        (currentIds) => {
          const isFavorite =
            currentIds.includes(
              productoId,
            );

          const nextIds = isFavorite
            ? currentIds.filter(
                (currentId) => (
                  currentId
                  !== productoId
                ),
              )
            : [
                ...currentIds,
                productoId,
              ];

          guardarFavoritosStorage(
            nextIds,
          );

          return nextIds;
        },
      );
    },
    [],
  );

  const eliminarFavorito = useCallback(
    (
      productoId: number,
    ) => {
      setFavoritosIds(
        (currentIds) => {
          const nextIds =
            currentIds.filter(
              (currentId) => (
                currentId
                !== productoId
              ),
            );

          guardarFavoritosStorage(
            nextIds,
          );

          return nextIds;
        },
      );
    },
    [],
  );

  const limpiarFavoritos = useCallback(
    () => {
      setFavoritosIds([]);
      limpiarFavoritosStorage();
    },
    [],
  );

  const contextValue =
    useMemo<FavoritosContextValue>(
      () => ({
        favoritosIds,
        totalFavoritos:
          favoritosIds.length,
        esFavorito,
        alternarFavorito,
        eliminarFavorito,
        limpiarFavoritos,
      }),
      [
        alternarFavorito,
        eliminarFavorito,
        esFavorito,
        favoritosIds,
        limpiarFavoritos,
      ],
    );

  return (
    <FavoritosContext.Provider
      value={contextValue}
    >
      {children}
    </FavoritosContext.Provider>
  );
}