import type { TCheckoutCustomizationSettings } from "../../domain/models/customizations.models";

export const CHECKOUT_CUSTOMIZATIONS = {
  header: {
    colorScheme: "COLOR_SCHEME2",
    logo: {
      maxWidth: 160,
    },
  },
  orderSummary: {
    colorScheme: "COLOR_SCHEME1",
  },
  control: {
    cornerRadius: "NONE",
  },
} satisfies TCheckoutCustomizationSettings;
