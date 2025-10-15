// src/lib/validations.ts
import { z } from "zod";

export const crearComprobanteSchema = z.object({
  secureUrl: z.string().url(),
  nombre: z.string().min(1),
  monto: z.coerce.number().int().positive(),
  fechaPago: z.coerce.date(), // "YYYY-MM-DD" o ISO
  subidoPor: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  bytes: z.number().int().positive().optional(),
  format: z.string().optional(),
});

export const actualizarEstadoSchema = z.object({
  id: z.string().min(1),
  estado: z.enum(["PENDIENTE", "VALIDADO", "RECHAZADO"]),
  validador: z.string().optional(),
});
