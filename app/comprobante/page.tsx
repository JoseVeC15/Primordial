"use client";
import React, { useState } from "react";

export default function Comprobante() {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");

  const enviarComprobante = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("📎 Debes seleccionar un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("monto", monto);
    formData.append("comprobante", archivo);

    try {
      const res = await fetch("/api/subir_comprobante", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ Comprobante enviado correctamente. 📤\n${data.file_url}`);
        setNombre("");
        setMonto("");
        setArchivo(null);
      } else {
        setMensaje("❌ Error al enviar comprobante.");
      }
    } catch {
      setMensaje("⚠️ No se pudo conectar con el servidor.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0a0f24, #1e3557)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui",
        color: "white",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "30px 40px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 700 }}>
          Subir Comprobante
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#d6d6d6",
            marginBottom: "25px",
          }}
        >
          Subí tu comprobante de pago para validar tu suscripción.
        </p>

        <form onSubmit={enviarComprobante}>
          <label>Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={input}
          />

          <label>Monto pagado (Gs)</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
            style={input}
          />

          <label>Comprobante (imagen o PDF)</label>
          <input
            type="file"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
            accept="image/*,application/pdf"
            required
            style={input}
          />

          <button type="submit" style={btn}>
            Enviar Comprobante
          </button>
        </form>

        {mensaje && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: mensaje.startsWith("✅")
                ? "#00ff99"
                : mensaje.startsWith("❌")
                ? "#ff6666"
                : "#ffcc00",
              whiteSpace: "pre-wrap",
            }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  marginBottom: "15px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.9)",
  color: "#222",
  fontWeight: 500,
};

const btn: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "#007bff",
  color: "white",
  fontWeight: 600,
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.3s",
};
