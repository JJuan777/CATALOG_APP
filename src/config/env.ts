// src/config/env.ts

const DEFAULT_API_URL =
  "http://127.0.0.1:8000/api";

function normalizeUrl(
  value: string,
) {
  return value.replace(/\/+$/, "");
}

export const env = {
  apiUrl: normalizeUrl(
    import.meta.env.VITE_API_URL
      ?? DEFAULT_API_URL,
  ),
} as const;