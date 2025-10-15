// src/app/comprobantes/nuevo/page.tsx
"use client";
import { useState } from "react";

export default function NuevoComprobantePage() {
  const [secureUrl, setSecureUrl] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState<number | "">("");
  const [fechaPago, setFechaPago] = useState("");
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResp(null);
    try {
      const r = await fetch("/api/comprobantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secureUrl,
          nombre,
          monto: Number(monto),
          fechaPago,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Error al guardar");
      setResp("✅ Comprobante guardado con éxito");
      setSecureUrl("");
      setNombre("");
      setMonto("");
      setFechaPago("");
    } catch (err: any) {
      setResp("❌ " + (err?.message || "Error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Nuevo comprobante</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">URL de Cloudinary (secure_url)</label>
          <input
            className="border rounded w-full p-2"
            value={secureUrl}
            onChange={(e) => setSecureUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/.../primordial_comprobantes/archivo.jpg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nombre completo</label>
          <input
            className="border rounded w-full p-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Monto (Gs)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            value={monto}
            onChange={(e) => setMonto(e.target.value === "" ? "" : Number(e.target.value))}
            required
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha de pago</label>
          <input
            type="date"
            className="border rounded w-full p-2"
            value={fechaPago}
            onChange={(e) => setFechaPago(e.target.value)}
            required
          />
        </div>

        <button
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>

      {resp && <p>{resp}</p>}
    </main>
  );
}
