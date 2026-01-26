import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FluxDev - Solutions Digitales Propulsées par l'IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          position: "relative",
        }}
      >
        {/* Border */}
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 700,
                color: "#000",
              }}
            >
              F
            </div>
            <span
              style={{
                fontSize: 48,
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              FluxDev
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Solutions Digitales Propulsées par l'IA
          </div>
          
          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 60,
              marginTop: 50,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#fff" }}>1500+</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Agents IA</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#fff" }}>24/7</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Orchestration</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#fff" }}>100%</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sur mesure</span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            fontSize: 14,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Web · Mobile · SaaS · Cybersécurité
        </div>
      </div>
    ),
    { ...size }
  );
}
