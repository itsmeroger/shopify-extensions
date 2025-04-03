import "dotenv/config";
import { updateCheckoutLayout } from "../data/use-cases/update-checkout-layout";

updateCheckoutLayout()
  .then((res) => console.log({ res, gqlErrors: res.errors?.graphQLErrors }))
  .catch((error) => console.log({ error }));
