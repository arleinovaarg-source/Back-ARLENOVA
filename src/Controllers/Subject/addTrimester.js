import SubjectModel from "../../Models/Subject.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import Attendance from "../../Models/Attendance.js";

// En tu archivo de controladores (p. ej. SubjectController.js)
export const updateTrimesterConfig = async (req, res) => {
  try {
   
    const { count ,subjectId } = req.body;
    const userId = req.user.id;

    if (!subjectId) return sendResponse(res, 400, "Falta el id del asunto");
    if (!count) return sendResponse(res, 400, "Falta el número de trimestres");
    if (isNaN(count))
      return sendResponse(
        res,
        400,
        "El número de trimestres debe ser un número",
      );
    if (count % 1 !== 0)
      return sendResponse(
        res,
        400,
        "El número de trimestres debe ser un número entero",
      );
    if (count < 1 || count > 6)
      return sendResponse(
        res,
        400,
        "El número de trimestres debe ser entre 1 y 6",
      );
    if (!userId) return sendResponse(res, 400, "Falta el id del usuario");

    const isOwner = await Attendance.isSubjectFromTeacher(subjectId, userId);
    if (!isOwner) return sendResponse(res, 403, "No tienes permiso");

    const subject = await SubjectModel.findbyIdUpdate(subjectId, count);

    return sendResponse(res, 200, {
      subject,
    });
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
