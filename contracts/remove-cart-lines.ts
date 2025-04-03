import { z } from "zod";

export const removeCartLinesParams = z.object({
  cartId: z.string(),
  lineIds: z.string().array(),
});

export type TRemoveCartLinesParams = z.input<typeof removeCartLinesParams>;
