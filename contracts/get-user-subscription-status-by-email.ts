import { z } from "zod";

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "ACTIVE",
  CANCELLED: "ALL_CANCELLED",
};

export const getUserSubscriptionStatusByEmailParams = z.object({
  email: z.string().email(),
});

export const getUserSubscriptionStatusByEmailResponse = z
  .object({
    status: z.string(),
    has_active_subscriptions: z.boolean(),
  })
  .transform((arg) => ({
    status: arg.status,
    hasActiveSubscriptions: arg.has_active_subscriptions,
  }));

export type TGetUserSubscriptionStatusByEmailParams = z.input<
  typeof getUserSubscriptionStatusByEmailParams
>;

export type TGetUserSubscriptionStatusByEmailResponse = z.input<
  typeof getUserSubscriptionStatusByEmailResponse
>;
