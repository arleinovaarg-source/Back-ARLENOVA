import Student from "../../Models/Student.js";
import Subject from "../../Models/Subject.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";

export const getStudentsForAttendance = async (req, res) => {
  try {
    const { subjectId, schoolId } = req.params;
    const userId = req.user.id;


    if (!mongoose.Types.ObjectId.isValid(subjectId) || !mongoose.Types.ObjectId.isValid(schoolId)) {
      return sendResponse(res, 400, "IDs no válidos");
    }

  
    const school = await Subject.existSchool(schoolId, userId);
    if (!school) {
      return sendResponse(res, 403, "No tienes permiso para ver estos alumnos");
    }

    
    const students = await Student.getStudentsBySubject(subjectId);

    
    if (students.length === 0) {
      return sendResponse(res, 200, [], "Aún no hay alumnos registrados en esta materia");
    }

    return sendResponse(res, 200, "Listado obtenido" ,students  );
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};