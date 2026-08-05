// src/app/App.tsx
import FavoritosProvider from "@/features/favoritos/context/FavoritosProvider";

import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <FavoritosProvider>
      <AppRouter />
    </FavoritosProvider>
  );
}