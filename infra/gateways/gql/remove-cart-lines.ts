import {
  removeCartLinesParams,
  type TRemoveCartLinesParams,
} from "../../../contracts/remove-cart-lines";
import { gqlStorefrontClient } from "../../clients/gql-storefront.client";
import type { TGqlRequestConfig } from "../../../data/protocols/gql.protocols";

const operation = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      userErrors {
        field
        message
      }
    }
  }
`;

export const removeCartLines = (
  params: TRemoveCartLinesParams,
  config: TGqlRequestConfig
) => {
  return gqlStorefrontClient.request(
    {
      operation,
      body: removeCartLinesParams.parse(params),
    },
    config
  );
};
