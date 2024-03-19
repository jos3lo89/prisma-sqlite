import { z } from "zod";

export const tareaSaveSchemaZ = z.object({
  titulo: z
    .string({
      required_error: "titulo requerido",
    })
    .refine((titulo) => titulo.length >= 1, {
      message: "titulo no puede estar vacio",
    }),
  descripcion: z
    .string({
      required_error: "descripcion requerida",
    })
    .refine((descripcion) => descripcion.length >= 1, {
      message: "descripcion no puede estar vacia",
    }),
});
