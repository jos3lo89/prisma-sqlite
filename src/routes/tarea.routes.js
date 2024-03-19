import { Router } from "express";
import { authValidator } from "../middlewares/authValidator.js";
import prisma from "../config/db.js";
import { v4 as uuid } from "uuid";
import { dataSchemaValidator } from "../middlewares/userDataValidator.js";
import { tareaSaveSchemaZ } from "../schemas/tareaSchema.js";

const tareaRouter = Router();

/* -------------- creando tareas -------------- */

tareaRouter.post(
  "/tareas",
  authValidator,
  dataSchemaValidator(tareaSaveSchemaZ),
  async (req, res) => {
    try {
      const { titulo, descripcion } = req.body;
      const { id } = req.user;

      const newTask = await prisma.tarea.create({
        data: {
          id: uuid(),
          titulo: titulo,
          descripcion: descripcion,
          userId: id,
        },
      });

      res.status(201).json(newTask);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: [error.message] });
    }
  }
);

/* -------------- Listado tareas por usuario -------------- */

tareaRouter.get("/tareas", authValidator, async (req, res) => {
  try {
    const { id } = req.user;

    const rows = await prisma.tarea.findMany({
      where: {
        userId: id,
      },
    });

    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
});

/* -------------- Borrando tarea por id -------------- */

tareaRouter.delete("/tareas/:id", authValidator, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.tarea.delete({
      where: {
        id: id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
});

/* -------------- Actualizando tarea -------------- */

tareaRouter.put(
  "/tareas/:id",
  authValidator,
  dataSchemaValidator(tareaSaveSchemaZ),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion } = req.body;

      const updateTarea = await prisma.tarea.update({
        where: { id: id },
        data: {
          titulo: titulo,
          descripcion: descripcion,
        },
      });

      res.status(200).json(updateTarea);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: [error.message] });
    }
  }
);

/* -------------- Búsqueda de tareas por título -------------- */
tareaRouter.get("/tareas/busqueda", authValidator, async (req, res) => {
  try {
    const { search } = req.query;
    const { id } = req.user;
    let rows;

    if (search.toString() === "") {
      rows = await prisma.tarea.findMany({
        where: { userId: id },
      });
    } else {
      rows = await prisma.tarea.findMany({
        where: {
          userId: id,
          titulo: {
            contains: search.toString(),
          },
        },
      });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
});
export default tareaRouter;
