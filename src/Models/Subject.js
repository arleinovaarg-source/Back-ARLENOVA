import Subject from "../Schemas/Subject.js";
import School from "../Schemas/School.js";
import mongoose from "mongoose";

class SubjectModel {
  async existSchool(schoolId, userId) {
    return await School.findOne({ _id: schoolId, teacher: userId });
  }
  async create(data) {
    return await Subject.create(data);
  }
  async allSubjects(schoolId) {
    return await Subject.aggregate([
      { $match: { school: new mongoose.Types.ObjectId(schoolId) } },
      {
        $lookup: {
          from: "students", // El nombre de la colección en MongoDB
          localField: "_id",
          foreignField: "subject",
          as: "studentsList",
        },
      },
      {
        $project: {
          name: 1,
          grade: 1,
          activeTrimesters: 1,
          studentCount: { $size: "$studentsList" }, // Contamos los elementos del array
        },
      },
    ]);
  }
  async delete(subjectId) {
    return await Subject.findByIdAndDelete(subjectId);
  }
  async update(subjectId, data) {
    return await Subject.findByIdAndUpdate(
      subjectId,
      { $set: data },
      { new: true, runValidators: true },
    );
  }

  async findbyIdUpdate(subjectId, count) {
    return await Subject.findByIdAndUpdate(
      subjectId,
      { activeTrimesters: count },
      { new: true },
    );
  }

  async trimestreActive(subjectId) {
    return await Subject.findById(subjectId).select("activeTrimesters");
  }

  async deleteTrimester(subjectId, session) {
    return await Subject.findById(subjectId).session(session);
  }
}

export default new SubjectModel();
