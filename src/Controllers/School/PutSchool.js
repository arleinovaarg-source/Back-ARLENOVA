import School from "../../Models/School.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const putSchool = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.id;

  try {
    if (!id || !name || !userId) {
      return sendResponse(res, 400, "Datos incompletos");
    }

    const school = await School.existById(id);
    if (!school) {
      return sendResponse(res, 400, "No se encontró la escuela");
    }
    if (school.teacher._id.toString() !== userId) {
      return sendResponse(res, 403, "No autorizado");
    }

    if (name) {
      const existingSchool = await School.existName({ name });
      if (existingSchool) {
        return sendResponse(res, 400, "Nombre ya registrado");
      }
      const updatedSchool = await School.updateSchool({ name }, id , userId);
      sendResponse(res, 200, {
        data: updatedSchool,
        message: "Actualización exitosa",
      });
    }
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
