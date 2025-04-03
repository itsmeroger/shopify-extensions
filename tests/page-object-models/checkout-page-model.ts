import { ONE_SECOND } from "../../constants/time";
import { BasePageModel } from "./base-page-model";

export type TContactForm = {
  email: string;
  allowNotifications: boolean;
};

export type TDeliveryForm = {
  city: string;
  state: string;
  zipCode: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  countryCode: string;
  firstAddressLine: string;
  secondAddressLine?: string;
  acceptSuggestedAddress?: boolean;
  allowTextNotifications?: boolean;
};

export type TPaymentMethodForm = {
  name?: string;
  cardNumber: string;
  securityCode: string;
  shippingAsBillingAddress?: boolean;
  expirationDate: Date | string | number;
};

export type TTermsOfServiceForm = {
  acceptTerms?: boolean;
};

export type TDiscountCodeForm = {
  discountCode?: string;
};

export class CheckoutPageModel extends BasePageModel {
  protected domain = "https://staging-buy.viome.com/";
  protected pathName = "/checkouts/";

  get subscriptionAlreadyExistsNotification() {
    return this.page.getByRole("heading", {
      name: "A Subscription Already Exists",
    });
  }

  get shoppingCart() {
    return this.page.getByText("Order summaryShopping");
  }

  get loginWrapper() {
    const quickCheckoutIframe = this.page.frameLocator(
      'iframe[title="Shop Pay Quick Checkout"]'
    );

    return quickCheckoutIframe.locator("div").first();
  }

  public gotoWithProduct(params: {
    quantity?: number;
    productId: string;
    productPlan?: string;
  }) {
    const { productId, productPlan, quantity = 1 } = params;
    const url = new URL("/pages/addtocart", this.domain);

    url.searchParams.set("id", productId);

    url.searchParams.set("quantity", String(quantity));

    if (productPlan) url.searchParams.set("plan", productPlan);

    return this.page.goto(url.toString(), {
      waitUntil: "load",
    });
  }

  public async fillContactForm(params?: Partial<TContactForm>) {
    const formData = Object.assign(
      {
        email: this.factory.internet.email(),
        allowNotifications: this.factory.datatype.boolean(),
      } as TContactForm,
      params
    );

    const emailField = await this.page.getByLabel("Email", { exact: true });

    await emailField.fill(String(formData.email).toLowerCase());

    await emailField.blur();

    const isLoginWrapperVisible = await this.loginWrapper
      .isVisible()
      .catch(() => false);

    if (isLoginWrapperVisible) {
      const closeLoginWrapperButton = this.loginWrapper.getByRole("button", {
        name: "Close",
      });

      await closeLoginWrapperButton
        .click({ timeout: ONE_SECOND })
        .catch(() => null);

      const authorizeModalCloseButton = this.loginWrapper.getByTestId(
        "authorize-modal-close-button"
      );

      await authorizeModalCloseButton
        .click({ timeout: ONE_SECOND })
        .catch(() => null);
    }

    const allowNotificationsField = await this.page.getByLabel(
      "Email me with news and offers"
    );

    await allowNotificationsField.setChecked(formData.allowNotifications);
  }

  public async fillDeliveryForm(params?: Partial<TDeliveryForm>) {
    const formData = Object.assign(
      {
        city: this.factory.location.city(),
        state: this.factory.location.state(),
        zipCode: this.factory.location.zipCode(),
        lastName: this.factory.person.lastName(),
        firstName: this.factory.person.firstName(),
        phoneNumber: this.factory.phone.number(),
        countryCode: this.factory.location.countryCode(),
        firstAddressLine: this.factory.location.streetAddress(),
        secondAddressLine: this.factory.location.secondaryAddress(),
        allowTextNotifications: this.factory.datatype.boolean(),
        acceptSuggestedAddress: this.factory.datatype.boolean(),
      } as TDeliveryForm,
      params
    );

    const countryCodeField = await this.page.getByLabel("Country/Region");
    await countryCodeField.selectOption({ value: formData.countryCode });

    const firstNameField = await this.page.getByLabel("First name");
    await firstNameField.fill(formData.firstName);

    const lastNameField = await this.page.getByLabel("Last name");
    await lastNameField.fill(formData.lastName);

    const firstAddressLineField = await this.page.getByPlaceholder("Address");
    await firstAddressLineField.fill(formData.firstAddressLine);

    if (formData.secondAddressLine) {
      const secondAddressLineField = await this.page.getByPlaceholder(
        "Apartment, suite, etc."
      );

      await secondAddressLineField.fill(formData.secondAddressLine);
    }

    const cityField = await this.page.getByLabel("City");
    await cityField.fill(formData.city);

    const stateField = await this.page.getByLabel("State");
    await stateField.selectOption({ label: formData.state });

    const zipCodeField = await this.page.getByLabel("Zip code");
    await zipCodeField.fill(formData.zipCode);

    const phoneNumberField = await this.page.getByPlaceholder("Phone");
    await phoneNumberField.fill(formData.phoneNumber);

    if (typeof formData.allowTextNotifications === "boolean") {
      const allowTextNotificationsField = await this.page.getByLabel(
        "Text me with news and offers"
      );

      await allowTextNotificationsField.setChecked(
        formData.allowTextNotifications
      );
    }

    const isAddressSuggestionVisible = await this.page
      .getByText("Please select shipping address")
      .isVisible()
      .catch(() => false);

    if (isAddressSuggestionVisible && formData.acceptSuggestedAddress) {
      const acceptAddressSuggestionButton = this.page.getByRole("button", {
        name: "Accept Changes",
      });

      await acceptAddressSuggestionButton;
    }
  }

  public async fillPaymentMethodForm(params?: Partial<TPaymentMethodForm>) {
    const formData = Object.assign(
      {
        name: this.factory.person.firstName(),
        securityCode: this.factory.finance.creditCardCVV(),
        cardNumber: this.factory.finance.creditCardNumber(),
        shippingAsBillingAddress: this.factory.datatype.boolean(),
        expirationDate: this.factory.date.future({ years: 5 }),
      } as TPaymentMethodForm,
      params
    );

    const expirationDate = new Date(formData.expirationDate);

    const expirationDateMonth = String(expirationDate.getMonth()).padStart(
      2,
      "0"
    );

    const expirationDateYear = expirationDate.getFullYear();

    const formattedExpirationDate = `${expirationDateMonth}/${expirationDateYear}`;

    const creditCardFieldWrapper = this.page.frameLocator(
      '[title="Field container for: Card number"]'
    );

    const creditCardField =
      creditCardFieldWrapper.getByPlaceholder("Card number");

    await creditCardField.fill(formData.cardNumber);

    const expirationDateFieldWrapper = this.page.frameLocator(
      '[title="Field container for: Expiration date (MM / YY)"]'
    );

    const expirationDateField =
      expirationDateFieldWrapper.getByPlaceholder("Expiration date");

    await expirationDateField.fill("03/2027");

    const securityCodeFieldWrapper = this.page.frameLocator(
      '[title="Field container for: Security code"]'
    );

    const securityCodeField =
      securityCodeFieldWrapper.getByPlaceholder("Security code");

    await securityCodeField.fill(formData.securityCode);

    if (formData.name) {
      const nameFieldWrapper = this.page.frameLocator(
        '[title="Field container for: Name on card"]'
      );

      const nameField = nameFieldWrapper.getByLabel("Name on card");

      await nameField.fill(formData.name);
    }

    if (typeof formData.shippingAsBillingAddress === "boolean") {
      const shippingAsBillingAddressField = await this.page.getByLabel(
        "Use shipping address as billing address"
      );

      await shippingAsBillingAddressField.setChecked(
        formData.shippingAsBillingAddress
      );
    }
  }

  public async fillTermsOfServiceForm(params?: Partial<TTermsOfServiceForm>) {
    const formData = Object.assign(
      {
        acceptTerms: this.factory.datatype.boolean(),
      } as TTermsOfServiceForm,
      params
    );

    if (typeof formData.acceptTerms !== "boolean") return;

    const termsOfServiceField = await this.page.getByLabel(
      "I agree to Terms of Service"
    );

    await termsOfServiceField.setChecked(formData.acceptTerms);
  }

  public async fillDiscountCodeForm(params?: Partial<TDiscountCodeForm>) {
    const formData = Object.assign(
      {
        discountCode: this.factory.lorem.word(8),
      } as TDiscountCodeForm,
      params
    );

    if (typeof formData.discountCode !== "string") return;

    const discountCodeField = await this.page.getByLabel(
      "Discount code or gift card"
    );

    await discountCodeField.fill(formData.discountCode);
  }

  public async purchase() {
    const purchaseButton = await this.page.getByRole("button", {
      name: "Pay now",
    });

    await purchaseButton.click();
  }
}
