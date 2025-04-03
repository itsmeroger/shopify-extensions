import {
  Link,
  View,
  useApi,
  useTranslate,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

import { getPageUrl } from "../../../utils/paths";
import { getShopConfig } from "../../../config/shop";
import { CART_PAGE_PATH } from "../../../constants/paths";

export default reactExtension(
  "purchase.checkout.cart-line-list.render-after",
  () => <Extension />
);

function Extension() {
  const { shop } = useApi();
  const translate = useTranslate();
  const shopConfig = getShopConfig(shop.myshopifyDomain);

  return (
    <Link
      external={false}
      to={getPageUrl(shopConfig.CHECKOUT_DOMAIN, CART_PAGE_PATH)}
    >
      {translate("modify_quantity")}
    </Link>
  );
}
