import { createSchool } from "./School/CreateSchool.js";
import { getAllSchool } from "./School/GetAllSchool.js";
import { deleteSchool } from "./School/DeleteSchool.js";
import { putSchool } from "./School/PutSchool.js";

class SchoolController {
  createSchool = createSchool;
  getAllSchool = getAllSchool;
  deleteSchool = deleteSchool;
  putSchool = putSchool;
}

export default new SchoolController();
