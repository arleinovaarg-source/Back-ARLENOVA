import Teacher from "../../Models/Teacher.js";
import { sendResponse } from "../../Hooks/responseHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(res, 400, "Datos incompletos");
    }
    const teacher = await Teacher.existEmail({ email });
    if (!teacher) {
      return sendResponse(res, 400, "Correo o contraseña incorrectos");
    }
    
      const isPasswordCorrect = await bcrypt.compare(password, teacher.password);
      if (!isPasswordCorrect) {
        return sendResponse(res, 400, "Correo o contraseña incorrectos");
      }

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
       secure: true,
       sameSite: "none" 
    });
    
    return sendResponse(res, 200, "Login exitoso");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
