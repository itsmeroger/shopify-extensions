import type { CartLine } from "@shopify/ui-extensions/checkout";
import type { RunInput, FunctionRunResult } from "../generated/api";
import { validateCart } from "../../../data/use-cases/validate-cart";

const ERROR_TARGET = "cart";

export function run({ cart }: RunInput): FunctionRunResult {
  try {
    const cartLines = cart?.lines as unknown as CartLine[];

    validateCart({ lines: cartLines });

    return {
      errors: [],
    };
  } catch (error) {
    return {
      errors: [
        {
          target: ERROR_TARGET,
          localizedMessage: (error as Error).message,
        },
      ],
    };
  }
}
