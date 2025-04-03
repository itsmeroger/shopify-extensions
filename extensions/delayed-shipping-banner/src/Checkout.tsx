import type {
  CartLine,
  ShippingAddress,
} from "@shopify/ui-extensions/checkout";

import {
  Text,
  Banner,
  useSettings,
  useCartLines,
  useTranslate,
  reactExtension,
  useShippingAddress,
} from "@shopify/ui-extensions-react/checkout";

import { useMemo } from "react";
import { multiLineTextToArray } from "../../../utils/settings";

const SHIPPING_MODALITIES = {
  ALL: "all",
  DOMESTIC: "domestic",
  INTERNATIONAL: "international",
} as const;

type TShippingModality =
  (typeof SHIPPING_MODALITIES)[keyof typeof SHIPPING_MODALITIES];

interface TSettings {
  delayedProductsSku?: string;
  domesticCountryCodes?: string;
  delayedShippingModality?: TShippingModality;
}

export default reactExtension(
  "purchase.checkout.delivery-address.render-before",
  () => <Extension />
);

const getDelayedProducts = (params?: {
  cartLines: CartLine[];
  delayedProductsSku?: string[];
}) => {
  const { cartLines, delayedProductsSku } = params ?? {};

  if (!Array.isArray(delayedProductsSku)) return;

  const delayedProducts = cartLines.filter((cartLine) => {
    const { sku } = cartLine.merchandise;

    return delayedProductsSku.includes(sku);
  });

  return delayedProducts;
};

const getIsUnderDelayZone = (params?: {
  domesticCountryCodes?: string[];
  shippingAddress?: ShippingAddress;
  delayedShippingModality?: TShippingModality;
}) => {
  const { shippingAddress, domesticCountryCodes, delayedShippingModality } =
    params ?? {};

  const { countryCode } = shippingAddress ?? {};

  if (!countryCode) return;

  const isDomesticDelivery = domesticCountryCodes?.includes(countryCode);

  switch (delayedShippingModality) {
    case SHIPPING_MODALITIES.DOMESTIC:
      return isDomesticDelivery;

    case SHIPPING_MODALITIES.INTERNATIONAL:
      return !isDomesticDelivery;

    default:
      return true;
  }
};

const getJoinedProductNames = (params?: {
  connector: string;
  separator: string;
  cartLines?: CartLine[];
}) => {
  const { connector, separator, cartLines } = params ?? {};

  if (!Array.isArray(cartLines)) return;

  const productNames = cartLines.map((cartLine) => cartLine.merchandise.title);

  const separatedProductNames = productNames.slice(0, -1).join(separator);

  const lastProductName = productNames.at(-1);

  if (!separatedProductNames.length) return lastProductName;

  const joinedProductNames = [separatedProductNames, lastProductName].join(
    connector
  );

  return joinedProductNames;
};

function Extension() {
  const settings = useSettings() as TSettings;
  const cartLines = useCartLines();
  const translate = useTranslate();
  const shippingAddress = useShippingAddress();

  const {
    minDelayDays = 5,
    maxDelayDays = 10,
    delayedShippingModality = "all",
  } = settings;

  const delayedProductsSku = multiLineTextToArray(settings.delayedProductsSku);

  const domesticCountryCodes = multiLineTextToArray(
    settings.domesticCountryCodes
  );

  const isUnderDelayZone = getIsUnderDelayZone({
    shippingAddress,
    domesticCountryCodes,
    delayedShippingModality,
  });

  const delayedProducts = useMemo(
    () =>
      getDelayedProducts({
        cartLines,
        delayedProductsSku,
      }),
    [cartLines]
  );

  const joinedProductNames = getJoinedProductNames({
    cartLines: delayedProducts,
    connector: translate("connector"),
    separator: translate("separator"),
  });

  const hasMultipleDelays = delayedProducts.length > 1;

  const messageKey = hasMultipleDelays ? "delayed_products" : "delayed_product";

  const isVisible = isUnderDelayZone && delayedProducts?.length;

  if (!isVisible) return null;

  return (
    <Banner status="warning">
      {translate(messageKey, {
        minDelayDays,
        maxDelayDays,
        products: <Text emphasis="italic">{joinedProductNames}</Text>,
      })}
    </Banner>
  );
}
