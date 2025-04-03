import type { CartLine } from "@shopify/ui-extensions/checkout";
import { ActiveSubscriptionsError } from "../../domain/errors/active-subscriptions-error";
import { SUBSCRIPTION_STATUS } from "../../contracts/get-user-subscription-status-by-email";
import { MaxSubscriptionLinesError } from "../../domain/errors/max-subscription-lines-error";
import { CanceledSubscriptionsError } from "../../domain/errors/canceled-subscriptions-error";
import { MaxSubscriptionQuantitiesError } from "../../domain/errors/max-subscription-quantities-error";

const MAX_SUBSCRIPTIONS_PER_ACCOUNT = 1;

export const validateCart = (params: {
  lines: CartLine[];
  subscriptionStatus?: string;
  hasActiveSubscriptions?: boolean;
}) => {
  const { lines, hasActiveSubscriptions, subscriptionStatus } = params ?? {};

  if (!Array.isArray(lines) || !lines.length) return true;

  const subscriptionLines = lines.filter(({ merchandise }) => {
    return merchandise?.sellingPlan;
  });

  if (!subscriptionLines.length) return true;

  if (hasActiveSubscriptions) {
    throw new ActiveSubscriptionsError();
  }

  if (subscriptionStatus === SUBSCRIPTION_STATUS.CANCELLED) {
    throw new CanceledSubscriptionsError();
  }

  const hasOverMaxSubscriptionLines =
    subscriptionLines.length > MAX_SUBSCRIPTIONS_PER_ACCOUNT;

  if (hasOverMaxSubscriptionLines) {
    throw new MaxSubscriptionLinesError({
      maxSubscriptionLines: MAX_SUBSCRIPTIONS_PER_ACCOUNT,
    });
  }

  const hasOverMaxSubscriptionQuantities = subscriptionLines.some(
    ({ quantity }) => quantity > MAX_SUBSCRIPTIONS_PER_ACCOUNT
  );

  if (hasOverMaxSubscriptionQuantities) {
    throw new MaxSubscriptionQuantitiesError({
      maxSubscriptionQuantities: MAX_SUBSCRIPTIONS_PER_ACCOUNT,
    });
  }

  return true;
};
