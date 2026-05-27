import School from "../../Models/School.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import Teacher from "../../Models/Teacher.js";

export const getAllSchool = async (req, res) => {
  try {
    const teacherId = req.user.id;

    if (!teacherId) {
      return sendResponse(res, 401, "No autorizado");
    }
    const teacher = await Teacher.existById(teacherId);
    if (!teacher) {
      return sendResponse(res, 404, "No existe el docente");
    }
    // Pasamos el teacherId al modelo
    const schools = await School.allSchools(teacherId);
    // Si el array está vacío, no es un error 404, simplemente es un listado vacío
    return sendResponse(
      res,
      200,
      { message: "Listado de las escuelas" },
      schools,
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
