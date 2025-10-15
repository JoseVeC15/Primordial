"use client";
import React from "react";

export default function Servicios() {
  const servicios = [
    { nombre: "Netflix Familiar", precio: "Gs. 40.000/mes", desc: "Acceso 4K en múltiples dispositivos." },
    { nombre: "Disney+ Premium", precio: "Gs. 35.000/mes", desc: "Películas, series y contenido exclusivo." },
    { nombre: "Spotify Familiar", precio: "Gs. 25.000/mes", desc: "Música sin límites para toda la familia." },
  ];

  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h2 style={{ color: "#4da6ff", fontSize: "2rem", marginBottom: "20px" }}>Nuestros Servicios</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", maxWidth: "900px", margin: "0 auto" }}>
        {servicios.map((s) => (
          <div
            key={s.nombre}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ color: "#66b2ff", marginBottom: "10px" }}>{s.nombre}</h3>
            <p style={{ color: "#ccc" }}>{s.desc}</p>
            <p style={{ color: "#00ff99", fontWeight: 600 }}>{s.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 