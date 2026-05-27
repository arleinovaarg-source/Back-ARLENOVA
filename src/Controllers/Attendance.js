import { saveAttendance } from "./Attendance/CreateAttendance.js";
import { getHistory } from "./Attendance/GetHistory.js";
import { getAttendanceDetails } from "./Attendance/getAttendanceDetails.js";
import { getAttendanceByQuarter } from "./Attendance/getAttendanceByQuarter.js";

class AttendanceController {
  saveAttendance = saveAttendance;
  getHistory = getHistory;
  getAttendanceDetails = getAttendanceDetails;
  getAttendanceByQuarter = getAttendanceByQuarter;
}

export default new AttendanceController();
