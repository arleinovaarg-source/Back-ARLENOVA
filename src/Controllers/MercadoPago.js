import { mpCash } from "./MP/MPCash.js";
import { handlePaymentWebhook } from "./MP/handlePaymentWebhook.js";
import { checkSubscriptionStatus } from "./MP/checkSubscriptionStatus.js";

class MercadoPagoController {
  mpCash = mpCash;
  handlePaymentWebhook = handlePaymentWebhook;
  checkSubscriptionStatus = checkSubscriptionStatus;
}

export default new MercadoPagoController();
