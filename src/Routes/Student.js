import express from "express";
import StudentController from "../Controllers/Student.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

router.post("/CreateStudent", verifyToken, StudentController.createStudent);
router.get("/students/:schoolId/:subjectId", verifyToken, StudentController.getStudentsForAttendance);
router.delete("/DeleteStudent/:idStudent/:subjectId", verifyToken, StudentController.deleteStudent);


export default router;