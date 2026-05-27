import jwt from "jsonwebtoken";
import Teacher from "../Models/Teacher.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const teacher = await Teacher.existById(decoded.id);

    if (!teacher) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.user = teacher;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
