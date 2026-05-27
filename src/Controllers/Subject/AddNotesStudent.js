import Grade from "../../Models/Grade.js";
import Subject from "../../Models/Subject.js";
import Student from "../../Models/Student.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import Attendance from "../../Models/Attendance.js";

export const addNotesStudent = async (req, res) => {
  try {
    const { studentId, subjectId, trimester, type, value } = req.body;
    const userId = req.user.id;

    if (!studentId) return sendResponse(res, 400, "Falta el id del alumno");
    if (!subjectId) return sendResponse(res, 400, "Falta el id de la materia");
    if (!trimester) return sendResponse(res, 400, "Falta el trimestre");
    if (!type) return sendResponse(res, 400, "Falta el tipo de nota");
    if (!value) return sendResponse(res, 400, "Falta el valor de la nota");
    if (isNaN(trimester))
      return sendResponse(res, 400, "El trimestre debe ser un número");
    if (trimester % 1 !== 0)
      return sendResponse(res, 400, "El trimestre debe ser un número entero");
    if (trimester < 1 || trimester > 6)
      return sendResponse(res, 400, "El trimestre debe ser entre 1 y 6");
    if (
      type !== "Examen" &&
      type !== "TP" &&
      type !== "E-Oral" &&
      type !== "Recuperatorio" &&
      type !== "Tarea" &&
      type !== "Otro"
    )
      return sendResponse(
        res,
        400,
        "El tipo de nota debe ser 'Examen', 'TP', 'E-Oral', 'Recuperatorio', 'Tarea' o 'Otro'",
      );
    if (value < 1 || value > 10)
      return sendResponse(
        res,
        400,
        "El valor de la nota debe ser un número entre 1 y 10",
      );

      const isStudent = await Student.existStudent(studentId, subjectId);
      if (!isStudent) return sendResponse(res, 404, "Alumno no encontrado");

    // 1. Validar que el alumno pertenezca a esa materia
    const isOwner = await Attendance.isSubjectFromTeacher(subjectId, userId);
    if (!isOwner) return sendResponse(res, 403, "al no pertenece a la materia");

    // 1. Validar que la materia exista y esté habilitado el trimestre
    const subject = await Subject.trimestreActive(subjectId);
    if (!subject) return sendResponse(res, 404, "Materia no encontrada");

    if (trimester > subject.activeTrimesters) {
      return sendResponse(res, 400, "Este trimestre aún no está habilitado");
    }

    // 2. Validar que el alumno pertenezca a esa materia
    const studentExists = await Student.existStudent(studentId, subjectId);
    if (!studentExists) {
      return sendResponse(res, 404, "El alumno no pertenece a esta materia");
    }

    // 3. Crear la nota
    const newGrade = await Grade.create(req.body);

    return sendResponse(res, 201, {
      message: "Nota registrada con éxito",
      grade: newGrade,
    });
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
