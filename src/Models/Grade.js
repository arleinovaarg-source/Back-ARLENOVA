import Grade from "../Schemas/Grade.js";

class GradeModel {
  async create(data) {
    return await Grade.create({
      student: data.studentId,
      subject: data.subjectId,
      trimester: data.trimester,
      type: data.type,
      value: data.value,
    });
  }

  async deleteTrimester(subjectId, trimesterNumber,session) {
    return await Grade.deleteMany(
      { subject: subjectId, trimester: Number(trimesterNumber) },
      { session },
    )
  }
}

export default new GradeModel();
