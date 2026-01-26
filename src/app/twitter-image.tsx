import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FluxDev - AI-Powered Digital Solutions";
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
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
          }}
        />
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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

          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            AI-Powered Digital Solutions
          </div>
          
          <div
            style={{
              display: "flex",
              gap: 60,
              marginTop: 50,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#fff" }}>1500+</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>AI Agents</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#fff" }}>24/7</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Orchestration</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#fff" }}>100%</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Custom</span>
            </div>
          </div>
        </div>

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
          Web · Mobile · SaaS · Cybersecurity
        </div>
      </div>
    ),
    { ...size }
  );
}
