import { ProductWithTestAndSubscriptionPageModel } from "./product-with-test-and-subscription-page-model";

export const SUBSCRIPTION_OPTION = {
  PROBIOTICS_PREBIOTICS: "Test with Probiotics + Prebiotics",
} as const;

type TSubscriptionOption =
  (typeof SUBSCRIPTION_OPTION)[keyof typeof SUBSCRIPTION_OPTION];

export class GutIntelligencePageModel extends ProductWithTestAndSubscriptionPageModel<TSubscriptionOption> {
  protected pathName = "/products/gut-intelligence";
}
