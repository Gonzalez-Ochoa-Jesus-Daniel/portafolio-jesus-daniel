import { ImageResponse } from "next/og";
import { buildCharacter } from "@/lib/pixel-data";

export const alt =
  "Jesús Daniel González Ochoa — Desarrollador frontend y diseño";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Fixed colours: this image is rendered once on the server, so it cannot read
   the page's CSS custom properties. */
const INK = "#16161d";
const PAPER = "#f5f3ee";
const ACCENT = "#5ec8f8";

const COLORS: Record<string, string> = {
  K: INK,
  H: "#2f2a3d",
  S: "#f2caa6",
  P: INK,
  M: "#b5564a",
  C: ACCENT,
  D: "#3a3550",
};

const PIXEL = 13;

/** The sprite, as merged blocks — Satori draws plain divs, not SVG. */
function characterBlocks() {
  const frame = buildCharacter("feliz", "idle");
  const blocks = [];

  for (let y = 0; y < frame.length; y += 1) {
    const row = frame[y];
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      if (!COLORS[char]) {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < row.length && row[x + run] === char) run += 1;

      blocks.push(
        <div
          key={`${y}-${x}`}
          style={{
            position: "absolute",
            left: x * PIXEL,
            top: y * PIXEL,
            width: run * PIXEL,
            height: PIXEL,
            backgroundColor: COLORS[char],
          }}
        />,
      );
      x += run;
    }
  }

  return { blocks, width: frame[0].length * PIXEL, height: frame.length * PIXEL };
}

/** The card people see when the link is shared in a chat or on LinkedIn. */
export default function Image() {
  const { blocks, width, height } = characterBlocks();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: PAPER,
          borderBottom: `20px solid ${ACCENT}`,
        }}
      >
        {/* Left: the words */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "70px 0 70px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              backgroundColor: ACCENT,
              color: INK,
              border: `4px solid ${INK}`,
              padding: "8px 18px",
              fontSize: 22,
              letterSpacing: 4,
              marginBottom: 34,
            }}
          >
            PORTAFOLIO
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
            }}
          >
            Jesús Daniel
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 50,
              fontWeight: 700,
              color: "#4a4a57",
              lineHeight: 1.1,
              marginTop: 6,
            }}
          >
            González Ochoa
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#4a4a57",
              marginTop: 30,
            }}
          >
            Desarrollador frontend y diseño
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            {["React", "TypeScript", "Next.js", "Diseño"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  border: `4px solid ${INK}`,
                  backgroundColor: "#fffefb",
                  color: INK,
                  padding: "7px 16px",
                  fontSize: 22,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Right: the character, inside his panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 90,
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              width: width + 80,
              height: height + 80,
              border: `6px solid ${INK}`,
              backgroundColor: "#dff2fd",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "relative",
                width,
                height,
              }}
            >
              {blocks}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
