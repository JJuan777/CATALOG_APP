// src/features/catalogo/hooks/useCatalogoColumns.ts
import {
  useEffect,
  useState,
} from "react";

function getColumnCount() {
  const width = window.innerWidth;

  if (width >= 1536) {
    return 5;
  }

  if (width >= 1280) {
    return 4;
  }

  if (width >= 768) {
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
    function handleResize() {
      setColumnCount(
        getColumnCount(),
      );
    }

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  return columnCount;
}