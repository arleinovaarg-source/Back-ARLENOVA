import express from "express";
import QuarterController from "../Controllers/Quarter.js";
import {verifyToken} from "../Middleware/verifyToken.js";

const router = express.Router();

router.post("/quarter", verifyToken, QuarterController.createQuarter);
router.delete("/quarter/:quarterId",  verifyToken , QuarterController.deleteQuarter);
router.get("/quarter/:subjectId", verifyToken, QuarterController.getQuarter);

export default router;