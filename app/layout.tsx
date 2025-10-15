"use client";
import React from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          background: "linear-gradient(145deg, #0a0f24, #1e3557)",
          color: "white",
          fontFamily: "Inter, system-ui",
        }}
      >
        <header
          style={{
            background: "rgba(10,15,36,0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            padding: "15px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Link
            href="/"
            style={{ textDecoration: "none", color: "white", fontWeight: 700, fontSize: "1.5rem" }}
          >
            PRIMORDIAL
          </Link>

          <nav style={{ display: "flex", gap: "20px", fontSize: "0.9rem" }}>
            <Link href="/servicios">Servicios</Link>
            <Link href="/presupuesto">Presupuesto</Link>
            <Link href="/comprobante">Comprobante</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </header>

        <main style={{ paddingTop: "100px", minHeight: "calc(100vh - 160px)" }}>
          {children}
        </main>

        <footer
          style={{
            textAlign: "center",
            background: "#08121e",
            padding: "20px",
            color: "#aaa",
            fontSize: "0.85rem",
          }}
        >
          © {new Date().getFullYear()} PRIMORDIAL — Servicios de Streaming y Gestión Inteligente.
        </footer>
      </body>
    </html>
  );
}