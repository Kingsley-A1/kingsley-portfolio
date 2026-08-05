import { ImageResponse } from "next/og";
import { PERSONA, SITE_DESCRIPTION } from "@/lib/constants";

export const runtime = "edge";
export const alt = PERSONA.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #171717 0%, #262626 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.20) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "30%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          {/* Initials badge */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "32px",
              background: "linear-gradient(135deg, #2563eb, #0d9488, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "32px",
              fontSize: "52px",
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {PERSONA.name.split(" ").map((n) => n[0]).join("")}
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#fafafa",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.02em",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            {PERSONA.name}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "28px",
              color: "#a3a3a3",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {PERSONA.title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "#737373",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            {SITE_DESCRIPTION.slice(0, 120)}…
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
