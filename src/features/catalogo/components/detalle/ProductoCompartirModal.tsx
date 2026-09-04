// src/features/catalogo/components/detalle/ProductoCompartirModal.tsx

import {
  useEffect,
  useRef,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  createPortal,
} from "react-dom";

import {
  Check,
  Copy,
  Share2,
  X,
} from "lucide-react";

import {
  FaFacebookF,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import useProductoCompartir
  from "../../hooks/useProductoCompartir";

import type {
  ProductoDetalle,
} from "../../types/catalogo.types";


type ProductoCompartirModalProps = {
  open: boolean;
  producto: ProductoDetalle;
  onClose: () => void;
};


type ShareOptionProps = {
  label: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
};


const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");


function ShareOption({
  label,
  description,
  icon,
  onClick,
}: ShareOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex min-h-16 w-full",
        "items-center gap-3",
        "rounded-2xl",
        "border border-brand-100",
        "bg-white",
        "p-3",
        "text-left",
        "transition",

        "hover:border-brand-300",
        "hover:bg-brand-50",
        "active:scale-[0.98]",

        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-brand-500",

        "dark:border-brand-900/50",
        "dark:bg-warm-900",
        "dark:hover:bg-brand-950/30",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "flex size-11 shrink-0",
          "items-center justify-center",
          "rounded-xl",
          "bg-brand-100",
          "text-brand-700",

          "dark:bg-brand-950/50",
          "dark:text-brand-200",
        ].join(" ")}
      >
        {icon}
      </span>

      <span className="min-w-0">
        <strong
          className={[
            "block text-sm",
            "text-warm-900",
            "dark:text-cream-50",
          ].join(" ")}
        >
          {label}
        </strong>

        <span
          className={[
            "mt-0.5 block",
            "text-xs",
            "text-warm-700/70",
            "dark:text-cream-200/60",
          ].join(" ")}
        >
          {description}
        </span>
      </span>
    </button>
  );
}


export default function ProductoCompartirModal({
  open,
  producto,
  onClose,
}: ProductoCompartirModalProps) {
  const dialogRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const closeButtonRef =
    useRef<HTMLButtonElement | null>(
      null,
    );

  const previousFocusedElementRef =
    useRef<HTMLElement | null>(
      null,
    );

  const {
    shareData,
    copied,
    error,
    canUseNativeShare,
    copyMessageAndLink,
    nativeShare,
    shareOnWhatsApp,
    shareOnFacebook,
    shareOnX,
  } = useProductoCompartir(
    producto,
  );


  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusedElementRef.current =
      document.activeElement
        instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";


    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape"
      ) {
        onClose();
        return;
      }

      if (
        event.key !== "Tab"
        || !dialogRef.current
      ) {
        return;
      }

      const focusableElements =
        Array.from(
          dialogRef.current
            .querySelectorAll<HTMLElement>(
              FOCUSABLE_SELECTOR,
            ),
        );

      if (
        focusableElements.length === 0
      ) {
        event.preventDefault();
        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey
        && document.activeElement
          === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey
        && document.activeElement
          === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }


    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    window.requestAnimationFrame(
      () => {
        closeButtonRef.current
          ?.focus();
      },
    );


    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      previousFocusedElementRef.current
        ?.focus();
    };
  }, [
    open,
    onClose,
  ]);


  if (!open) {
    return null;
  }


  return createPortal(
    <div
      className={[
        "fixed inset-0",
        "z-[120]",
        "flex items-end",
        "justify-center",
        "bg-warm-900/45",
        "backdrop-blur-sm",

        "sm:items-center",
        "sm:p-5",
      ].join(" ")}
    >
      <button
        type="button"
        aria-label="Cerrar opciones para compartir"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="producto-compartir-titulo"
        aria-describedby="producto-compartir-descripcion"
        className={[
          "relative",
          "max-h-[90dvh]",
          "w-full",
          "overflow-y-auto",
          "rounded-t-[2rem]",
          "bg-cream-50",
          "shadow-2xl",

          "sm:max-w-md",
          "sm:rounded-[2rem]",

          "dark:bg-warm-800",
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className={[
            "flex justify-center",
            "py-2",
            "sm:hidden",
          ].join(" ")}
        >
          <span
            className={[
              "h-1.5 w-12",
              "rounded-full",
              "bg-brand-200",
              "dark:bg-brand-900",
            ].join(" ")}
          />
        </div>

        <header
          className={[
            "flex items-center",
            "justify-between",
            "gap-4",
            "border-b",
            "border-brand-100",
            "px-5 pb-4 pt-2",

            "sm:pt-5",

            "dark:border-brand-900/40",
          ].join(" ")}
        >
          <div className="min-w-0">
            <h2
              id="producto-compartir-titulo"
              className={[
                "font-display",
                "text-2xl font-bold",
                "text-warm-900",
                "dark:text-cream-50",
              ].join(" ")}
            >
              Compartir detalle
            </h2>

            <p
              id="producto-compartir-descripcion"
              className={[
                "mt-1 line-clamp-1",
                "text-xs font-medium",
                "text-warm-700",
                "dark:text-cream-200/70",
              ].join(" ")}
            >
              {producto.nombre}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className={[
              "flex size-10 shrink-0",
              "items-center",
              "justify-center",
              "rounded-full",
              "bg-brand-50",
              "text-brand-700",
              "transition",

              "hover:bg-brand-100",
              "active:scale-95",

              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-500",

              "dark:bg-brand-950/40",
              "dark:text-brand-200",
            ].join(" ")}
          >
            <X
              aria-hidden="true"
              className="size-5"
            />
          </button>
        </header>

        <div
          className={[
            "p-5",
            "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
          ].join(" ")}
        >
          <div
            className={[
              "rounded-2xl",
              "border border-brand-100",
              "bg-white",
              "p-4",

              "dark:border-brand-900/50",
              "dark:bg-warm-900",
            ].join(" ")}
          >
            <p
              className={[
                "line-clamp-5",
                "whitespace-pre-line",
                "text-sm leading-6",
                "text-warm-700",
                "dark:text-cream-200",
              ].join(" ")}
            >
              {shareData.mensaje}
            </p>

            <p
              className={[
                "mt-3 truncate",
                "text-xs font-bold",
                "text-brand-600",
                "dark:text-brand-300",
              ].join(" ")}
            >
              {shareData.enlace}
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            <ShareOption
              label="WhatsApp"
              description="Enviar mensaje y enlace"
              icon={
                <FaWhatsapp className="size-5" />
              }
              onClick={
                shareOnWhatsApp
              }
            />

            <ShareOption
              label="Facebook"
              description="Compartir el enlace en Facebook"
              icon={
                <FaFacebookF className="size-5" />
              }
              onClick={
                shareOnFacebook
              }
            />

            <ShareOption
              label="X"
              description="Publicar el detalle en X"
              icon={
                <FaXTwitter className="size-5" />
              }
              onClick={shareOnX}
            />

            <ShareOption
              label={
                copied
                  ? "Mensaje copiado"
                  : "Copiar mensaje y enlace"
              }
              description={
                copied
                  ? "Ya puedes pegarlo donde quieras"
                  : "Copiar al portapapeles"
              }
              icon={
                copied
                  ? (
                      <Check className="size-5" />
                    )
                  : (
                      <Copy className="size-5" />
                    )
              }
              onClick={() => {
                void copyMessageAndLink();
              }}
            />

            {canUseNativeShare && (
              <ShareOption
                label="Más opciones"
                description="Abrir aplicaciones del dispositivo"
                icon={
                  <Share2 className="size-5" />
                }
                onClick={() => {
                  void nativeShare();
                }}
              />
            )}
          </div>

          {error && (
            <p
              role="alert"
              className={[
                "mt-4",
                "rounded-xl",
                "bg-brand-100",
                "px-3 py-2",
                "text-xs font-bold",
                "text-brand-700",

                "dark:bg-brand-950/40",
                "dark:text-brand-200",
              ].join(" ")}
            >
              {error}
            </p>
          )}

          <p
            aria-live="polite"
            className="sr-only"
          >
            {copied
              ? "Mensaje y enlace copiados."
              : ""}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}