import Attendance from "../Schemas/Attendance.js";
import Subject from "../Schemas/Subject.js";
import mongoose from "mongoose";

class AttendanceModel {
  async saveAttendance(subjectId, quarterId, attendanceData) {
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();

    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      subject: subjectId,
      quarter: quarterId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existing) {
      const studentMap = new Map(
        existing.students.map((item) => [item.student.toString(), item.status]),
      );
      attendanceData.forEach((item) => {
        studentMap.set(item.student.toString(), item.status);
      });

      existing.students = Array.from(studentMap, ([student, status]) => ({
        student,
        status,
      }));

      return await existing.save();
    } else {
      return await Attendance.create({
        subject: subjectId,
        quarter: quarterId,
        date: new Date(),
        students: attendanceData,
      });
    }
  }

  async isSubjectFromTeacher(subjectId, userId) {
    const subject = await Subject.findById(subjectId).populate("school");
    if (!subject || !subject.school) return false;

    return subject.school.teacher?.toString() === userId.toString();
  }

  async getHistoryBySubject(subjectId, quarterId) {
    const query = { subject: subjectId };
    if (quarterId && quarterId !== "null" && quarterId !== "undefined") {
      query.quarter = quarterId;
    }

    return await Attendance.find(query)
      .populate("quarter", "name")
      .sort({ date: -1 })
      .lean();
  }

  async getAttendanceById(attendanceId) {
    return await Attendance.findById(attendanceId)
      .populate("students.student", "fullName gender")
      .populate("subject", "name")
      .populate("quarter");
  }

  async promeCalculate(subjectId, quarterId) {
    return await Attendance.aggregate([
      {
        $match: {
          subject: new mongoose.Types.ObjectId(subjectId),
          quarter: new mongoose.Types.ObjectId(quarterId),
        },
      },
      { $unwind: "$students" },
      {
        $group: {
          _id: "$students.student",
          totalClases: { $sum: 1 },
          presentes: {
            $sum: { $cond: [{ $eq: ["$students.status", "presente"] }, 1, 0] },
          },
          tardes: {
            $sum: { $cond: [{ $eq: ["$students.status", "tarde"] }, 1, 0] },
          },
          ausentes: {
            $sum: { $cond: [{ $eq: ["$students.status", "ausente"] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: "students", // Nombre de la colección en la DB
          localField: "_id",
          foreignField: "_id",
          as: "studentInfo",
        },
      },
      { $unwind: { path: "$studentInfo", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          // Usamos fullName que es el campo real de tu esquema
          studentName: {
            $ifNull: ["$studentInfo.fullName", "Estudiante no encontrado"],
          },
          asistenciaPorcentaje: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      "$presentes",
                      {
                        $cond: [
                          { $eq: ["$totalClases", 0] },
                          1,
                          "$totalClases",
                        ],
                      },
                    ],
                  },
                  100,
                ],
              },
              2,
            ],
          },
          detalle: {
            presentes: "$presentes",
            tardes: "$tardes",
            ausentes: "$ausentes",
            totalDias: "$totalClases",
          },
        },
      },
      { $sort: { studentName: 1 } },
    ]);
  }
}

export default new AttendanceModel();
