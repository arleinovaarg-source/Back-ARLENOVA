import Teacher from "../Schemas/Teacher.js";

class TeacherModel {
  async existById(id) {
    return await Teacher.findById(id);
  }
  async existEmail(email) {
    return await Teacher.findOne(email);
  }
  async create(data) {
    return await Teacher.create(data);
  }

  async searchToken (token) {
    return await Teacher.findOne({ resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
     });
  }


  async updateSubscription(teacherId, subscriptionData) {
    return await Teacher.findByIdAndUpdate(
      teacherId, 
      {
        isSubscribed: true,
        subscriptionEndsAt: subscriptionData.subscriptionEndsAt,
        trialEndsAt: null,
        lastPaymentDate: subscriptionData.now,
        paymentStatus: "active",
      },
      { new: true } 
    );
  }
}

export default new TeacherModel();
