import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const nombre = formData.get("nombre");
  const monto = formData.get("monto");
  const file = formData.get("comprobante") as File | null;

  if (!file)
    return NextResponse.json({ ok: false, message: "No se recibió archivo" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
  const uploadResult = await cloudinary.uploader.upload(base64, {
    folder: "primordial_comprobantes",
    public_id: `${Date.now()}_${file.name}`,
  });

  console.log("📥 Nuevo comprobante:", { nombre, monto, url: uploadResult.secure_url });
  return NextResponse.json({
    ok: true,
    message: "✅ Comprobante recibido correctamente",
    file_url: uploadResult.secure_url,
  });
}
