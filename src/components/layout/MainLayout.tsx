// src/components/layout/MainLayout.tsx

import {
  Outlet,
} from "react-router-dom";

import Topbar
  from "./Topbar";


export default function MainLayout() {
  return (
    <div
      className={[
        "relative",
        "min-h-dvh",
        "overflow-x-hidden",
        "bg-cream-50",
        "text-warm-900",
        "transition-colors",
        "duration-300",

        "dark:bg-warm-900",
        "dark:text-cream-100",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "fixed inset-x-0 top-0",
          "z-0",
          "h-96",

          "bg-[radial-gradient(circle_at_top_left,rgba(251,113,141,0.14),transparent_45%)]",

          "dark:bg-[radial-gradient(circle_at_top_left,rgba(240,68,104,0.12),transparent_42%)]",
        ].join(" ")}
      />

      <Topbar />

      <main
        className={[
          "relative z-10",
          "min-h-[calc(100dvh-4.5rem)]",
        ].join(" ")}
      >
        <Outlet />
      </main>
    </div>
  );
}