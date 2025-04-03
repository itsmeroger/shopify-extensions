import { ProductWithTestPageModel } from "./product-with-test-page-model";

export abstract class ProductWithTestAndSubscriptionPageModel<
  TSubscription extends string
> extends ProductWithTestPageModel {
  protected domain = "https://preview.viome.com/";

  public getTestOption() {
    const wrapper = this.page.locator('class^="ProductSelector_selectors"');

    const testOption = wrapper.getByRole("button", {
      name: "Test Only",
    });

    return testOption;
  }

  public async orderTest(quantity?: number) {
    const testOption = this.getTestOption();

    await testOption.click();

    if (quantity && quantity >= 1) {
      const quantitySelector = this.page.getByRole("button", {
        name: "Quantity",
      });

      await quantitySelector.click();

      const quantitySelectorOption = this.page.getByRole("option", {
        name: String(quantity),
      });

      await quantitySelectorOption.click();
    }

    const wrapper = this.page.locator('class^="CTA_wrapper"');

    const orderTestButton = wrapper.getByRole("button", {
      name: "Order Test",
    });

    await orderTestButton.click();

    const testOnlyButton = this.page.getByRole("button", {
      name: "Continue with test only",
      exact: true,
    });

    return testOnlyButton.click();
  }

  public getSubscriptionOption(subscriptionName: TSubscription) {
    const wrapper = this.page.locator('class^="ProductSelector_selectors"');

    const subscriptionOption = wrapper.getByRole("button", {
      name: subscriptionName,
    });

    return subscriptionOption;
  }

  public async orderSubscription(subscriptionName: TSubscription) {
    const subscriptionOption = this.getSubscriptionOption(subscriptionName);

    await subscriptionOption.click();

    const wrapper = this.page.locator('class^="CTA_wrapper"');

    const orderSubscriptionButton = wrapper.getByRole("button", {
      name: "Order and Subscribe",
    });

    return orderSubscriptionButton.click();
  }
}
