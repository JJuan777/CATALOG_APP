// src/hooks/useTheme.ts
import {
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "app-theme";

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(
    THEME_STORAGE_KEY,
  );

  if (
    savedTheme === "light"
    || savedTheme === "dark"
  ) {
    return savedTheme;
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";
}

export default function useTheme() {
  const [
    theme,
    setTheme,
  ] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.classList.toggle(
      "dark",
      theme === "dark",
    );

    rootElement.style.colorScheme = theme;

    localStorage.setItem(
      THEME_STORAGE_KEY,
      theme,
    );
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (
      currentTheme === "dark"
        ? "light"
        : "dark"
    ));
  }

  return {
    theme,
    toggleTheme,
  };
}