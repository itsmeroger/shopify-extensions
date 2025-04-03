import { createAdminApiClient } from "@shopify/admin-api-client";

export const shopifyAdminClient = createAdminApiClient({
  apiVersion: process.env.API_VERSION ?? "",
  storeDomain: process.env.STORE_DOMAIN ?? "",
  accessToken: process.env.ACCESS_TOKEN ?? "",
});
