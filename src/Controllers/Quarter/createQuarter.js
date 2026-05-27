import Quarter from "../../Models/Quarter.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";

export const createQuarter = async (req, res) => {
  try {
    const { name, subjectId } = req.body;
    const userId = req.user.id;

    if (!name || !subjectId) {
      return sendResponse(res, 400, "Faltan datos obligatorios");
    }

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return sendResponse(res, 400, "ID de materia no válido");
    }

    // Validación de seguridad: evitar nombres demasiado largos o vacíos
    if (name.trim().length < 3) {
      return sendResponse(res, 400, "El nombre del periodo es demasiado corto");
    }

    // Llamada al modelo pasando los parámetros en el orden correcto
    const newQuarter = await Quarter.create(name.trim(), userId, subjectId);

    return sendResponse(res, 201, "Periodo gestionado con éxito", newQuarter);
  } catch (error) {
    console.error("Error en createQuarter:", error);
    return sendResponse(res, 500, "Error interno del servidor");
  }
};
