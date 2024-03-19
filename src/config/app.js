import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRouter from "../routes/user.routes.js";
import { URL_CLIENT } from "../config/config.js";
import tareaRouter from "../routes/tarea.routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: URL_CLIENT,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api", tareaRouter);

export default app;
