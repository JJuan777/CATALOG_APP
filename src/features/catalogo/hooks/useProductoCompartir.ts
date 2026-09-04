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


const COPY_FEEDBACK_DURATION =
  2500;


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
  textarea.style.position =
    "fixed";
  textarea.style.opacity =
    "0";
  textarea.style.pointerEvents =
    "none";

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
      "No fue posible copiar el contenido.",
    );
  }
}


function openExternalUrl(
  url: string,
) {
  const newWindow =
    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );

  if (!newWindow) {
    throw new Error(
      "No fue posible abrir la ventana para compartir.",
    );
  }
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
  ] = useState<
    string | null
  >(null);

  const resetTimerRef =
    useRef<number | null>(
      null,
    );


  const shareData =
    useMemo(
      () =>
        buildProductoCompartirData(
          producto,
        ),
      [producto],
    );


  const canUseNativeShare =
    typeof navigator.share
      === "function";


  useEffect(() => {
    setCopied(false);
    setError(null);
  }, [
    producto.id,
  ]);


  useEffect(() => {
    return () => {
      if (
        resetTimerRef.current
        !== null
      ) {
        window.clearTimeout(
          resetTimerRef.current,
        );
      }
    };
  }, []);


  function clearCopyTimer() {
    if (
      resetTimerRef.current
      === null
    ) {
      return;
    }

    window.clearTimeout(
      resetTimerRef.current,
    );

    resetTimerRef.current =
      null;
  }


  async function copyMessageAndLink() {
    try {
      setError(null);

      await copyWithFallback(
        shareData.mensajeCompleto,
      );

      clearCopyTimer();

      setCopied(true);

      resetTimerRef.current =
        window.setTimeout(
          () => {
            setCopied(false);

            resetTimerRef.current =
              null;
          },
          COPY_FEEDBACK_DURATION,
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
        title:
          shareData.titulo,

        text:
          shareData.mensaje,

        url:
          shareData.enlace,
      });
    } catch (shareError) {
      if (
        shareError
          instanceof DOMException
        && shareError.name
          === "AbortError"
      ) {
        return;
      }

      setError(
        "No fue posible abrir las opciones para compartir.",
      );
    }
  }


  function shareOnWhatsApp() {
    try {
      setError(null);

      openExternalUrl(
        shareData.whatsappUrl,
      );
    } catch {
      setError(
        "No fue posible abrir WhatsApp.",
      );
    }
  }


  function shareOnFacebook() {
    try {
      setError(null);

      openExternalUrl(
        shareData.facebookUrl,
      );
    } catch {
      setError(
        "No fue posible abrir Facebook.",
      );
    }
  }


  function shareOnX() {
    try {
      setError(null);

      openExternalUrl(
        shareData.xUrl,
      );
    } catch {
      setError(
        "No fue posible abrir X.",
      );
    }
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