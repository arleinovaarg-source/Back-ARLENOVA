import { register } from "./Teacher/Register.js";
import { login } from "./Teacher/Login.js";
import { myData } from "./Teacher/myData.js";
import { logout } from "./Teacher/logout.js";
import { loginGoogle } from "./Teacher/LoginGoole.js";
import { forgotPassword } from "./Teacher/forgotPassword.js";
import { requestPasswordReset } from "./Teacher/recetPassword.js";

class TeacherController {
  register = register;
  login = login;
  myData = myData;
  logout = logout;
  loginGoogle = loginGoogle;
  forgotPassword = forgotPassword;
  requestPasswordReset = requestPasswordReset;
}

export default new TeacherController();
