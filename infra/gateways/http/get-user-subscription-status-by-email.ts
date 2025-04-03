import {
  getUserSubscriptionStatusByEmailParams,
  getUserSubscriptionStatusByEmailResponse,
  type TGetUserSubscriptionStatusByEmailParams,
} from "../../../contracts/get-user-subscription-status-by-email";

import { httpClient } from "../../clients/http-fetch.client";
import type { THttpRequestConfig } from "../../../data/protocols";

export const getUserSubscriptionStatusByEmail = async (
  params: TGetUserSubscriptionStatusByEmailParams,
  options?: THttpRequestConfig
) => {
  const domain = options?.domain;

  const response = await httpClient.request(
    {
      method: "post",
      url: "/app/subscriptions/v3/subscriptionStatus",
      body: getUserSubscriptionStatusByEmailParams.parse(params),
    },
    {
      domain,
    }
  );

  return {
    ...response,
    body: getUserSubscriptionStatusByEmailResponse.parse(response.body),
  };
};
