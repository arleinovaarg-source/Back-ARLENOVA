import Student from "../../Models/Student.js";
import Subject from "../../Models/Subject.js"; // Para validar seguridad
import { sendResponse } from "../../Hooks/responseHandler.js";

export const createStudent = async (req, res) => {
  try {
    const { fullName, gender, subjectId, schoolId } = req.body;
    const userId = req.user.id;

    // 1. Validaciones básicas
    if (!fullName || !gender || !subjectId || !schoolId) {
      return sendResponse(res, 400, "Todos los campos son obligatorios");
    }

    // 2. Seguridad: Verificar que el profesor sea dueño de la escuela
    const school = await Subject.existSchool(schoolId, userId);
    if (!school) {
      return sendResponse(
        res,
        403,
        "No tienes permiso para agregar alumnos aquí",
      );
    }

    // 3. Crear el estudiante vinculado a esa materia y escuela
    const newStudent = await Student.create({
      fullName,
      gender,
      subject: subjectId,
      school: schoolId,
    });

    return sendResponse(res, 201, {
      message: "Estudiante registrado con éxito",
      student: newStudent,
    });
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
