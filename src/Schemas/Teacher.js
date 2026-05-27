import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    trialEndsAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días de prueba
    },
    profile: {
      type: String,
      required: false,
    },
    // 🔽 NUEVOS CAMPOS para suscripción 🔽
    subscriptionEndsAt: {
      type: Date,
      default: null,
    },
    lastPaymentDate: {
      type: Date,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["active", "expired", "pending", "cancelled"],
      default: "pending",
    },
resetPasswordToken: {
  type: String,
  default: null,
},
resetPasswordExpires: {
  type: Date,
  default: null,
}
  },
  {
    timestamps: true,
  }
);

teacherSchema.index({ trialEndsAt: 1 });
teacherSchema.index({ subscriptionEndsAt: 1 });

export default mongoose.model("Teacher", teacherSchema);