import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  activeTrimesters: {
    type: Number,
    default: 1,
    min: 1,
    max: 6,
  },
});

export default mongoose.model("Subject", subjectSchema);
