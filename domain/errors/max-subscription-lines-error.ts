export class MaxSubscriptionLinesError extends Error {
  constructor(params: { maxSubscriptionLines: number }) {
    super(
      `Not possible to order more than ${params.maxSubscriptionLines} subscription`
    );
  }
}
