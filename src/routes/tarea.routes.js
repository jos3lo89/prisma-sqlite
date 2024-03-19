import { Router } from "express";
import { authValidator } from "../middlewares/authValidator.js";
import prisma from '../config/db.js';

const tareaRouter = Router();

tareaRouter.post("/tareas", authValidator, async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const { id } = req.user;

    console.log(titulo, descripcion);
    console.log(id);

    res.status(201).json({ message: ["save tarea"] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
});

export default tareaRouter;
