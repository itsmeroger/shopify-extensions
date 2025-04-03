import type { TShopConfigSchema } from "./shop-schema";

/**
 * PRODUCTION SHOP CONFIG - NON SENSITIVE TOKENS ONLY
 * API Keys, Domains and etc
 */
export const productionShopConfig = {
  NODE_ENV: "production",
  STOREFRONT_API_ACCESS_TOKEN: "[ACCESS_TOKEN]",
} satisfies TShopConfigSchema;
