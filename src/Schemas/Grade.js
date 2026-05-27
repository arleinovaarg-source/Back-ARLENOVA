import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  trimester: { type: Number, required: true },
  type: {
    type: String,
    enum: ["Examen", "TP", "E-Oral", "Recuperatorio", "Tarea", "Otro"],
    required: true,
  },
  value: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
});

export default mongoose.model("Grade", gradeSchema);
