// src\main.tsx
import {
  StrictMode,
} from "react";

import {
  createRoot,
} from "react-dom/client";

import "@fontsource-variable/manrope";
import "@fontsource-variable/playfair-display";

import App from "@/app/App";

import "@/styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "No se encontró el elemento raíz con el identificador 'root'.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);