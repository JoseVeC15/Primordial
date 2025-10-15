// src/app/api/db/health/route.ts
import { NextResponse } from "next/server";
import { ensureSchema, query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await ensureSchema(); // crea tabla si no existe
    const ping = await query<{ now: string; version: string }>(
      "SELECT NOW()::text as now, version() as version"
    );
    return NextResponse.json({
      ok: true,
      db: {
        now: ping.rows[0]?.now,
        version: ping.rows[0]?.version?.split("\n")[0], // versión de Postgres
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "DB error" },
      { status: 500 }
    );
  }
}
