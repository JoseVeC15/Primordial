// src/lib/db.ts
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Falta la env DATABASE_URL en Vercel");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // necesario en la mayoría de hosts (Neon)
});

// Crea tabla/índice si no existen (idempotente)
export async function ensureSchema() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS comprobantes (
        id               TEXT PRIMARY KEY,
        public_id        TEXT UNIQUE NOT NULL,
        secure_url       TEXT NOT NULL,
        nombre           TEXT NOT NULL,
        monto            INTEGER NOT NULL,
        fecha_pago       TIMESTAMPTZ NOT NULL,
        subido_por       TEXT,
        width            INTEGER,
        height           INTEGER,
        bytes            INTEGER,
        format           TEXT,
        estado           TEXT NOT NULL DEFAULT 'PENDIENTE',
        validador        TEXT,
        fecha_validacion TIMESTAMPTZ,
        created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_comprobantes_estado_created
        ON comprobantes (estado, created_at DESC);
    `);
  } finally {
    client.release();
  }
}

export async function query<T = any>(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query<T>(text, params);
    return res;
  } finally {
    client.release();
  }
}
