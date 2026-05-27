import Teacher from "../../Models/Teacher.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

// Agrega esta función después de mpCash
export const checkSubscriptionStatus = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return sendResponse(res, 404, "Docente no encontrado");
    }

    const now = new Date();
    let canUse = false;
    let message = "";
    let daysLeft = 0;

    // Verificar periodo de prueba (7 días gratis)
    if (teacher.trialEndsAt && teacher.trialEndsAt > now) {
      canUse = true;
      const diffTime = teacher.trialEndsAt - now;
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      message = `Periodo de prueba activo. Te quedan ${daysLeft} días.`;
    }
    // Verificar suscripción pagada mensual
    else if (
      teacher.isSubscribed &&
      teacher.subscriptionEndsAt &&
      teacher.subscriptionEndsAt > now
    ) {
      canUse = true;
      const diffTime = teacher.subscriptionEndsAt - now;
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      message = `Plan Mensual activo. Te quedan ${daysLeft} días.`;
    }
    // Sin acceso
    else {
      canUse = false;
      message =
        "Tu periodo de prueba ha terminado. Suscríbete al Plan Mensual para continuar.";
    }

    return sendResponse(res, 200, "Estado de suscripción", {
      canUse,
      message,
      isSubscribed: teacher.isSubscribed,
      trialActive: teacher.trialEndsAt > now,
      trialEndsAt: teacher.trialEndsAt,
      subscriptionEndsAt: teacher.subscriptionEndsAt,
      daysLeft,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, error.message);
  }
};
