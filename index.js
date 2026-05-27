import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import dbClient from "./src/Config/dbclient.js";

const app = express();

const urlFront = process.env.URL_FRONT;

app.use(
  cors({
    origin: urlFront,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

import teacherRoutes from "./src/Routes/Teacher.js";
import schoolRoutes from "./src/Routes/School.js";
import subjectRoutes from "./src/Routes/Subject.js";
import Attendance from "./src/Routes/Attendance.js";
import studentRoutes from "./src/Routes/Student.js";
import quarterRoutes from "./src/Routes/QuaterRoutes.js";

import MercadoPago from "./src/Routes/MercadoPago.js";

app.use(
  "/api/v1",
  teacherRoutes,
  schoolRoutes,
  subjectRoutes,
  Attendance,
  studentRoutes,
  quarterRoutes,
);

app.use("/api/v1/mp", MercadoPago);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});

// Manejo de cierre limpio (Graceful Shutdown)
process.on("SIGINT", async () => {
  await dbClient.closeDB();
  server.close(() => {
    console.log("Servidor Express cerrado.");
    process.exit(0);
  });
});
