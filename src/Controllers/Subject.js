import { createSubject } from "./Subject/CreateSubject.js";
import { getSubjects } from "./Subject/GetAllSubject.js";
import { deleteSubject } from "./Subject/DeleteSubject.js";
import { updateSubject } from "./Subject/UpdateSubject.js";
import { updateTrimesterConfig } from "./Subject/addTrimester.js";
import { getStudentsWithGrades } from "./Subject/getAllNotes.js";
import { addNotesStudent } from "./Subject/AddNotesStudent.js";
import { getTrimester } from "./Subject/getTrimestre.js";
import { deleteTrimester } from "./Subject/DeleteTrimester.js";

class SubjectController {
  createSubject = createSubject;
  getSubjects = getSubjects;
  deleteSubject = deleteSubject;
  updateSubject = updateSubject;
  updateTrimesterConfig = updateTrimesterConfig;
  getStudentsWithGrades = getStudentsWithGrades;
  addNotesStudent = addNotesStudent;
  getTrimester = getTrimester;
  deleteTrimester = deleteTrimester;
}
export default new SubjectController();
