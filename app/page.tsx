"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "3rem", color: "#4da6ff" }}>
        Soluciones de Streaming con PRIMORDIAL
      </h1>
      <p style={{ maxWidth: "600px", margin: "20px auto", color: "#ccc" }}>
        Ofrecemos servicios personalizados de gestión y provisión de cuentas de streaming.
        Vos elegís los planes, nosotros nos encargamos de la administración.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        <button
          onClick={() => router.push("/servicios")}
          style={btn("#007bff")}
        >
          Ver Servicios
        </button>

        <button
          onClick={() => router.push("/presupuesto")}
          style={btn("#00b894")}
        >
          Solicitar Presupuesto
        </button>
      </div>
    </div>
  );
}

const btn = (color: string): React.CSSProperties => ({
  background: color,
  color: "white",
  padding: "12px 28px",
  border: "none",
  borderRadius: "10px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "0.3s",
});