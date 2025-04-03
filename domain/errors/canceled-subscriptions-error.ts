export class CanceledSubscriptionsError extends Error {
  constructor() {
    super(
      "You have chosen to purchase a subscription plan, however a previously canceled subscription already exists for your account."
    );
  }
}
