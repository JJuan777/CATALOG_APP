// src/features/catalogo/hooks/useProductoCompartir.ts
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  buildProductoCompartirData,
} from "../utils/productoCompartir.utils";

import type {
  ProductoDetalle,
} from "../types/catalogo.types";

async function copyWithFallback(
  value: string,
) {
  if (
    navigator.clipboard
    && window.isSecureContext
  ) {
    await navigator.clipboard.writeText(
      value,
    );

    return;
  }

  const textarea =
    document.createElement(
      "textarea",
    );

  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.appendChild(
    textarea,
  );

  textarea.focus();
  textarea.select();

  const copied =
    document.execCommand(
      "copy",
    );

  document.body.removeChild(
    textarea,
  );

  if (!copied) {
    throw new Error(
      "No fue posible copiar el enlace.",
    );
  }
}

function openExternalUrl(
  url: string,
) {
  window.open(
    url,
    "_blank",
    "noopener,noreferrer",
  );
}

export default function useProductoCompartir(
  producto: ProductoDetalle,
) {
  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const resetTimerRef =
    useRef<number | null>(null);

  const shareData = useMemo(
    () => (
      buildProductoCompartirData(
        producto,
      )
    ),
    [producto],
  );

  const canUseNativeShare =
    typeof navigator.share === "function";

  useEffect(() => (
    () => {
      if (resetTimerRef.current) {
        window.clearTimeout(
          resetTimerRef.current,
        );
      }
    }
  ), []);

  async function copyMessageAndLink() {
    try {
      setError(null);

      await copyWithFallback(
        shareData.mensajeCompleto,
      );

      setCopied(true);

      if (resetTimerRef.current) {
        window.clearTimeout(
          resetTimerRef.current,
        );
      }

      resetTimerRef.current =
        window.setTimeout(
          () => {
            setCopied(false);
          },
          2500,
        );
    } catch {
      setCopied(false);

      setError(
        "No fue posible copiar. Intenta nuevamente.",
      );
    }
  }

  async function nativeShare() {
    if (!canUseNativeShare) {
      return;
    }

    try {
      setError(null);

      await navigator.share({
        title: shareData.titulo,
        text: shareData.mensaje,
        url: shareData.enlace,
      });
    } catch (shareError) {
      if (
        shareError instanceof DOMException
        && shareError.name === "AbortError"
      ) {
        return;
      }

      setError(
        "No fue posible abrir las opciones para compartir.",
      );
    }
  }

  function shareOnWhatsApp() {
    openExternalUrl(
      shareData.whatsappUrl,
    );
  }

  function shareOnFacebook() {
    openExternalUrl(
      shareData.facebookUrl,
    );
  }

  function shareOnX() {
    openExternalUrl(
      shareData.xUrl,
    );
  }

  return {
    shareData,
    copied,
    error,
    canUseNativeShare,
    copyMessageAndLink,
    nativeShare,
    shareOnWhatsApp,
    shareOnFacebook,
    shareOnX,
  };
}