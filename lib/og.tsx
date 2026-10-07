import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { MARK_VIEWBOX, markArcs, markBars, WORDMARK_VIEWBOX, wordmarkInfinity, wordmarkSnap } from "@/components/brand/logo-paths";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "AnekLatin-ExpandedExtraBold.ttf")),
  readFile(join(fontDir, "AnekLatin-ExpandedRegular.ttf")),
  readFile(join(fontDir, "AnekLatin-Regular.ttf")),
]);

/** Branded share image: dark void, teal aurora, the mark, and an Anek headline. */
export async function renderOg({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  const [display, label, body] = await fonts;
  const markW = 520;
  const markH = (markW * MARK_VIEWBOX.height) / MARK_VIEWBOX.width;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#050807",
          backgroundImage:
            "radial-gradient(circle at 82% 30%, rgba(55,173,157,0.42), rgba(5,8,7,0) 48%), radial-gradient(circle at 100% 100%, rgba(255,138,87,0.18), rgba(5,8,7,0) 35%)",
          color: "#ECF4F1",
          fontFamily: "Anek Body",
        }}
      >
        <svg
          width={markW}
          height={markH}
          viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
          style={{ position: "absolute", right: 40, top: 70, opacity: 0.9 }}
        >
          {markArcs.map((d, i) => (
            <path key={`a${i}`} d={d} fill="#37AD9D" />
          ))}
          {markBars.map((b, i) => (
            <path key={`b${i}`} d={b.d} fill={i === 4 ? "#46E3C8" : "#37AD9D"} />
          ))}
        </svg>
        <svg width={190} height={(190 * WORDMARK_VIEWBOX.height) / WORDMARK_VIEWBOX.width} viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}>
          <path d={wordmarkSnap} fill="#ECF4F1" />
          <path d={wordmarkInfinity} fill="#ECF4F1" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Anek Label", fontSize: 22, letterSpacing: 7, color: "#A6B5B1", textTransform: "uppercase" }}>
            <div style={{ width: 10, height: 20, borderRadius: 3, backgroundColor: "#37AD9D" }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Anek Display", fontSize: title.length > 34 ? 66 : 82, lineHeight: 0.98, letterSpacing: -2 }}>
            <span>{title}</span>
            {accent && <span style={{ color: "#37AD9D" }}>{accent}</span>}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Anek Display", data: display, weight: 800, style: "normal" },
        { name: "Anek Label", data: label, weight: 400, style: "normal" },
        { name: "Anek Body", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
