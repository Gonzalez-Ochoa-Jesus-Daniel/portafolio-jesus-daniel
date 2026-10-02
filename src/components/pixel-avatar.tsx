/**
 * Jesús Daniel, as a pixel sprite.
 *
 * The character is drawn as a grid of characters — one letter per pixel — so
 * it stays readable and easy to tweak: change a letter to move the fringe,
 * change a colour in PALETTE to restyle him. The hoodie is painted with the
 * live accent, so he changes colour along with the chapter you're reading.
 */

const PALETTE: Record<string, string> = {
  K: "#1b1b22", // outline
  H: "#2f2a3d", // hair
  S: "#f2caa6", // skin
  W: "#fffdf7", // eye white
  P: "#1b1b22", // pupil
  M: "#b5564a", // mouth
  C: "var(--accent)", // hoodie — follows the chapter
  D: "var(--accent-deep)", // hoodie shading
  T: "#fffdf7", // drawstrings
};

const WIDTH = 22;

/* Eyes open. */
const FRAME_OPEN = [
  "......KKKKKKKKKK......",
  ".....KHHHHHHHHHHK.....",
  "....KHHHHHHHHHHHHK....",
  "...KHHHHHHHHHHHHHHK...",
  "...KHHHHHHHHHHHHHHK...",
  "...KHHHHHHHHHHHHHHK...",
  "...KHHSSSSSSSSSSHHK...",
  "...KHSSSSSSSSSSSSHK...",
  "...KSSSSSSSSSSSSSSK...",
  "...KSSWPSSSSSSWPSSK...",
  "...KSSWPSSSSSSWPSSK...",
  "...KSSSSSSSSSSSSSSK...",
  "...KSSSSSSMMSSSSSSK...",
  "...KSSSSSSSSSSSSSSK...",
  "....KSSSSSSSSSSSSK....",
  ".....KKSSSSSSSSKK.....",
  ".......KSSSSSSK.......",
  "....KKKKCCCCCCKKKK....",
  "...KCCCCCCCCCCCCCCK...",
  "..KCCCCCTCCCCTCCCCCK..",
  "..KCCCCCTCCCCTCCCCCK..",
  "..KCCDCCCCCCCCCCDCCK..",
  "..KCCDCCCCCCCCCCDCCK..",
  "..KCCDCCCCCCCCCCDCCK..",
  "..KCCDCCCCCCCCCCDCCK..",
  "..KKKKKKKKKKKKKKKKKK..",
];

/* Same sprite, eyes shut — swapped in for a few frames to blink. */
const FRAME_BLINK = FRAME_OPEN.map((row, index) => {
  if (index === 9) return "...KSSSSSSSSSSSSSSK...";
  if (index === 10) return "...KSSKKSSSSSSKKSSK...";
  return row;
});

/**
 * Turns a row of characters into as few rects as possible by merging runs of
 * the same colour — ~80 rects instead of ~450.
 */
function rowToRects(row: string, y: number, keyPrefix: string) {
  const rects = [];
  let x = 0;

  while (x < WIDTH) {
    const char = row[x];
    if (char === "." || !PALETTE[char]) {
      x += 1;
      continue;
    }
    let run = 1;
    while (x + run < WIDTH && row[x + run] === char) run += 1;

    rects.push(
      <rect
        key={`${keyPrefix}-${y}-${x}`}
        x={x}
        y={y}
        width={run}
        height={1}
        fill={PALETTE[char]}
      />,
    );
    x += run;
  }

  return rects;
}

function Sprite({
  frame,
  className,
  keyPrefix,
}: {
  frame: string[];
  className?: string;
  keyPrefix: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${frame.length}`}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {frame.map((row, y) => rowToRects(row, y, keyPrefix))}
    </svg>
  );
}

export function PixelAvatar({ className }: { className?: string }) {
  return (
    <div className={`pixel-bob relative ${className ?? ""}`}>
      {/* Blink frame sits underneath and shows through when the top one blanks. */}
      <Sprite frame={FRAME_BLINK} keyPrefix="blink" className="h-full w-full" />
      <Sprite
        frame={FRAME_OPEN}
        keyPrefix="open"
        className="pixel-blink absolute inset-0 h-full w-full"
      />
      <span className="sr-only">Ilustración de Jesús Daniel en pixel art</span>
    </div>
  );
}
