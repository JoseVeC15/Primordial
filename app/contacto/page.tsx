"use client";
import React, { useState } from "react";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h2 style={{ color: "#4da6ff", marginBottom: "20px" }}>Contacto</h2>
      <p style={{ color: "#ccc", marginBottom: "25px" }}>
        Escribinos tu consulta y te responderemos a la brevedad.
      </p>

      <form
        onSubmit={enviar}
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
          placeholder="Tu nombre"
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
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Mensaje"
          required
          rows={4}
          style={input}
        ></textarea>
        <button type="submit" style={btn}>
          Enviar Mensaje
        </button>
      </form>

      {enviado && (
        <p style={{ marginTop: "15px", color: "#00ff99" }}>
          ✅ Gracias por tu mensaje. Te contactaremos pronto.
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
