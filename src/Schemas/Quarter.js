import mongoose from "mongoose";

const quarterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear(),
  },
  active: {
    type: Boolean,
    default: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
});

export default mongoose.model("Quarter", quarterSchema);
