import School from "../../Models/School.js";
import Teacher from "../../Models/Teacher.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const createSchool = async (req, res) => {
  try {
    const { name } = req.body;
    const teacherId = req.user.id;

    if (!name || !teacherId) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
    if (teacherId) {
      const teacher = await Teacher.existById(teacherId);
      if (!teacher) {
        return res.status(400).json({ message: "No se encontró el profesor" });
      }
    }

    const existingSchool = await School.existName({ name });
    if (existingSchool) {
      return res.status(400).json({ message: "Nombre ya registrado" });
    }
    const school = await School.create({
      name,
      teacher: teacherId,
    });
    sendResponse(res, 200, {
      data: school,
      message: "Creación exitosa",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
