import express from "express";
import School from "../Controllers/School.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { checkSubscription } from "../Middleware/checkSubscription.js";

const router = express.Router();

router.post(
  "/CreateSchool",
  verifyToken,
  checkSubscription,
  School.createSchool,
);
router.get(
  "/GetAllSchool",
  verifyToken,
  checkSubscription,
  School.getAllSchool,
);
router.delete(
  "/DeleteSchool",
  verifyToken,
  checkSubscription,
  School.deleteSchool,
);
router.put("/PutSchool/:id", verifyToken, checkSubscription, School.putSchool);

export default router;
