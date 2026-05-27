import AttendanceModel from "../../Models/Attendance.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";

export const saveAttendance = async (req, res) => {
  try {
    const { subjectId, attendanceData, quarterId } = req.body;
    const userId = req.user.id;
    // 1. Validación de campos obligatorios
    if (
      !quarterId ||
      !subjectId ||
      !attendanceData ||
      !Array.isArray(attendanceData)
    ) {
      return sendResponse(res, 400, "Datos incompletos o formato incorrecto");
    }

    if (
      !mongoose.Types.ObjectId.isValid(subjectId) ||
      !mongoose.Types.ObjectId.isValid(quarterId)
    ) {
      return sendResponse(res, 400, "IDs proporcionados no son válidos");
    }

    // 2. Verificación de propiedad (isOwner)
    const isOwner = await AttendanceModel.isSubjectFromTeacher(
      subjectId,
      userId,
    );
    if (!isOwner) {
      return sendResponse(
        res,
        403,
        "No tienes permiso para tomar asistencia en esta materia",
      );
    }

    const formattedData = attendanceData.map((item) => ({
      student: item.studentId,
      status: item.status,
    }));

    // 3. ¡OJO AQUÍ! El orden debe coincidir con cómo definiste el método en el Modelo
    // Si en el modelo pusiste (subjectId, quarterId, attendanceData), debe ir así:
    await AttendanceModel.saveAttendance(subjectId, quarterId, formattedData);

    return sendResponse(res, 201, "Asistencia guardada con éxito");
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
