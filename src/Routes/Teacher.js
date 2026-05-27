import express from "express";
import teacherControler from "../Controllers/Teacher.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { checkSubscription } from "../Middleware/checkSubscription.js";

const router = express.Router();

router.post("/CreateTeacher", teacherControler.register);
router.post("/LoginTeacher", teacherControler.login);
router.post("/LogoutTeacher", teacherControler.logout);
router.post("/LoginGoogle", teacherControler.loginGoogle);


router.get("/myData", verifyToken,  teacherControler.myData);

//send email recet password

router.post("/forgotPassword", teacherControler.forgotPassword);
router.post("/requestPasswordReset", teacherControler.requestPasswordReset);

//recet password

export default router;
