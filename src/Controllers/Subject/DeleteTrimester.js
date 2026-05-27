import Grade from "../../Models/Grade.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import mongoose from "mongoose";
import Sunject from "../../Models/Subject.js";

export const deleteTrimester = async (req, res) => {
  const { subjectId, trimester } = req.params;
  const userId = req.user.id;
  const sesion = await mongoose.startSession();

  if (!subjectId) return sendResponse(res, 400, "Falta el id del asunto");
  if (!trimester) return sendResponse(res, 400, "Falta el trimestre");
  if (isNaN(trimester))
    return sendResponse(res, 400, "El trimestre debe ser un número");
  if (trimester % 1 !== 0)
    return sendResponse(res, 400, "El trimestre debe ser un número entero");
  if (trimester < 1 || trimester > 6)
    return sendResponse(res, 400, "El trimestre debe ser entre 1 y 6");
  if (!userId) return sendResponse(res, 400, "Falta el id del profesor");

  try {
    sesion.startTransaction();

    const deleteTrimester = await Grade.deleteTrimester(subjectId, trimester ,sesion);

    const subject = await Sunject.deleteTrimester(subjectId, sesion);

    if (subject && subject.activeTrimesters >= Number(trimester)) {
      subject.activeTrimesters = Math.max(1, subject.activeTrimesters - 1);
      await subject.save();
    }

    sesion.commitTransaction();
    return sendResponse(res, 200, "OK", deleteTrimester);
  }
  catch (error) {
    sesion.endSession()
    return sendResponse(res, 500, error.message);
  }
    
 
};
