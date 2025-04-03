import { BasePageModel } from "./base-page-model";

export abstract class ProductWithSubscriptionPageModel extends BasePageModel {
  protected domain = "https://preview.viome.com/";

  public async orderSubscription() {
    const wrapper = this.page.locator('class^="CTA_wrapper"');

    const orderSubscriptionButton = wrapper.getByRole("button", {
      name: "Order and Subscribe",
    });

    return orderSubscriptionButton.click();
  }
}
