import type { TShopConfigSchema } from "./shop-schema";
import { previewShopConfig } from "./shop.preview";
import { productionShopConfig } from "./shop.production";
import { developmentShopConfig } from "./shop.development";

const PRODUCTION_SHOP_DOMAIN = "[PRODUCTION_DOMAIN]";
const PREVIEW_SHOP_DOMAIN = "[PREVIEW_DOMAIN]";
const DEVELOPMENT_SHOP_DOMAIN = "[STAGING_DOMAIN]";

const SHOP_DOMAIN_CONFIG_MAP = {
  DEFAULT: developmentShopConfig,
  [PREVIEW_SHOP_DOMAIN]: previewShopConfig,
  [PRODUCTION_SHOP_DOMAIN]: productionShopConfig,
  [DEVELOPMENT_SHOP_DOMAIN]: developmentShopConfig,
};

export const getShopConfig = (shopDomain: string): TShopConfigSchema => {
  return shopDomain in SHOP_DOMAIN_CONFIG_MAP
    ? SHOP_DOMAIN_CONFIG_MAP[shopDomain]
    : SHOP_DOMAIN_CONFIG_MAP.DEFAULT;
};
