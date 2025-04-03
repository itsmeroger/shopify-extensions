import {
  Stepper,
  BlockStack,
  InlineSpacer,
  useTranslate,
  reactExtension,
  useCartLineTarget,
  useApplyCartLinesChange,
} from "@shopify/ui-extensions-react/checkout";
import { ONE_SECOND } from "../../../constants/time";
import { useDebounce } from "../../../hooks/use-debounce";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <Extension />
);

function Extension() {
  const translate = useTranslate();
  const changeCartLine = useApplyCartLinesChange();
  const { id, quantity, merchandise } = useCartLineTarget();

  const isSubscription = Boolean(merchandise?.sellingPlan);

  const handleOnChange = (value: number) => {
    const sanitizedQuantity = value >= 1 ? value : 1;

    changeCartLine({
      id,
      type: "updateCartLine",
      quantity: sanitizedQuantity,
      merchandiseId: merchandise.id,
      sellingPlanId: merchandise.sellingPlan?.id,
    });
  };

  const debouncedHandleOnChange = useDebounce({
    method: handleOnChange,
    delay: ONE_SECOND,
  });

  if (isSubscription) return null;

  return (
    <BlockStack maxInlineSize="75%">
      <InlineSpacer />
      <Stepper
        min={1}
        value={quantity}
        onChange={debouncedHandleOnChange}
        label={translate("quantity")}
      />
    </BlockStack>
  );
}
