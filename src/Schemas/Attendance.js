import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  quarter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quarter",
    required: true,
  },
  students: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      status: {
        type: String,
        enum: ["presente", "tarde", "ausente"],
        required: true,
      },
    },
  ],
});

export default mongoose.model("Attendance", attendanceSchema);
