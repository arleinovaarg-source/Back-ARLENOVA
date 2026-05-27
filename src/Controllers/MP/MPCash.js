// En tu controlador de pago (donde tienes mpCash)
import { sendResponse } from "../../Hooks/responseHandler.js";
import { mpPreference } from "../../Config/MDClient.js";
import Teacher from "../../Models/Teacher.js";

const URL_FRONT = process.env.URL_FRONT?.replace(/\/$/, "");

// SOLO PLAN MENSUAL por ahora
const PLAN_MENSUAL = {
  name: "Plan Mensual Arlenova",
  price: process.env.PRICE,
  duration: 30, // días
};

export const mpCash = async (req, res) => {
  const teacherId = req.user.id;
  const { planType } = req.body; 

  try {
    // Solo aceptamos plan mensual por ahora
    if (planType !== "monthly") {
      return sendResponse(
        res,
        400,
        "Por ahora solo está disponible el Plan Mensual",
      );
    }

    const teacher = await Teacher.existById(teacherId);
    if (!teacher) {
      return sendResponse(res, 404, "No se encontró el profesor");
    }

    // Crear preferencia para el plan mensual
    const preference = await mpPreference.create({
      body: {
        items: [
          {
            title: PLAN_MENSUAL.name,
            quantity: 1,
            currency_id: "ARS",
            unit_price: Number(PLAN_MENSUAL.price), 
          },
        ],
        payer: {
          email: teacher.email,
          name: teacher.name,
        },
        metadata: {
          teacherId: teacher._id.toString(),
          planType: "monthly",
          duration: PLAN_MENSUAL.duration,
          action: "subscription_payment",
        },
        external_reference: teacher._id.toString(),
        payment_methods: {
          installments: 1,
        },
        back_urls: {
          success: `https://arlenova.com.ar/PagoExitoso`,
          failure: `https://arlenova.com.ar/PagoFallido`,
          pending: `https://arlenova.com.ar/PagoError`,
        },
        notification_url: `${process.env.BACKEND_URL}/api/v1/mp/webhook`,
        auto_return: "approved",
      },
    });

    return sendResponse(res, 200, "Preferencia creada correctamente", {
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
      preference_id: preference.id,
    });
  } catch (error) {
    console.error("Error MP:", error);
    return sendResponse(res, 500, error.message);
  }
};


