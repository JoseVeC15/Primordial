// src/app/api/comprobantes/estado/route.ts
import { NextResponse } from "next/server";
import { actualizarEstadoSchema } from "@/lib/validations";
import { ensureSchema, query } from "@/lib/db";

export const runtime = "nodejs";

// PATCH /api/comprobantes/estado
export async function PATCH(req: Request) {
  await ensureSchema();

  try {
    const body = await req.json();
    const input = actualizarEstadoSchema.parse(body);

    const fechaValidacion =
      input.estado === "VALIDADO" || input.estado === "RECHAZADO" ? new Date() : null;

    const { rows } = await query(
      `UPDATE comprobantes
          SET estado = $1,
              validador = $2,
              fecha_validacion = $3,
              updated_at = NOW()
        WHERE id = $4
      RETURNING *`,
      [input.estado, input.validador ?? null, fechaValidacion, input.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ ok: false, error: "ID no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: rows[0] });
  } catch (err: any) {
    console.error(err);
    const msg = err?.issues?.[0]?.message || err?.message || "Error inesperado";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
