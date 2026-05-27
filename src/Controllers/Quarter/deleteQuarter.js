import Quarter from "../../Models/Quarter.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const deleteQuarter = async (req, res) => {
  const { quarterId } = req.params;
  const userId = req.user.id;

  try {
    if (!quarterId) {
      return sendResponse(res, 400, "Falta el ID del trimestre");
    }

    if (!userId) {
      return sendResponse(res, 401, "No autorizado");
    }

    const deletedQuarter = await Quarter.deleteQuarter(quarterId);

    if (!deletedQuarter) {
      return sendResponse(res, 404, "Trimestre no encontrado");
    }

    return sendResponse(res, 200, "Trimestre eliminado");
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
