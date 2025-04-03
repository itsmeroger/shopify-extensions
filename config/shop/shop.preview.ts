import type { TShopConfigSchema } from "./shop-schema";

/**
 * PREVIEW SHOP CONFIG - NON SENSITIVE TOKENS ONLY
 * API Keys, Domains and etc
 */
export const previewShopConfig = {
  NODE_ENV: "development",
  STOREFRONT_API_ACCESS_TOKEN: "[ACCESS_TOKEN]",
} satisfies TShopConfigSchema;
