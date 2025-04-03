import {
  Link,
  Text,
  useApi,
  Checkbox,
  useSettings,
  useTranslate,
  reactExtension,
  useBuyerJourneyIntercept,
} from "@shopify/ui-extensions-react/checkout";

import {
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH,
  CANCELLATION_POLICY_PATH,
} from "../../../constants/paths";

import { useState } from "react";
import { getPageUrl } from "../../../utils/paths";
import { getShopConfig } from "../../../config/shop";
import { RETURN_POLICY_URL } from "../../../constants/urls";

export default reactExtension("purchase.checkout.actions.render-before", () => (
  <Extension />
));

function Extension() {
  const { shop } = useApi();
  const translate = useTranslate();
  const shopConfig = getShopConfig(shop.myshopifyDomain);
  const settings = useSettings();
  const [validationError, setValidationError] = useState("");
  const [acceptedTermsOfService, setAcceptedTermsOfService] = useState(false);

  const returnPolicyLink = (settings["return_policy_link"] ??
    RETURN_POLICY_URL) as string;

  const privacyPolicyLink = (settings["privacy_policy_link"] ??
    getPageUrl(shopConfig.PRE_PURCHASE_DOMAIN, PRIVACY_POLICY_PATH)) as string;

  const termsOfServiceLink = (settings["terms_of_service_link"] ??
    getPageUrl(
      shopConfig.PRE_PURCHASE_DOMAIN,
      TERMS_OF_SERVICE_PATH
    )) as string;

  const cancellationPolicyLink = (settings["cancellation_policy_link"] ??
    getPageUrl(
      shopConfig.PRE_PURCHASE_DOMAIN,
      CANCELLATION_POLICY_PATH
    )) as string;

  const clearValidationErrors = () => {
    setValidationError("");
  };

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && !acceptedTermsOfService) {
      return {
        behavior: "block",
        reason: translate("reason_terms_of_service"),
        perform: (result) => {
          if (result.behavior === "block") {
            setValidationError(translate("error_terms_of_service"));
          }
        },
      };
    }

    return {
      behavior: "allow",
      perform: () => {
        clearValidationErrors();
      },
    };
  });

  return (
    <Checkbox
      error={validationError}
      value={acceptedTermsOfService}
      onChange={setAcceptedTermsOfService}
    >
      <Text>
        {translate("i_agree_to")}{" "}
        <Link to={termsOfServiceLink}>{translate("terms_of_service")}</Link>,{" "}
        <Link to={privacyPolicyLink}>{translate("privacy_policy")}</Link>,{" "}
        <Link to={returnPolicyLink}>{translate("return_policy")}</Link>,{" "}
        <Link to={cancellationPolicyLink}>
          {translate("cancellation_policy")}
        </Link>
        .
      </Text>
    </Checkbox>
  );
}
