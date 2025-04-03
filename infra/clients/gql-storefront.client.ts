import {
  type TGqlClient,
  type TGqlRequest,
  type TGqlResponse,
  type TBodyConstraints,
  type TGqlRequestConfig,
} from "../../data/protocols/gql.protocols";

import {
  type THttpHeader,
  type THttpStatus,
} from "../../data/protocols/http.protocols";

import { GqlError } from "../../data/errors/gql.errors";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export class GqlStorefrontClient implements TGqlClient {
  defaultHeaders?: THttpHeader | undefined;

  constructor(params?: { defaultHeaders?: THttpHeader }) {
    this.defaultHeaders = params?.defaultHeaders;
  }

  async request<TRequestBody extends TBodyConstraints, TResponseBody>(
    params: TGqlRequest<TRequestBody>,
    config: TGqlRequestConfig
  ): Promise<TGqlResponse<TResponseBody>> {
    const { body, headers, operation } = params;

    const requestHeaders = Object.assign({}, this.defaultHeaders, headers);

    const client = createStorefrontApiClient({
      storeDomain: config.domain,
      apiVersion: config.apiVersion,
      publicAccessToken: config.accessToken,
    });

    const { data, errors } = await client.request(operation, {
      variables: body,
      headers: requestHeaders,
    });

    const response: TGqlResponse<TResponseBody> = {
      body: data,
    };

    if (errors) {
      throw new GqlError({
        response,
        request: params,
        message: errors.message,
        status: errors.networkStatusCode as THttpStatus,
      });
    }

    return response;
  }
}

export const gqlStorefrontClient = new GqlStorefrontClient();
