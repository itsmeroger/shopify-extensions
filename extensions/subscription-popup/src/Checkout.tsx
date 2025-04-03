import {
  Link,
  useApi,
  Button,
  Banner,
  TextBlock,
  useSettings,
  InlineStack,
  BlockLayout,
  useTranslate,
  reactExtension,
  useApplyCartLinesChange,
  useBuyerJourneyIntercept,
} from "@shopify/ui-extensions-react/checkout";

import { getPageUrl } from "../../../utils/paths";
import { useEffect, useRef, useState } from "react";
import { ONE_SECOND } from "../../../constants/time";
import { getShopConfig } from "../../../config/shop";
import { SUPPORT_PAGE_URL } from "../../../constants/urls";
import { validateCart } from "../../../data/use-cases/validate-cart";
import { CART_PAGE_PATH, SEARCH_BUNDLES_PATH } from "../../../constants/paths";
import { ActiveSubscriptionsError } from "../../../domain/errors/active-subscriptions-error";
import { CanceledSubscriptionsError } from "../../../domain/errors/canceled-subscriptions-error";
import { getUserSubscriptionStatusByEmail } from "../../../infra/gateways/http/get-user-subscription-status-by-email";

const ERRORS_INITIAL_STATE = {
  hasActiveSubscription: false,
  hasCanceledSubscription: false,
};

const CLEANUP_TIMEOUT = 30 * ONE_SECOND;

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const settings = useSettings();
  const translate = useTranslate();
  const isLoadingRef = useRef(false);
  const errorsRef = useRef(ERRORS_INITIAL_STATE);
  const { shop, lines, buyerIdentity } = useApi();
  const [showBanner, setShowBanner] = useState(false);
  const shopConfig = getShopConfig(shop.myshopifyDomain);
  const applyCartLinesChange = useApplyCartLinesChange();
  const cartCleanupTimeoutRef = useRef<NodeJS.Timeout>(null);

  const searchBundlesLink = (settings["search_bundles_link"] ??
    getPageUrl(shopConfig.PRE_PURCHASE_DOMAIN, SEARCH_BUNDLES_PATH)) as string;

  const handleCartCleanup = async () => {
    const cartLines = lines.current;

    if (!Array.isArray(cartLines) || !cartLines.length) return;

    for (const line of cartLines) {
      if (line.merchandise?.sellingPlan) {
        await applyCartLinesChange({
          id: line.id,
          type: "removeCartLine",
          quantity: line.quantity,
        });
      }
    }

    errorsRef.current = ERRORS_INITIAL_STATE;
  };

  const handleUserContact = async (email?: string) => {
    try {
      isLoadingRef.current = true;

      const response = await getUserSubscriptionStatusByEmail(
        { email },
        { domain: shopConfig.MY_VIOME_API_DOMAIN }
      );

      const { status, hasActiveSubscriptions } = response.body;

      validateCart({
        lines: lines.current,
        hasActiveSubscriptions,
        subscriptionStatus: status,
      });

      errorsRef.current = ERRORS_INITIAL_STATE;

      setShowBanner(false);
    } catch (error) {
      const hasActiveSubscription = error instanceof ActiveSubscriptionsError;

      const hasCanceledSubscription =
        error instanceof CanceledSubscriptionsError;

      if (!(hasActiveSubscription || hasCanceledSubscription)) return;

      cartCleanupTimeoutRef.current = setTimeout(
        handleCartCleanup,
        CLEANUP_TIMEOUT
      );

      errorsRef.current = {
        hasActiveSubscription,
        hasCanceledSubscription,
      };

      setShowBanner(true);
    } finally {
      isLoadingRef.current = false;
    }
  };

  const getErrorMessage = () => {
    const errors = errorsRef.current;

    switch (true) {
      case errors.hasActiveSubscription:
        return translate("subscription_already_exists_error");
      case errors.hasCanceledSubscription:
        return translate("subscription_canceled_exists_error");
    }
  };

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    const errors = errorsRef.current;
    const isLoading = isLoadingRef.current;

    if (isLoading) {
      return {
        behavior: "block",
        reason: translate("reason_request_in_progress"),
      };
    }

    if (canBlockProgress && errors.hasActiveSubscription) {
      return {
        behavior: "block",
        reason: translate("reason_active_subscription"),
      };
    }

    if (canBlockProgress && errors.hasCanceledSubscription) {
      return {
        behavior: "block",
        reason: translate("reason_canceled_subscription"),
      };
    }

    return {
      behavior: "allow",
    };
  });

  useEffect(() => {
    buyerIdentity.email.subscribe(handleUserContact);
    buyerIdentity.customer.subscribe(({ email }) => handleUserContact(email));

    return () => {
      buyerIdentity.email.destroy();
      buyerIdentity.customer.destroy();

      const cartCleanupTimeout = cartCleanupTimeoutRef.current;

      if (!cartCleanupTimeout) return;

      clearTimeout(cartCleanupTimeout);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <Banner title={translate("subscription_already_exists")} status="critical">
      <BlockLayout spacing="tight">
        <TextBlock>
          {getErrorMessage()}
          <Link to={searchBundlesLink}>{translate("select_a_kit")}</Link>
          {translate("subscription_product_removed")}
        </TextBlock>

        <InlineStack blockAlignment="center">
          <Button to={SUPPORT_PAGE_URL} kind="secondary">
            {translate("contact_support")}
          </Button>

          <Button
            kind="primary"
            to={getPageUrl(shopConfig.CHECKOUT_DOMAIN, CART_PAGE_PATH)}
          >
            {translate("return_to_cart")}
          </Button>
        </InlineStack>
      </BlockLayout>
    </Banner>
  );
}
