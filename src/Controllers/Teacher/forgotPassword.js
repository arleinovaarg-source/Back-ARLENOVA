import { sendResponse } from "../../Hooks/responseHandler.js";
import { mailer } from "../../Services/Email/index.js";

import Teacher from "../../Models/Teacher.js";
import crypto from "crypto";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const teacher = await Teacher.existEmail({ email });

    if (!teacher) {
      return sendResponse(res, 404, "No se encontró el profesor");
    }

    const token = crypto.randomBytes(20).toString("hex");
    teacher.resetPasswordToken = token;
    teacher.resetPasswordExpires = Date.now() + 3600000;
    await teacher.save();

    const resetLink = `${process.env.URL_FRONT}/RestablecerContraseña/${token}`;

   await mailer.sendPasswordReset(
    teacher.email, 
    {               
        userName: teacher.name,
        resetLink: resetLink
    }
);

    return sendResponse(res, 200, {
      message: "Correo de restablecimiento enviado",
    });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    return sendResponse(res, 500, error.message);
  }
};
