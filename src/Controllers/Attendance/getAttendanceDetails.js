import Attendance from "../../Models/Attendance.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const getAttendanceDetails = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const userId = req.user.id;

    if (!userId) {
      return sendResponse(res, 401, "No tienes permisos");
    }

    if (!attendanceId) {
      return sendResponse(res, 400, "Falta el ID del registro de asistencia");
    }

    // 1. Asegúrate de que el método getAttendanceById en tu modelo 
    // haga un .populate("quarter") para obtener el nombre del trimestre
    const attendance = await Attendance.getAttendanceById(attendanceId);

    if (!attendance) {
      return sendResponse(res, 404, "Registro de asistencia no encontrado");
    }

    // 2. Formateamos la respuesta incluyendo el nuevo dato del trimestre
    const responseData = {
      fecha: attendance.date,
      // Traemos el nombre del trimestre (ej: "Primer Trimestre")
      trimestre: attendance.quarter?.name || "Sin asignar", 
      materia: attendance.subject.name || attendance.subject, 
      alumnos: attendance.students.map((item) => ({
        alumno: item.student?.fullName || "Alumno no encontrado",
        estado: item.status, 
        genero: item.student?.gender || "N/A"
      }))
    };

    return sendResponse(res, 200, "Detalles obtenidos", responseData);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};