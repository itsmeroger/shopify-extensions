import {
  HTTP_STATUS,
  type THttpStatus,
  type THttpClient,
  type THttpHeader,
  type THttpRequest,
  type THttpResponse,
  type THttpRequestConfig,
} from "../../data/protocols/http.protocols";

import { HttpError } from "../../data/errors/http.errors";

export class HttpFetchClient implements THttpClient {
  defaultHeaders?: THttpHeader | undefined;

  constructor(params?: { defaultHeaders?: THttpHeader }) {
    this.defaultHeaders = Object.assign(
      {
        "Content-Type": "application/json",
      },
      params?.defaultHeaders
    );
  }

  private parseHeaders(headers: Headers): THttpHeader {
    const parsedHeaders = {} as THttpHeader;

    headers.forEach((value, key) => {
      parsedHeaders[key] = value;
    });

    return parsedHeaders;
  }

  async request<TRequestBody, TResponseBody>(
    params: THttpRequest<TRequestBody>,
    config?: THttpRequestConfig
  ): Promise<THttpResponse<TResponseBody>> {
    const { domain } = config ?? {};
    const { url, headers, method, body } = params;

    const requestBody = JSON.stringify(body);
    const requestHeaders = Object.assign({}, this.defaultHeaders, headers);

    const input = domain ? new URL(url, domain).toString() : url;

    const response = await fetch(input, {
      method,
      body: requestBody,
      headers: requestHeaders,
    });

    const responseStatus = response.status ?? HTTP_STATUS.SERVER_ERROR;
    const responseMessage = response.statusText;

    if (!response.ok) {
      throw new HttpError<TRequestBody, TResponseBody>({
        request: params,
        message: responseMessage,
        status: responseStatus as THttpStatus,
      });
    }

    const responseBody: TResponseBody = await response.json();
    const responseHeaders = this.parseHeaders(response.headers);

    return {
      body: responseBody,
      headers: responseHeaders,
      status: responseStatus as THttpStatus,
    };
  }
}

export const httpClient = new HttpFetchClient();
