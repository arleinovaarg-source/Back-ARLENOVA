import express from "express";
import SubjectController from "../Controllers/Subject.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();
router.post("/CreateSubject", verifyToken, SubjectController.createSubject);
router.get("/subjects/:schoolId", verifyToken, SubjectController.getSubjects);
router.delete(
  "/subjects/:subjectId/:schoolId",
  verifyToken,
  SubjectController.deleteSubject,
);
router.put(
  "/subjects/:schoolId/:subjectId",
  verifyToken,
  SubjectController.updateSubject,
);



router.patch(
  "/subjects/trimesters",
  verifyToken,
  SubjectController.updateTrimesterConfig,
);

router.get(
  "/subjects/:subjectId/notes/:trimester",
  verifyToken,
  SubjectController.getStudentsWithGrades,
);


router.get(
  "/subjects/:subjectId/trimester",
  verifyToken,
  SubjectController.getTrimester,
);


router.post(
  "/subjects/addnotes",
  verifyToken,
  SubjectController.addNotesStudent,
);


router.delete(
  "/subjects/trimesters/:subjectId/:trimester",
  verifyToken,
  SubjectController.deleteTrimester,
);


export default router;
