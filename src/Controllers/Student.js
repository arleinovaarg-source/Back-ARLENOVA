import { getStudentsForAttendance } from "./Student/GetStudentAndAttence.js";
import { createStudent } from "./Student/Student.js";

class StudentController {
  getStudentsForAttendance = getStudentsForAttendance;
  createStudent = createStudent;
}

export default new StudentController();
