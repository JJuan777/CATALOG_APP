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

import { appRoutes } from "./routes";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path={appRoutes.home}
            element={<CatalogoPage />}
          />

          <Route
            path={appRoutes.catalogo}
            element={<CatalogoPage />}
          />

          <Route
            path={appRoutes.productoDetallePattern}
            element={<ProductoDetallePage />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to={appRoutes.home}
                replace
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}