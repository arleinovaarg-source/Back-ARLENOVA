import express from "express";
import MercadoPagoController from "../Controllers/MercadoPago.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

router.post("/webhook", MercadoPagoController.handlePaymentWebhook);

router.get(
  "/status",
  verifyToken,
  MercadoPagoController.checkSubscriptionStatus,
);
router.post("/create-payment", verifyToken, MercadoPagoController.mpCash);

export default router;
