// src/features/catalogo/hooks/useCatalogoColumns.ts

import {
  useEffect,
  useState,
} from "react";


const BREAKPOINTS = {
  md: "(min-width: 768px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;


function getColumnCount() {
  if (
    window.matchMedia(
      BREAKPOINTS["2xl"],
    ).matches
  ) {
    return 5;
  }

  if (
    window.matchMedia(
      BREAKPOINTS.xl,
    ).matches
  ) {
    return 4;
  }

  if (
    window.matchMedia(
      BREAKPOINTS.md,
    ).matches
  ) {
    return 3;
  }

  return 2;
}


export default function useCatalogoColumns() {
  const [
    columnCount,
    setColumnCount,
  ] = useState(
    getColumnCount,
  );


  useEffect(() => {
    const mediaQueries =
      Object.values(
        BREAKPOINTS,
      ).map(
        (query) =>
          window.matchMedia(
            query,
          ),
      );


    function handleChange() {
      setColumnCount(
        getColumnCount(),
      );
    }


    mediaQueries.forEach(
      (mediaQuery) => {
        mediaQuery.addEventListener(
          "change",
          handleChange,
        );
      },
    );


    return () => {
      mediaQueries.forEach(
        (mediaQuery) => {
          mediaQuery.removeEventListener(
            "change",
            handleChange,
          );
        },
      );
    };
  }, []);


  return columnCount;
}