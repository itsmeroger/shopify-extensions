import { ProductWithTestAndSubscriptionPageModel } from "./product-with-test-and-subscription-page-model";

export const SUBSCRIPTION_OPTION = {
  PRECISION_SUPPLEMENTS_PROBIOTICS_PREBIOTICS:
    "Test with Precision Supplements & Probiotics + Prebiotics",
} as const;

type TSubscriptionOption =
  (typeof SUBSCRIPTION_OPTION)[keyof typeof SUBSCRIPTION_OPTION];

export class FullBodyIntelligencePageModel extends ProductWithTestAndSubscriptionPageModel<TSubscriptionOption> {
  protected pathName = "/products/full-body-intelligence";
}
