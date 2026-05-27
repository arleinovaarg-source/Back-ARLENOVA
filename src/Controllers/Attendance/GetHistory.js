import Attendance from "../../Models/Attendance.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";

export const getHistory = async (req, res) => {
  try {
    const { subjectId ,quarterId} = req.params;
    const history = await Attendance.getHistoryBySubject(subjectId, quarterId);

    const formattedHistory = history.map(day => ({
      id: day._id,
      fecha: day.date,
      trimestre: day.quarter?.name || "Sin periodo",
      totalAlumnos: day.students?.length || 0,
      presentes: day.students?.filter(s => s.status === 'presente').length || 0,
    }));

    return sendResponse(res, 200, "Historial filtrado obtenido", formattedHistory);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};