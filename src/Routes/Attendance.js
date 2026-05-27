import express from "express";
import { verifyToken } from "../Middleware/verifyToken.js";

import Attendance from "../Controllers/Attendance.js";

const router = express.Router();


router.post("/attendance", verifyToken, Attendance.saveAttendance);
router.get("/history/:subjectId/:quarterId", verifyToken, Attendance.getHistory);
router.get("/details/:attendanceId", verifyToken, Attendance.getAttendanceDetails);
router.get("/report/:subjectId/:quarterId", verifyToken, Attendance.getAttendanceByQuarter);

export default router;
