"use client";
import React, { useState } from "react";

export default function Presupuesto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [servicio, setServicio] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { nombre, email, servicio };

    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMensaje("✅ Solicitud enviada. Te contactaremos pronto.");
        setNombre("");
        setEmail("");
        setServicio("");
      } else {
        setMensaje("❌ Hubo un error al enviar la solicitud.");
      }
    } catch {
      setMensaje("⚠️ No se pudo conectar con el servidor.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h2 style={{ color: "#4da6ff", marginBottom: "20px" }}>
        Solicitar Presupuesto
      </h2>

      <form
        onSubmit={enviarFormulario}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          required
          style={input}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          style={input}
        />
        <select
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          required
          style={input}
        >
          <option value="">Seleccioná un servicio</option>
          <option>Netflix Familiar</option>
          <option>Disney+ Premium</option>
          <option>Spotify Familiar</option>
        </select>
        <button type="submit" style={btn}>
          Enviar Solicitud
        </button>
      </form>

      {mensaje && (
        <p style={{ marginTop: "20px", color: "#00ff99", fontWeight: 500 }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}

const input: React.CSSProperties = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "rgba(255,255,255,0.9)",
  color: "#222",
  fontWeight: 500,
};

const btn: React.CSSProperties = {
  background: "#007bff",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontWeight: 600,
  cursor: "pointer",
};
