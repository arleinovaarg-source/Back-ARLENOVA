import Teacher from "../Models/Teacher.js";
import { sendResponse } from "../Hooks/responseHandler.js";

export const checkSubscription = async (req, res, next) => {
  try {
    const teacherId = req.user.id;
    const teacher = await Teacher.existById(teacherId);

    if (!teacher) {
      return sendResponse(res, 404, "Docente no encontrado");
    }

    const now = new Date();
    
    // 👇 Mejor con validaciones más robustas
    const hasActiveTrial = !teacher.isSubscribed && 
                           teacher.trialEndsAt && 
                           teacher.trialEndsAt > now;
    
    const hasActiveSubscription = teacher.isSubscribed && 
                                  teacher.subscriptionEndsAt && 
                                  teacher.subscriptionEndsAt > now;

    // 👇 SI QUIERES ACTUALIZAR AUTOMÁTICAMENTE EL ESTADO (opcional pero recomendado)
    if (!hasActiveTrial && !hasActiveSubscription) {
      // Si el trial expiró y no está suscripto, actualizar paymentStatus
      if (!teacher.isSubscribed && teacher.trialEndsAt && teacher.trialEndsAt <= now) {
        teacher.paymentStatus = "expired";
        await teacher.save(); // 💾 Actualiza el estado en la BD
      }
      
      return sendResponse(
        res,
        403,
        "Periodo de prueba expirado. Necesitas el Plan Mensual.",
        {
          code: "SUBSCRIPTION_REQUIRED",
          daysLeft: 0,
          subscribeUrl: "/planes"
        },
      );
    }

    // 👇 OPCIONAL: Adjuntar información de suscripción al request
    req.subscriptionInfo = {
      hasActiveTrial,
      hasActiveSubscription,
      daysLeft: hasActiveTrial 
        ? Math.ceil((teacher.trialEndsAt - now) / (1000 * 60 * 60 * 24))
        : Math.ceil((teacher.subscriptionEndsAt - now) / (1000 * 60 * 60 * 24)),
      plan: hasActiveTrial ? "trial" : "premium"
    };

    next();
  } catch (error) {
    console.error("Error en checkSubscription:", error);
    return sendResponse(res, 500, error.message);
  }
};