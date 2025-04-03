export class ActiveSubscriptionsError extends Error {
  constructor() {
    super(
      "You have chosen to purchase a subscription plan, however a subscription already exists for your account"
    );
  }
}
