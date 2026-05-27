import School from "../../Models/School.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const deleteSchool = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    if (!userId) {
      return sendResponse(res, 400, "profesor no encontrado");
    }

    const school = await School.existById(id);

    if (school.teacher._id.toString() !== userId) {
      return sendResponse(res, 403, "No autorizado");
    }

    if (!school) {
      return res.status(400).json({ message: "No se encontró la escuela" });
    }

    const deletedSchool = await School.deleteSchool(id);

    sendResponse(res, 200, {
      data: deletedSchool,
      message: "Eliminación exitosa",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
