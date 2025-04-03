import {
  Icon,
  Text,
  View,
  useApi,
  Popover,
  Pressable,
  InlineStack,
  useSettings,
  PaymentIcon,
  useTranslate,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

import { numberFormat } from "../../../utils/number";

const DEFAULT_INSTALLMENT_AMOUNT = 4;

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

const getInstallmentCost = (params: {
  cost: number;
  installments: number;
  currencyCode: string;
}) => {
  const { cost, installments, currencyCode } = params ?? {};

  if (!cost || !installments) return;

  const installmentCost = cost / installments;

  const formattedInstallmentCost = numberFormat(installmentCost, {
    style: "currency",
    currency: currencyCode,
  });

  return formattedInstallmentCost;
};

function Extension() {
  const { cost } = useApi();
  const settings = useSettings();
  const translate = useTranslate();

  const installments = (settings["interest_free_installments"] ??
    DEFAULT_INSTALLMENT_AMOUNT) as number;

  const { amount, currencyCode } = cost.totalAmount.current;

  if (!installments || !amount) return null;

  return (
    <InlineStack blockAlignment="center" spacing="extraTight">
      <Text>
        {translate("description", {
          installments: installments,
          value: getInstallmentCost({
            cost: amount,
            currencyCode,
            installments,
          }),
        })}
      </Text>

      <PaymentIcon name="shop-pay" />

      <Pressable
        overlay={
          <Popover>
            <View padding="base" inlineSize="fill" maxInlineSize={400}>
              {translate("tooltip")}
            </View>
          </Popover>
        }
      >
        <Icon source="question" size="small" />
      </Pressable>
    </InlineStack>
  );
}
