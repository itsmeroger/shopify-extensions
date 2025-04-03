import { shopifyAdminClient } from "../../clients/shopify-admin-client";
import type { TThemeProfile } from "../../../domain/models/theme.models";

const operation = `
  query checkoutProfile {
    checkoutProfiles(first: 1, query: "is_published:true") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const getCheckoutThemeProfile = async () => {
  const response = await shopifyAdminClient.request(operation);
  const edges = response.data?.checkoutProfiles.edges ?? [];
  const node = edges.at(0)?.node;

  return node as TThemeProfile;
};
