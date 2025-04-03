import type { THttpRequest, THttpResponse, THttpStatus } from "../protocols";

export class HttpError<TRequestBody, TResponseBody> extends Error {
  public status: THttpStatus;
  public request: THttpRequest<TRequestBody>;
  public response?: THttpResponse<TResponseBody>;

  constructor(params: {
    message?: string;
    status: THttpStatus;
    request: THttpRequest<TRequestBody>;
    response?: THttpResponse<TResponseBody>;
  }) {
    super(params.message);

    this.status = params.status;
    this.request = params.request;
    this.response = params.response;
  }
}
