// src/hooks/useTheme.ts

import {
  useCallback,
  useEffect,
  useState,
} from "react";


export type Theme =
  | "light"
  | "dark";


const THEME_STORAGE_KEY =
  "app-theme";


function isTheme(
  value: string | null,
): value is Theme {
  return (
    value === "light"
    || value === "dark"
  );
}


function getSystemTheme(): Theme {
  return window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";
}


function getInitialTheme(): Theme {
  const savedTheme =
    localStorage.getItem(
      THEME_STORAGE_KEY,
    );

  if (
    isTheme(
      savedTheme,
    )
  ) {
    return savedTheme;
  }

  return getSystemTheme();
}


export default function useTheme() {
  const [
    theme,
    setTheme,
  ] = useState<Theme>(
    getInitialTheme,
  );


  useEffect(() => {
    const rootElement =
      document.documentElement;

    const isDark =
      theme === "dark";

    rootElement.classList.toggle(
      "dark",
      isDark,
    );

    rootElement.style.colorScheme =
      theme;

    localStorage.setItem(
      THEME_STORAGE_KEY,
      theme,
    );
  }, [
    theme,
  ]);


  const toggleTheme =
    useCallback(() => {
      setTheme(
        (currentTheme) =>
          currentTheme === "dark"
            ? "light"
            : "dark",
      );
    }, []);


  return {
    theme,
    isDark:
      theme === "dark",
    toggleTheme,
  };
}