import Teacher from "../../Models/Teacher.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const myData = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return sendResponse(res, 400, "Falta el id del usuario");
    const teacher = await Teacher.existById(userId);
    if (!teacher) {
      return sendResponse(res, 400, "No tienes permiso");
    }
    const dataTeacher = {
      name: teacher.name,
      suscribed: teacher.isSubscribed,
      trialEndsAt: teacher.trialEndsAt,
      profile: teacher.profile,
      isSubscribed: teacher.isSubscribed,
      paymentStatus: teacher.paymentStatus,
      subscriptionEndsAt: teacher.subscriptionEndsAt
    };
    sendResponse(res, 200, null, dataTeacher);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
