import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Avora Labs — Little apps and tools that make big differences";

export default async function OpengraphImage() {
  const iconData = await readFile(
    join(process.cwd(), "public/images/avora-icon.png"),
  );
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #14121c 0%, #2b2640 100%)",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse (Satori) renders raw <img>, not next/image */}
      <img
        src={iconSrc}
        width={128}
        height={128}
        alt=""
        style={{ borderRadius: 30, marginBottom: 44 }}
      />
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          color: "#eceaf5",
          letterSpacing: -1.5,
        }}
      >
        Avora Labs
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#a49fbd",
          marginTop: 20,
          maxWidth: 820,
          textAlign: "center",
        }}
      >
        Little apps and tools that make big differences
      </div>
    </div>,
    { ...size },
  );
}
