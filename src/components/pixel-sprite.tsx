import { PALETTE } from "@/lib/pixel-data";

/**
 * Draws a character grid as SVG rects, merging runs of the same colour so a
 * sprite costs ~80 rects instead of ~450.
 */
export function PixelSprite({
  frame,
  className,
  palette,
}: {
  frame: readonly string[];
  className?: string;
  /** Overrides specific colours — used to give each character their own look. */
  palette?: Record<string, string>;
}) {
  const colors = palette ? { ...PALETTE, ...palette } : PALETTE;
  const width = frame[0].length;
  const rects = [];

  for (let y = 0; y < frame.length; y += 1) {
    const row = frame[y];
    let x = 0;

    while (x < width) {
      const char = row[x];
      if (char === "." || !colors[char]) {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < width && row[x + run] === char) run += 1;

      rects.push(
        <rect
          key={`${y}-${x}`}
          x={x}
          y={y}
          width={run}
          height={1}
          fill={colors[char]}
        />,
      );
      x += run;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${frame.length}`}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {rects}
    </svg>
  );
}
