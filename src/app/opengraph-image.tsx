import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PERSONA } from "@/lib/constants";

// Node runtime (not edge) so the photo can be read straight off disk —
// no network round-trip to our own domain, which would hang if that
// domain isn't reachable yet (e.g. before first deploy).
export const alt = PERSONA.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // og-photo.jpg is the JPEG derivative of public/photos/on-blue-shirt.webp.
  // satori (next/og) cannot decode WebP, so the route reads the derivative —
  // regenerate it with `pnpm og:photo` after replacing the source portrait.
  const photoBuffer = await readFile(
    path.join(process.cwd(), "public", "og-photo.jpg"),
  );
  const photoUrl = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Single-accent glow — no rainbow */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "-10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.30) 0%, transparent 70%)",
          }}
        />

        {/* Left: photo, full-bleed, duotone-treated via overlay */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "440px",
            height: "100%",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl}
            alt=""
            width={440}
            height={630}
            style={{ width: "440px", height: "630px", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(10,10,10,0) 60%, #0a0a0a 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(37,99,235,0.18) 0%, rgba(10,10,10,0.1) 100%)",
            }}
          />
        </div>

        {/* Right: identity */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#3b82f6",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#3b82f6",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {PERSONA.title}
            </span>
          </div>

          <div
            style={{
              fontSize: "58px",
              fontWeight: 700,
              color: "#fafafa",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            {PERSONA.name}
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#a3a3a3",
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1.5,
              maxWidth: "620px",
            }}
          >
            Engineer. Creator. Problem solver.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
