// src/utils/formatters.ts

const currencyFormatter =
  new Intl.NumberFormat(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  );


const shortDateFormatter =
  new Intl.DateTimeFormat(
    "es-MX",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );


export function formatCurrency(
  value:
    | number
    | string
    | null
    | undefined,
) {
  if (
    value === null
    || value === undefined
    || value === ""
  ) {
    return "";
  }

  const numericValue =
    typeof value === "number"
      ? value
      : Number(value);

  if (
    !Number.isFinite(
      numericValue,
    )
  ) {
    return "";
  }

  return currencyFormatter.format(
    numericValue,
  );
}


export function formatShortDate(
  value:
    | string
    | Date
    | null
    | undefined,
) {
  if (!value) {
    return "";
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "";
  }

  return shortDateFormatter.format(
    date,
  );
}


export function formatPercentage(
  value:
    | number
    | null
    | undefined,
) {
  if (
    value === null
    || value === undefined
    || !Number.isFinite(value)
  ) {
    return "";
  }

  return `${Math.round(value)}%`;
}