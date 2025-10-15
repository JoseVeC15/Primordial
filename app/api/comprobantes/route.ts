// src/app/api/comprobantes/route.ts
import { NextResponse } from "next/server";
import { crearComprobanteSchema } from "@/lib/validations";
import { esUrlCloudinaryValida, extraerPublicId } from "@/lib/cloudinary";
import { ensureSchema, query } from "@/lib/db";

export const runtime = "nodejs";

// GET /api/comprobantes?estado=VALIDADO|PENDIENTE|RECHAZADO&limit=50
export async function GET(req: Request) {
  await ensureSchema();

  const { searchParams } = new URL(req.url);
  const estado = searchParams.get("estado");
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);

  if (estado) {
    const { rows } = await query(
      `SELECT * FROM comprobantes
        WHERE estado = $1
        ORDER BY created_at DESC
        LIMIT $2`,
      [estado, limit]
    );
    return NextResponse.json({ ok: true, data: rows });
  }

  const { rows } = await query(
    `SELECT * FROM comprobantes
      ORDER BY created_at DESC
      LIMIT $1`,
    [limit]
  );
  return NextResponse.json({ ok: true, data: rows });
}

// POST /api/comprobantes
export async function POST(req: Request) {
  await ensureSchema();

  try {
    const body = await req.json();
    const input = crearComprobanteSchema.parse(body);

    if (!esUrlCloudinaryValida(input.secureUrl)) {
      return NextResponse.json(
        { ok: false, error: "URL de Cloudinary inválida o carpeta incorrecta" },
        { status: 400 }
      );
    }

    const publicId = extraerPublicId(input.secureUrl);
    const id = crypto.randomUUID();

    const { rows } = await query(
      `INSERT INTO comprobantes (
         id, public_id, secure_url, nombre, monto, fecha_pago, subido_por,
         width, height, bytes, format, estado, created_at, updated_at
       ) VALUES (
         $1, $2, $3, $4, $5, $6, $7,
         $8, $9, $10, $11, 'PENDIENTE', NOW(), NOW()
       )
       RETURNING *`,
      [
        id, publicId, input.secureUrl, input.nombre, input.monto, input.fechaPago,
        input.subidoPor ?? null, input.width ?? null, input.height ?? null,
        input.bytes ?? null, input.format ?? null
      ]
    );

    return NextResponse.json({ ok: true, data: rows[0] }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    const msg = err?.issues?.[0]?.message || err?.message || "Error inesperado";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
