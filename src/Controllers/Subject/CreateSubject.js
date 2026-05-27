import Subject from "../../Models/Subject.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import School from "../../Models/School.js";

export const createSubject = async (req, res) => {
  const { name, grade, schoolId } = req.body;
  const userId = req.user.id;
  try {
    if (!name || !grade || !schoolId) {
      return sendResponse(res, 400, "Datos incompletos");
    }
    if (!userId) {
      return sendResponse(res, 400, "No existe el profesor");
    }
    const school = await Subject.existSchool(schoolId, userId);
    if (!school) {
      return sendResponse(res, 400, "No existe la escuela");
    }
    const subject = await Subject.create({ name, grade, school: schoolId });
    return sendResponse(res, 200, "Creado exitosamente");
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
