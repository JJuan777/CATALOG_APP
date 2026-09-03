// src/lib/http/httpClient.ts

import {
  env,
} from "@/config/env";

import {
  HttpError,
} from "./httpError";


type HttpBody =
  | BodyInit
  | Record<string, unknown>
  | unknown[]
  | null;


type HttpClientOptions =
  Omit<RequestInit, "body"> & {
    body?: HttpBody;

    errorMessage?: string;
  };


function buildUrl(
  endpoint: string,
) {
  const normalizedEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  return `${env.apiUrl}${normalizedEndpoint}`;
}


function isJsonContentType(
  contentType: string | null,
) {
  return Boolean(
    contentType?.includes(
      "application/json",
    ),
  );
}


function isBodyInit(
  body: HttpBody,
): body is BodyInit {
  return (
    typeof body === "string"
    || body instanceof FormData
    || body instanceof URLSearchParams
    || body instanceof Blob
    || body instanceof ArrayBuffer
  );
}


function prepareBody(
  body: HttpBody | undefined,
) {
  if (
    body === undefined
    || body === null
  ) {
    return {
      body: undefined,
      isJson: false,
    };
  }

  if (isBodyInit(body)) {
    return {
      body,
      isJson: false,
    };
  }

  return {
    body: JSON.stringify(body),
    isJson: true,
  };
}


async function parseResponse(
  response: Response,
): Promise<unknown> {
  if (
    response.status === 204
    || response.status === 205
  ) {
    return null;
  }

  const contentType =
    response.headers.get(
      "content-type",
    );

  if (
    isJsonContentType(
      contentType,
    )
  ) {
    return response.json();
  }

  const text =
    await response.text();

  return text || null;
}


function getErrorMessageFromData(
  data: unknown,
) {
  if (
    typeof data !== "object"
    || data === null
  ) {
    return null;
  }

  if (
    "detail" in data
    && typeof data.detail === "string"
  ) {
    return data.detail;
  }

  if (
    "message" in data
    && typeof data.message === "string"
  ) {
    return data.message;
  }

  if (
    "mensaje" in data
    && typeof data.mensaje === "string"
  ) {
    return data.mensaje;
  }

  return null;
}


export async function httpClient<T>(
  endpoint: string,
  options: HttpClientOptions = {},
): Promise<T> {
  const {
    body,
    headers,
    errorMessage =
      "No fue posible completar la solicitud.",
    ...requestOptions
  } = options;

  const preparedBody =
    prepareBody(
      body,
    );

  const requestHeaders =
    new Headers(headers);

  if (
    !requestHeaders.has(
      "Accept",
    )
  ) {
    requestHeaders.set(
      "Accept",
      "application/json",
    );
  }

  if (
    preparedBody.isJson
    && !requestHeaders.has(
      "Content-Type",
    )
  ) {
    requestHeaders.set(
      "Content-Type",
      "application/json",
    );
  }

  const response =
    await fetch(
      buildUrl(endpoint),
      {
        ...requestOptions,

        headers:
          requestHeaders,

        body:
          preparedBody.body,
      },
    );

  const data =
    await parseResponse(
      response,
    );

  if (!response.ok) {
    const apiMessage =
      getErrorMessageFromData(
        data,
      );

    throw new HttpError(
      apiMessage
      ?? errorMessage,
      response.status,
      data,
    );
  }

  return data as T;
}