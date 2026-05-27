import Quarter from "../../Models/Quarter.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const getQuarter = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const userId = req.user.id;
    if (!subjectId) {
      return sendResponse(res, 400, "Falta el ID de la materia");
    }
    if (!userId) {
      return sendResponse(res, 401, "No autorizado");
    }
    const quarter = await Quarter.getQuarterById(subjectId, userId);
    if (!quarter) {
      return sendResponse(res, 404, "Trimestre no encontrado");
    }

    return sendResponse(res, 200, "Trimestre obtenido", quarter);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
