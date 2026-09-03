// src/lib/http/httpError.ts

export class HttpError extends Error {
  readonly status: number;
  readonly data: unknown;

  constructor(
    message: string,
    status: number,
    data: unknown = null,
  ) {
    super(message);

    this.name = "HttpError";
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(
      this,
      HttpError.prototype,
    );
  }
}