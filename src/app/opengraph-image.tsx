import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const alt = "Chaitanya — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "72px",
          fontFamily: "sans-serif",
          color: "#f4f2ec",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "rgba(216,255,62,0.14)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#d8ff3e",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9d9da6",
            }}
          >
            {`${siteName} · Portfolio`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 0.98,
              letterSpacing: -4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>I build web products</span>
            <span style={{ color: "#d8ff3e" }}>that ship.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#9d9da6",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <span>Full stack developer · React · TypeScript · Node</span>
          <span style={{ color: "#f4f2ec" }}>github.com/Chaitanya-3119</span>
        </div>
      </div>
    ),
    size
  );
}
