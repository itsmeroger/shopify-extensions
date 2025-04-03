import { z } from "zod";

export const shopConfigSchema = z.object({
  // CONFIGS
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  // - ADMIN
  ADMIN_API_ACCESS_TOKEN: z.string().optional(),
  ADMIN_API_VERSION: z.string().default("2024-04").optional(),

  // - STOREFRONT
  STOREFRONT_API_ACCESS_TOKEN: z.string(),
  STOREFRONT_API_VERSION: z.string().default("2024-04").optional(),

  // - DOMAINS
  CHECKOUT_DOMAIN: z.string().url(),
  PRE_PURCHASE_DOMAIN: z.string().url(),

});

export type TShopConfigSchema = z.infer<typeof shopConfigSchema>;
