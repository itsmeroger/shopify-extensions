export class MaxSubscriptionQuantitiesError extends Error {
  constructor(params: { maxSubscriptionQuantities: number }) {
    super(
      `Not possible to add more than ${params?.maxSubscriptionQuantities} subscription item`
    );
  }
}
