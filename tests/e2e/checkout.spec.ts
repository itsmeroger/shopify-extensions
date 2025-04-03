import { test } from "@playwright/test";
import { ONE_SECOND } from "../../constants/time";
import { PRODUCT_SUBSCRIPTIONS } from "../constants/products";
import { CheckoutPageModel } from "../page-object-models/checkout-page-model";
import { SUBSCRIPTION_STATUS } from "../../contracts/get-user-subscription-status-by-email";

test.describe("when the user has no active subscriptions...", () => {
  PRODUCT_SUBSCRIPTIONS.forEach((subscription) => {
    test.describe(`...and attempts to checkout the product subscription with id ${subscription.id} and plan ${subscription.plan}`, () => {
      test.beforeEach(async ({ page }) => {
        const checkoutPage = new CheckoutPageModel({ page });

        checkoutPage.gotoWithProduct({
          productId: subscription.id,
          productPlan: subscription.plan,
        });

        await page.waitForURL("**/checkouts/**", {
          waitUntil: "load",
        });
      });

      test("it should allow the user from purchasing a new subscription", async ({
        page,
      }) => {
        const checkoutPage = new CheckoutPageModel({ page });

        const subscriptionStatusRequestPromise = page.waitForRequest(
          "*/**/app/subscriptions/v3/subscriptionStatus"
        );

        await checkoutPage.fillContactForm();

        await subscriptionStatusRequestPromise;

        await test
          .expect(checkoutPage.subscriptionAlreadyExistsNotification)
          .not.toBeVisible();

        await checkoutPage.fillDeliveryForm({
          countryCode: "US",
          city: "Bellevue",
          zipCode: "98004",
          state: "Washington",
          phoneNumber: "+14256656565",
          acceptSuggestedAddress: true,
          firstAddressLine: "205 108th Ave NE suite 150",
        });

        await page.waitForResponse("*/**/api/checkout_validate");

        // This is needed because we have to wait until the extension for the checkout
        // validation is hydrated
        await page.waitForTimeout(5 * ONE_SECOND);

        await checkoutPage.fillPaymentMethodForm({
          cardNumber: "4242424242424242",
          shippingAsBillingAddress: true,
        });

        await checkoutPage.fillTermsOfServiceForm({
          acceptTerms: true,
        });

        await checkoutPage.purchase();

        await page.waitForResponse(
          "*/**/graphql?operationName=SubmitForCompletion"
        );

        await page.waitForURL("**/processing", {
          waitUntil: "load",
        });

        await page.waitForURL("**/thank-you", {
          waitUntil: "load",
        });

        const orderConfirmationText = page.getByText("Your order is confirmed");

        await test.expect(orderConfirmationText).toBeVisible();
      });
    });
  });
});

test.describe("when the user has a cancelled subscription...", () => {
  PRODUCT_SUBSCRIPTIONS.forEach((subscription) => {
    test.describe(`...and attempts to checkout the product subscription with id ${subscription.id} and plan ${subscription.plan}`, () => {
      test.beforeEach(async ({ page }) => {
        const checkoutPage = new CheckoutPageModel({ page });

        checkoutPage.gotoWithProduct({
          productId: subscription.id,
          productPlan: subscription.plan,
        });

        await page.waitForURL("**/checkouts/**", {
          waitUntil: "load",
        });
      });

      test("it should prevent the user from purchasing a new subscription", async ({
        page,
      }) => {
        const checkoutPage = new CheckoutPageModel({ page });

        await page.route(
          "*/**/app/subscriptions/v3/subscriptionStatus",
          async (route) => {
            const json = {
              has_active_subscriptions: false,
              status: SUBSCRIPTION_STATUS.CANCELLED,
            };

            await route.fulfill({ json });
          }
        );

        const subscriptionStatusRequestPromise = page.waitForRequest(
          "*/**/app/subscriptions/v3/subscriptionStatus"
        );

        await checkoutPage.fillContactForm({
          email: "test@email.com",
        });

        await subscriptionStatusRequestPromise;

        await test
          .expect(checkoutPage.subscriptionAlreadyExistsNotification)
          .toBeVisible();
      });
    });
  });
});

test.describe("when the user has an active subscription...", () => {
  PRODUCT_SUBSCRIPTIONS.forEach((subscription) => {
    test.describe(`...and attempts to checkout the product subscription with id ${subscription.id} and plan ${subscription.plan}`, () => {
      test.beforeEach(async ({ page }) => {
        const checkoutPage = new CheckoutPageModel({ page });

        checkoutPage.gotoWithProduct({
          productId: subscription.id,
          productPlan: subscription.plan,
        });

        await page.waitForURL("**/checkouts/**", {
          waitUntil: "load",
        });
      });

      test("it should prevent the user from purchasing a new subscription", async ({
        page,
      }) => {
        const checkoutPage = new CheckoutPageModel({ page });

        await page.route(
          "*/**/app/subscriptions/v3/subscriptionStatus",
          async (route) => {
            const json = {
              has_active_subscriptions: true,
              status: SUBSCRIPTION_STATUS.ACTIVE,
            };

            await route.fulfill({ json });
          }
        );

        const subscriptionStatusRequestPromise = page.waitForRequest(
          "*/**/app/subscriptions/v3/subscriptionStatus"
        );

        await checkoutPage.fillContactForm({
          email: "test@email.com",
        });

        await subscriptionStatusRequestPromise;

        await test
          .expect(checkoutPage.subscriptionAlreadyExistsNotification)
          .toBeVisible();
      });
    });
  });
});
