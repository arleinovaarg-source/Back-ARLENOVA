import Teacher from "../../Models/Teacher.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import { mailer } from "../../Services/Email/index.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

export const loginGoogle = async (req, res) => {
  try {
    const { googleId, nombre, email, foto } = req.body;

    if (!googleId || !nombre || !email || !foto) {
      return sendResponse(res, 400, "Datos incompletos");
    }

    let teacher = await Teacher.existEmail({ email });

    const passwordEcript = bcrypt.hashSync(process.env.PASSWORDRANDOM, 10);

    if (!teacher) {
      teacher = await Teacher.create({
        name: nombre,
        email,
        password: passwordEcript,
        profile: foto,
      });

      await mailer.sendNotification(
        email,
        nombre,
        "Registro de Profesor Exitoso",
        "Te hemos registrado como profesor en Arlenova. ¡Bienvenido! Disfruta de todas las funcionalidades que ofrecemos para mejorar tu experiencia educativa.",
      );
    }
    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return sendResponse(res, 200, "Login exitoso");
  } catch (error) {
    console.error("Error en loginGoogle:", error);
    res.status(500).json({ message: "Error al autenticar con Google" });
  }
};
