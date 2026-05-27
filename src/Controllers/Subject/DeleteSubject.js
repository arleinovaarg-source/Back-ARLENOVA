import Subject from "../../Models/Subject.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";

export const deleteSubject = async (req, res) => {
  try {
    const { subjectId, schoolId } = req.params;
    const userId = req.user.id;

    if (
      !mongoose.Types.ObjectId.isValid(subjectId) ||
      !mongoose.Types.ObjectId.isValid(schoolId)
    ) {
      return sendResponse(res, 400, "IDs no válidos");
    }

    const school = await Subject.existSchool(schoolId, userId);
    if (!school) {
      return sendResponse(
        res,
        403,
        "No tienes permiso para modificar esta escuela",
      );
    }

    const deletedSubject = await Subject.delete(subjectId);

    if (!deletedSubject) {
      return sendResponse(res, 404, "La materia no existe");
    }

    return sendResponse(res, 200, "Materia eliminada correctamente");
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
