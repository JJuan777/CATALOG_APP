// src/components/layout/Topbar.tsx

import {
  Heart,
  Home,
  Moon,
  Sun,
} from "lucide-react";

import {
  FaInstagram,
} from "react-icons/fa6";

import {
  NavLink,
} from "react-router-dom";

import useTheme from "@/hooks/useTheme";

export default function Topbar() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/80 bg-cream-50/85 backdrop-blur-xl transition-colors dark:border-brand-900/40 dark:bg-warm-900/85">
      <div className="flex h-[4.5rem] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          aria-label="Ir al catálogo"
          className="group flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <Heart
              aria-hidden="true"
              className="size-5"
              strokeWidth={2.2}
            />
          </span>

          <span className="min-w-0">
            <span className="block truncate font-display text-xl font-bold leading-none text-warm-900 dark:text-cream-50">
              Mi catálogo
            </span>

            <span className="mt-1 hidden text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-600 sm:block dark:text-brand-300">
              Detalles especiales
            </span>
          </span>
        </NavLink>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-2"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) => [
              "flex h-10 items-center gap-2 rounded-xl px-3",
              "text-sm font-bold transition-colors",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",
              isActive
                ? [
                    "bg-brand-100 text-brand-700",
                    "dark:bg-brand-900/40",
                    "dark:text-brand-200",
                  ].join(" ")
                : [
                    "text-warm-700",
                    "hover:bg-brand-100/70",
                    "hover:text-brand-700",
                    "dark:text-cream-200",
                    "dark:hover:bg-brand-900/30",
                    "dark:hover:text-brand-200",
                  ].join(" "),
            ].join(" ")}
          >
            <Home
              aria-hidden="true"
              className="size-[1.1rem]"
              strokeWidth={2}
            />

            <span className="hidden sm:inline">
              Inicio
            </span>
          </NavLink>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar Instagram"
            title="Instagram"
            className="flex size-10 items-center justify-center rounded-xl border border-brand-200/80 bg-white/70 text-brand-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-brand-900/60 dark:bg-warm-800 dark:text-brand-200 dark:hover:bg-brand-950/50"
          >
            <FaInstagram
              aria-hidden="true"
              className="size-5"
            />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Cambiar a tema claro"
                : "Cambiar a tema oscuro"
            }
            title={
              isDark
                ? "Cambiar a tema claro"
                : "Cambiar a tema oscuro"
            }
            className="flex size-10 items-center justify-center rounded-xl border border-brand-200/80 bg-white/70 text-brand-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-brand-900/60 dark:bg-warm-800 dark:text-brand-200 dark:hover:bg-brand-950/50"
          >
            {isDark ? (
              <Sun
                aria-hidden="true"
                className="size-5"
              />
            ) : (
              <Moon
                aria-hidden="true"
                className="size-5"
              />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}