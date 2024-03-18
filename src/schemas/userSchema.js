import { z } from "zod";

export const userSavedScehmaZ = z.object({
  nombre: z
    .string({
      required_error: "nombre requerido",
    })
    .refine((nombre) => nombre.length >= 1, {
      message: "nombre no puede estar vacio",
    }),
  apellido: z
    .string({
      required_error: "apellido requerido",
    })
    .refine((apellido) => apellido.length >= 1, {
      message: "apellio no puede estar vacio",
    }),
  correo: z
    .string({
      required_error: "correo requerido",
    })
    .email({ message: "correo invalido" })
    .refine((correo) => correo.length >= 1, {
      message: "correo no puede estar vacio",
    }),
  clave: z
    .string({
      required_error: "clave requerido",
    })
    .min(6, { message: "clave minima de 6 caracteres" })
    .refine((clave) => clave.length >= 1, {
      message: "clave no puede estar vacio",
    }),
});

export const userLoginSchemaZ = z.object({
  correo: z
    .string({
      required_error: "correo requerido",
    })
    .email({ message: "correo invalido" })
    .refine((correo) => correo.length >= 1, {
      message: "correo no puede estar vacio",
    }),
  clave: z
    .string({
      required_error: "clave requerido",
    })
    .min(6, { message: "clave minima de 6 caracteres" })
    .refine((clave) => clave.length >= 1, {
      message: "clave no puede estar vacio",
    }),
});
