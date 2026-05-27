import Subject from "../../Models/Subject.js";
import { sendResponse } from "../../Hooks/responseHandler.js";

export const getTrimester = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const userId = req.user.id;

    if (!userId) return sendResponse(res, 400, "UserId is required");
    if (!subjectId) return sendResponse(res, 400, "SubjectId is required");

    const subject = await Subject.trimestreActive(subjectId);
    sendResponse(res, 200, "Success", subject);
  } catch (error) {
    sendResponse(res, 400, error);
  }
};
