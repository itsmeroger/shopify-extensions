import type { TShopConfigSchema } from "./shop-schema";

/**
 * DEVELOPMENT SHOP CONFIG - NON SENSITIVE TOKENS ONLY
 * API Keys, Domains and etc
 */
export const developmentShopConfig = {
  NODE_ENV: "development",
  STOREFRONT_API_ACCESS_TOKEN: "[ACCESS_TOKEN]",
} satisfies TShopConfigSchema;
