import { deleteSchool } from "../Controllers/School/DeleteSchool.js";
import School from "../Schemas/School.js";

class SchoolModel {
  async existName(name) {
    return await School.findOne(name);
  }
  async create(data) {
    return await School.create(data);
  }
 async allSchools(teacherId) {
    return await School.find({ teacher: teacherId });
  }
  async deleteSchool(id) {
    return await School.deleteOne({ _id: id });
  }
  async existById(id) {
    return await School.findById(id)
  }

 async updateSchool(data, id, userId) {
  return await School.findOneAndUpdate(
    { _id: id, teacher: userId }, 
    data,
    { new: true }
  );

}
async mySchool(schoolId, userId) {
  return await School.findOne({ _id: schoolId, teacher: userId });

}



}

export default new SchoolModel();