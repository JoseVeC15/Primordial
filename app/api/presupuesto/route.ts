import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("📩 Nuevo presupuesto:", data);
  return NextResponse.json({ ok: true });
}
