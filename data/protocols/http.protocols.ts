export const HTTP_STATUS = {
  SUCCESS: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

export const HTTP_METHODS = {
  GET: "get",
  PUT: "put",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete",
} as const;

export type THttpHeader = Record<string, string>;

export type THttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

export type THttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export interface THttpRequest<TBody> {
  url: string;
  body?: TBody;
  method: THttpMethod;
  headers?: THttpHeader;
}

export interface THttpRequestConfig {
  domain?: string;
}

export interface THttpResponse<TBody> {
  body: TBody | null;
  status: THttpStatus;
  headers: THttpHeader;
}

export interface THttpClient {
  defaultHeaders?: THttpHeader;
  request: <TRequestBody, TResponseBody>(
    params: THttpRequest<TRequestBody>,
    config?: THttpRequestConfig
  ) => Promise<THttpResponse<TResponseBody>>;
}
