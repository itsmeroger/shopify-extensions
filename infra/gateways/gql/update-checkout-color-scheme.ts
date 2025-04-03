import { shopifyAdminClient } from "../../clients/shopify-admin-client";
import type { TThemeColorScheme } from "../../../domain/models/theme.models";

export const updateCheckoutColorScheme = (params: {
  profileId: string;
  schemeId?: string;
  scheme: TThemeColorScheme | null;
}) => {
  const schemeId = params.schemeId ?? "scheme1";

  const operation = `
    mutation UpdateCheckoutDesignSystem(
      $checkoutBrandingInput: CheckoutBrandingInput!
      $checkoutProfileId: ID!
    ) {
      checkoutBrandingUpsert(
        checkoutBrandingInput: $checkoutBrandingInput
        checkoutProfileId: $checkoutProfileId
      ) {
        checkoutBranding {
          designSystem {
            colors {
              schemes {
                ${schemeId} {
                  base {
                    accent
                    background
                    border
                    decorative
                    icon
                    text
                  }
                  control {
                    accent
                    background
                    border
                    decorative
                    icon
                    text
                  }
                  primaryButton {
                    hover {
                      accent
                      background
                      border
                      decorative
                      icon
                      text
                    }
                  }
                  secondaryButton {
                    hover {
                      accent
                      background
                      border
                      decorative
                      icon
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyAdminClient.request(operation, {
    variables: {
      checkoutProfileId: params.profileId,
      checkoutBrandingInput: {
        designSystem: {
          colors: {
            schemes: {
              [schemeId]: params.scheme,
            },
          },
        },
      },
    },
  });
};
