// src/app/providers/AppProviders.tsx

import type {
  PropsWithChildren,
} from "react";

import FavoritosProvider
  from "@/features/favoritos/context/FavoritosProvider";


export default function AppProviders({
  children,
}: PropsWithChildren) {
  return (
    <FavoritosProvider>
      {children}
    </FavoritosProvider>
  );
}