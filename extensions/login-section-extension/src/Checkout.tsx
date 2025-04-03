import {
  Link,
  Text,
  useApi,
  useSettings,
  InlineStack,
  useTranslate,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

import {
  SIGN_IN_PATH,
  SIGN_OUT_PATH,
  CHECKOUT_PAGE_PATH,
} from "../../../constants/paths";

import { getPageUrl } from "../../../utils/paths";
import { getShopConfig } from "../../../config/shop";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { shop, buyerIdentity } = useApi();
  const translate = useTranslate();
  const settings = useSettings();
  const shopConfig = getShopConfig(shop.myshopifyDomain);

  const customer = buyerIdentity.customer?.current;
  const customerName = customer?.firstName;

  const signInLink = (settings["sign_in_link"] ??
    getPageUrl(shopConfig.MY_VIOME_DOMAIN, SIGN_IN_PATH, {
      queryParams: {
        shopify_redirect_uri: getPageUrl(
          shopConfig.CHECKOUT_DOMAIN,
          CHECKOUT_PAGE_PATH
        ),
      },
    })) as string;

  const signOutLink = (settings["sign_out_link"] ??
    getPageUrl(shopConfig.CHECKOUT_DOMAIN, SIGN_OUT_PATH)) as string;

  return (
    <InlineStack spacing="tight" padding="base" background="subdued">
      {!customer ? (
        <>
          <Text>{translate("have_an_account")}</Text>

          <Link external={false} to={signInLink}>
            {translate("log_in")}
          </Link>
        </>
      ) : (
        <>
          <Text>{translate("logged_as", { customerName })}</Text>

          <Link external={false} to={signOutLink}>
            {translate("log_out")}
          </Link>
        </>
      )}
    </InlineStack>
  );
}
