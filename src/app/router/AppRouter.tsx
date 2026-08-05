// src/app/router/AppRouter.tsx
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import CatalogoPage from "@/features/catalogo/pages/CatalogoPage";
import ProductoDetallePage from "@/features/catalogo/pages/ProductoDetallePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<CatalogoPage />}
          />

          <Route
            path="/catalogo"
            element={<CatalogoPage />}
          />

          <Route
            path="/catalogo/productos/:slug"
            element={<ProductoDetallePage />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}