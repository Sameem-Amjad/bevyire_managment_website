import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Bevy Irie — Property Management You Can Trust";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #041712 0%, #08241b 55%, #0d3427 100%)",
          color: "#fbfaf6",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* gold glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "9999px",
            background: "rgba(198,162,83,0.18)",
            filter: "blur(20px)",
            display: "flex",
          }}
        />

        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 68,
              height: 68,
              borderRadius: 18,
              background: "#0d3427",
              border: "2px solid rgba(198,162,83,0.5)",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 16,
            }}
          >
            {/* doorway arch drawn with borders — always renders */}
            <div
              style={{
                display: "flex",
                width: 30,
                height: 26,
                border: "3px solid #ddbe6c",
                borderBottom: "none",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
              Bevy Irie
            </span>
            <span
              style={{
                fontSize: 15,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#ddbe6c",
              }}
            >
              Property · Lagos
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            Property Management You Can Trust
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "rgba(214,232,223,0.8)",
              maxWidth: 820,
            }}
          >
            Helping absentee landlords protect, manage and maximise their Lagos
            property — with complete transparency.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 24, color: "#ddbe6c", fontWeight: 600 }}>
            {site.url.replace("https://", "")}
          </span>
          <div style={{ display: "flex", gap: 24, fontSize: 20, color: "rgba(214,232,223,0.7)" }}>
            <span>Transparent</span>
            <span style={{ color: "#c6a253" }}>·</span>
            <span>Documented</span>
            <span style={{ color: "#c6a253" }}>·</span>
            <span>Professional</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
