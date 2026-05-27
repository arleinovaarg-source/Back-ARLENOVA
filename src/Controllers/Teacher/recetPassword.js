import { sendResponse } from "../../Hooks/responseHandler.js";
import Teacher from "../../Models/Teacher.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import { mailer } from "../../Services/Email/index.js";

export const requestPasswordReset = async (req, res) => {
  const { token, newPassword } = req.body;
  

  try {
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "El token y la nueva contraseña son requeridos." });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 8 caracteres." });
    }

    const teacher = await Teacher.searchToken(token);

    if (!teacher) {
      return res.status(400).json({ message: "El token no es válido." });
    }

    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(newPassword, salt);

    teacher.resetPasswordToken = null;
    teacher.resetPasswordExpires = null;

    await teacher.save();

    sendResponse(res, 200, "Contraseña actualizada correctamente");
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
