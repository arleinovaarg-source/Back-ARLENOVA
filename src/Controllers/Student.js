import { getStudentsForAttendance } from "./Student/GetStudentAndAttence.js";
import { createStudent } from "./Student/Student.js";
import { deleteStudent } from "./Student/deleteStuent.js";

class StudentController {
  getStudentsForAttendance = getStudentsForAttendance;
  createStudent = createStudent;
  deleteStudent = deleteStudent;
}

export default new StudentController();
