import { BasePageModel } from "./base-page-model";

export abstract class ProductWithTestPageModel extends BasePageModel {
  protected domain = "https://preview.viome.com/";

  public async orderTest() {
    const wrapper = this.page.locator('class^="CTA_wrapper"');

    const orderTestButton = wrapper.getByRole("button", {
      name: "Order Test",
    });

    return orderTestButton.click();
  }
}
