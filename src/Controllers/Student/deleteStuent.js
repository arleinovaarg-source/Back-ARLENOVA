import Student from "../../Models/Student.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const deleteStudent = async (req, res) => {
  const { idStudent, subjectId } = req.params;
  const userId = req.user.id;

  try {
    if (!subjectId) {
      return sendResponse(res, 400, "El ID de la materia es obligatorio", null);
    }

    if (!idStudent) {
      return sendResponse(
        res,
        400,
        "El ID del estudiante es obligatorio",
        null,
      );
    }

    if (!userId) {
      return sendResponse(
        res,
        400,
        "No tienes permisos para realizar esta accion",
        null,
      );
    }

    const student = await Student.existStudent(idStudent, subjectId);

    if (!student) {
      return sendResponse(res, 404, "No existe estudiante con ese id", null);
    }

    const deletedStudent = await Student.delete(idStudent);

    if (!deletedStudent) {
      return sendResponse(res, 404, "No existe estudiante con ese id", null);
    }

    return sendResponse(res, 200, "Estudiante  eliminado correctamente", null);
  } catch (error) {
    return sendResponse(res, 500, "Server Error", null, error);
  }
};
