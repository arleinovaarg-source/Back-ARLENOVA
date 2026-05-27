import Teacher from "../../Models/Teacher.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import { mailer } from "../../Services/Email/index.js";
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, recaptchaToken } = req.body;

   
    // Validar datos obligatorios PRIMERO
    if (!name || !email || !password) {
      return sendResponse(res, 400, { message: "Datos incompletos" });
    }

    // Validar email
    if (!email.includes("@")) {
      return sendResponse(res, 400, { message: "Email no válido" });
    }

    if (email.length < 6) {
      return sendResponse(res, 400, { message: "Email demasiado corto" });
    }

    // Validar nombre
    if (name.length < 3) {
      return sendResponse(res, 400, {
        message: "El nombre debe tener al menos 3 caracteres",
      });
    }

    if (name.length > 60) {
      return sendResponse(res, 400, {
        message: "El nombre no puede exceder 60 caracteres",
      });
    }

    // Validar contraseña
    if (password.length < 8) {
      return sendResponse(res, 400, {
        message: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    if (password.length > 50) {
      return sendResponse(res, 400, {
        message: "La contraseña no puede exceder 50 caracteres",
      });
    }

    // Validar captcha
    if (!recaptchaToken) {
      return sendResponse(res, 400, { message: "Captcha requerido" });
    }

    // Verificar captcha con Google
    try {
      const captchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        { method: "POST" },
      );

      const captchaData = await captchaResponse.json();
      

      if (!captchaData.success) {
        return sendResponse(res, 400, {
          message: "Captcha inválido. Por favor, intenta nuevamente.",
        });
      }

      // Opcional: verificar el score si usas reCAPTCHA v3
      if (captchaData.score && captchaData.score < 0.5) {
        return sendResponse(res, 400, {
          message: "Verificación de captcha fallida. Intenta nuevamente.",
        });
      }
    } catch (captchaError) {
      console.error("Error verificando captcha:", captchaError);
      return sendResponse(res, 500, { message: "Error verificando captcha" });
    }

    // Verificar si el email ya existe
    const existingUser = await Teacher.existEmail({ email });
    if (existingUser) {
      return sendResponse(res, 400, { message: "El email ya existe" });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el profesor
    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: teacher._id, email: teacher.email, name: teacher.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Enviar correo de bienvenida (sin await para no bloquear)
    mailer
      .sendNotification(
        email,
        name,
        "Registro de Profesor Exitoso",
        `Hola ${name},\n\nTe hemos registrado como profesor en Arlenova. ¡Bienvenido! Disfruta de todas las funcionalidades que ofrecemos para mejorar tu experiencia educativa.\n\nTu periodo de prueba de 7 días ha comenzado.`,
      )
      .catch((err) => console.error("Error enviando email:", err));

    // Respuesta exitosa
    return sendResponse(res, 200, "Registro exitoso", {
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({
      statusCode: 500,
      message: { message: "Error interno del servidor" },
    });
  }
};
