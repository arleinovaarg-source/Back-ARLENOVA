import Student from "../Schemas/Student.js";
import mongoose from "mongoose";

class StudentModel {
  async create(data) {
    return await Student.create(data);
  }
  async existStudent(studentId, subjectId) {
    return await Student.findOne({ _id: studentId, subject: subjectId });
  }
  async getBySubject(subjectId) {
    return await Student.find({ subject: subjectId }).sort({ fullName: 1 });
  }

  async getStudentsBySubject(subjectId) {
    return await Student.find({ subject: subjectId }).sort({ fullName: 1 });
  }

 
  async delete(studentId) {
    return await Student.findByIdAndDelete(studentId);
  }

  async getStudentsWithGrades(subjectId, trimester) {
  return await Student.aggregate([
    { $match: { subject: new mongoose.Types.ObjectId(subjectId) } },
    {
      $lookup: {
        from: "grades",
        let: { studentId: "$_id" },
        pipeline: [
          { $match: { 
              $expr: { 
                $and: [
                  { $eq: ["$student", "$$studentId"] },
                  { $eq: ["$trimester", Number(trimester)] }
                ] 
              } 
          }}
        ],
        as: "notas"
      }
    },
    // AGREGA ESTA ETAPA AL FINAL DEL PIPELINE
    { $sort: { fullName: 1 } } 
  ]);
}

  async existStudent(studentId, subjectId) {
    return await Student.findOne({ _id: studentId, subject: subjectId });
  }


}

export default new StudentModel();
