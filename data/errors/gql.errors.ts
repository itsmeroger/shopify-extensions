import type {
  TGqlRequest,
  TGqlResponse,
  TBodyConstraints,
} from "../protocols/gql.protocols";
import type { THttpStatus } from "../protocols/http.protocols";

export class GqlError<
  TRequestBody extends TBodyConstraints,
  TResponseBody
> extends Error {
  public status: THttpStatus;
  public request: TGqlRequest<TRequestBody>;
  public response?: TGqlResponse<TResponseBody>;

  constructor(params: {
    message?: string;
    status: THttpStatus;
    request: TGqlRequest<TRequestBody>;
    response?: TGqlResponse<TResponseBody>;
  }) {
    super(params.message);

    this.status = params.status;
    this.request = params.request;
    this.response = params.response;
  }
}
