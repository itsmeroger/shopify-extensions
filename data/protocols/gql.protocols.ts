import type { THttpHeader, THttpStatus } from "./http.protocols";

export type TBodyConstraints = Record<string, unknown> | undefined;

export interface TGqlRequest<TBody extends TBodyConstraints> {
  body?: TBody;
  operation: string;
  headers?: THttpHeader;
}

export interface TGqlRequestConfig {
  domain: string;
  apiVersion: string;
  accessToken: string;
}

export interface TGqlResponse<TBody> {
  body: TBody | null;
}

export interface TGqlClient {
  defaultHeaders?: THttpHeader;
  request: <
    TRequestBody extends TBodyConstraints,
    TResponseBody extends TBodyConstraints
  >(
    params: TGqlRequest<TRequestBody>,
    config: TGqlRequestConfig
  ) => Promise<TGqlResponse<TResponseBody>>;
}
