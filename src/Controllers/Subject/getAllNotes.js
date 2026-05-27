import StudentModel from "../../Models/Student.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import Attendance from "../../Models/Attendance.js";
import Subject from "../../Models/Subject.js";

export const getStudentsWithGrades = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subjectId, trimester } = req.params;
    const tri = Number(trimester);

    if (!subjectId) return sendResponse(res, 400, "Falta el id del asunto");
    if (!trimester) return sendResponse(res, 400, "Falta el trimestre");
    if (isNaN(trimester))
      return sendResponse(res, 400, "El trimestre debe ser un número");
    if (trimester % 1 !== 0)
      return sendResponse(res, 400, "El trimestre debe ser un número entero");
    if (trimester < 1 || trimester > 6)
      return sendResponse(res, 400, "El trimestre debe ser entre 1 y 6");

    if (!userId) return sendResponse(res, 400, "Falta el id del profesor");

    const isOwner = await Attendance.isSubjectFromTeacher(subjectId, userId);
    if (!isOwner) return sendResponse(res, 403, "No tienes permiso");

    const subject = await Subject.trimestreActive(subjectId);
    if (!subject) return sendResponse(res, 404, "No existe el asunto");
    if (tri > subject.activeTrimesters) {
      return sendResponse(
        res,
        400,
        `Solo tienes habilitados hasta ${subject.activeTrimesters} trimestres.`,
      );
    }

    const students = await StudentModel.getStudentsWithGrades(subjectId, tri);
    
    const result = students.map((s) => {
      const suma = s.notas.reduce((acc, curr) => acc + curr.value, 0);
      const promedio =
        s.notas.length > 0 ? (suma / s.notas.length).toFixed(1) : 0;
      return {
        id: s._id,
        fullName: s.fullName,
        notas: s.notas,
        promedio: parseFloat(promedio),
        estado: promedio >= 7 ? "APROBADO" : "DESAPROBADO",
      };
    });

    return sendResponse(res, 200,"OK", result);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
