import { sendResponse } from "../../Hooks/responseHandler.js";

const isProduction = process.env.NODE_ENV === "production";

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return sendResponse(res, 200, "Sesión cerrada con éxito");
  } catch (error) {
    return sendResponse(res, 500, "Error al cerrar sesión");
  }
};
