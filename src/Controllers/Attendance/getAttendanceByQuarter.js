import Attendance from "../../Models/Attendance.js";
import mongoose from "mongoose";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const getAttendanceByQuarter = async (req, res) => {
  try {
    const { subjectId, quarterId } = req.params;
    const userId = req.user.id;

    if (
      !mongoose.Types.ObjectId.isValid(subjectId) ||
      !mongoose.Types.ObjectId.isValid(quarterId)
    ) {
      return sendResponse(res, 400, "IDs proporcionados no son válidos");
    }

    if (!userId) return sendResponse(res, 401, "Usuario no autenticado");

    const report = await Attendance.promeCalculate(subjectId, quarterId);

    return sendResponse(res, 200, "Datos del trimestre obtenidos", report);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
