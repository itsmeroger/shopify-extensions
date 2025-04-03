import { COLOR_SCHEME_MAP } from "../../config/checkout/theme";
import { CHECKOUT_CUSTOMIZATIONS } from "../../config/checkout/customizations";
import { getCheckoutThemeProfile } from "../../infra/gateways/gql/get-checkout-theme-profile";
import { updateCheckoutColorScheme } from "../../infra/gateways/gql/update-checkout-color-scheme";
import { updateCheckoutCustomizations } from "../../infra/gateways/gql/update-checkout-customizations";

export const updateCheckoutLayout = async () => {
  const profile = await getCheckoutThemeProfile();
  const profileId = profile.id;

  const updateColorSchemePromises = Object.entries(COLOR_SCHEME_MAP).map(
    ([schemeId, scheme]) => {
      return updateCheckoutColorScheme({
        scheme,
        schemeId,
        profileId,
      });
    }
  );

  await Promise.all(updateColorSchemePromises);

  return updateCheckoutCustomizations({
    profileId,
    customizations: CHECKOUT_CUSTOMIZATIONS,
  });
};
