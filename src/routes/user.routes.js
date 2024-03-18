import { Router } from "express";
import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

import { userSaveValidator } from "../middlewares/userDataValidator.js";
import { userLoginSchemaZ, userSavedScehmaZ } from "../schemas/userSchema.js";
import { createToken } from "../libs/jwt.js";
import { authValidator } from "../middlewares/authValidator.js";

const userRouter = Router();

/* --------- created user ----------- */

userRouter.post(
  "/users",
  userSaveValidator(userSavedScehmaZ),
  async (req, res) => {
    try {
      const { nombre, apellido, correo, clave } = req.body;

      const userFound = await prisma.user.findFirst({
        where: { correo: correo },
      });

      if (userFound)
        return res.status(400).json({ message: ["usuario ya existe"] });

      const claveHash = await bcrypt.hash(clave, 10);

      const newUser = await prisma.user.create({
        data: {
          id: uuid(),
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          clave: claveHash,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: [error.message] });
    }
  }
);

/* --------- login user ----------- */

userRouter.post(
  "/users/login",
  userSaveValidator(userLoginSchemaZ),
  async (req, res) => {
    try {
      const { correo, clave } = req.body;

      const userFound = await prisma.user.findFirst({
        where: { correo: correo },
      });

      if (!userFound)
        return res.status(400).json({ message: ["usuario no encontrado"] });

      const claveIsMatch = await bcrypt.compare(clave, userFound.clave);

      if (!claveIsMatch)
        return res.status(400).json({ message: ["la clave no coincide"] });

      const token = await createToken({ id: userFound.id });

      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        id: userFound.id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        correo: userFound.correo,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: [error.message] });
    }
  }
);

/* --------- profile user (protected) ----------- */

userRouter.get("/users/profile/:id", authValidator, async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await prisma.user.findFirst({ where: { id: id } });

    res.status(200).json({
      id: userFound.id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      correo: userFound.correo,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
});

/* --------- logout user ----------- */

userRouter.post("/users/logout", authValidator, (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
});

export default userRouter;
