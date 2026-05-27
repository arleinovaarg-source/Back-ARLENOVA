import Subject from "../../Models/Subject.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";

export const updateSubject = async (req, res) => {
  try {
    const { schoolId, subjectId } = req.params;
    const { name, grade } = req.body;
    const userId = req.user.id;
    if (
      !mongoose.Types.ObjectId.isValid(schoolId) ||
      !mongoose.Types.ObjectId.isValid(subjectId)
    ) {
      return sendResponse(res, 400, "IDs no válidos");
    }
    const school = await Subject.existSchool(schoolId, userId);
    if (!school) {
      return sendResponse(
        res,
        403,
        "No tienes permiso para editar en esta escuela",
      );
    }
    const updatedSubject = await Subject.update(subjectId, { name, grade });
    if (!updatedSubject) {
      return sendResponse(res, 404, "La materia no existe");
    }
    return sendResponse(res, 200, updatedSubject);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
