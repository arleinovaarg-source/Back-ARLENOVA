import Subject from "../../Models/Subject.js";
import School from "../../Models/School.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";

export const getSubjects = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const userId = req.user.id;

    if (!schoolId) {
      return sendResponse(res, 400, "ID de escuela requerido");
    }


    const school = await School.mySchool(schoolId, userId);

    if (!school) {
      return sendResponse(
        res,
        404,
        "Escuela no encontrada o no tienes permisos",
      );
    }


    const subjects = await Subject.allSubjects(schoolId);
    

    return sendResponse(res, 200, { message: "Listado obtenido"},
      {school: {
        id: school._id,
        name: school.name, 
      },subjects
    }, );
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
