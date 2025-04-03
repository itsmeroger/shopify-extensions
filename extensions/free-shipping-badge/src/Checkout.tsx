import {
  Text,
  Image,
  useSettings,
  InlineLayout,
  useTranslate,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";
import { SHIPPING_ICON } from "../../../constants/images";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const settings = useSettings();
  const freeShippingZones = settings["free_shipping_zones"] ?? "U.S.";
  const freeShippingIcon = settings["free_shipping_icon"] ?? SHIPPING_ICON.src;

  if (!freeShippingZones) return null;

  return (
    <InlineLayout
      border="base"
      padding="base"
      spacing="base"
      maxInlineSize={220}
      borderRadius="large"
      blockAlignment="center"
      columns={[SHIPPING_ICON.width, "auto"]}
    >
      <Image
        source={freeShippingIcon as string}
        aspectRatio={SHIPPING_ICON.width / SHIPPING_ICON.height}
      />

      <Text size="base" appearance="decorative">
        {translate("free_shipping_zones", {
          zones: freeShippingZones,
        })}
      </Text>
    </InlineLayout>
  );
}
