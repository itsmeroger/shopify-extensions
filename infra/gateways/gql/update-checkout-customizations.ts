import { shopifyAdminClient } from "../../clients/shopify-admin-client";
import type { TCheckoutCustomizationSettings } from "../../../domain/models/customizations.models";

const operation = `
  mutation UpdateCheckoutCustomizations($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
    checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
      checkoutBranding {
        customizations {
          header {
            logo {
              maxWidth
              image {
                url
                width
                height
                altText
              }
            }
            colorScheme
          }
          orderSummary {
            colorScheme
          }
          control {
            cornerRadius
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const updateCheckoutCustomizations = (params: {
  profileId: string;
  customizations: TCheckoutCustomizationSettings | null;
}) => {
  return shopifyAdminClient.request(operation, {
    variables: {
      checkoutProfileId: params.profileId,
      checkoutBrandingInput: {
        customizations: params.customizations,
      },
    },
  });
};
