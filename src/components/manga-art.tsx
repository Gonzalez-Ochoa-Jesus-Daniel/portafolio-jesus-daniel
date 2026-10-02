import { useId } from "react";

/**
 * Inked line art, one drawing per chapter, each a programming object drawn the
 * way a manga panel would draw it: heavy outlines, screentone shading, speed
 * lines and a single accent colour that follows the current chapter.
 *
 * Every drawing is decorative, so each <svg> is hidden from assistive tech and
 * the meaning stays in the surrounding text.
 */

type ArtProps = { className?: string };

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Halftone dots, the shading fill of printed manga. */
function Screentone({ id }: { id: string }) {
  return (
    <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="2.2" cy="2.2" r="1.5" fill="currentColor" opacity="0.28" />
    </pattern>
  );
}

/** Chapter 01 — a monitor mid-compile, cursor blinking. */
export function ArtTerminal({ className }: ArtProps) {
  const id = useId();
  const dots = `tone-terminal-${id}`;

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden fill="none">
      <defs>
        <Screentone id={dots} />
      </defs>

      {/* Speed lines driving in from the top corners */}
      <g stroke="currentColor" strokeWidth="2.5" opacity="0.4" strokeLinecap="round">
        <path d="M12 26 L58 46" />
        <path d="M8 48 L52 60" />
        <path d="M18 8 L64 34" />
        <path d="M228 26 L182 46" />
        <path d="M232 48 L188 60" />
        <path d="M222 8 L176 34" />
      </g>

      {/* Monitor */}
      <rect x="30" y="44" width="180" height="124" rx="5" fill="var(--surface)" {...STROKE} />
      <rect x="44" y="58" width="152" height="96" fill={`url(#${dots})`} />

      {/* Code lines on the screen */}
      <g strokeLinecap="round" stroke="currentColor" strokeWidth="6">
        <path d="M58 76 h44" />
        <path d="M58 94 h72" />
        <path d="M74 112 h52" />
        <path d="M58 130 h34" />
      </g>
      {/* The caret, in the chapter's colour */}
      <rect x="100" y="124" width="14" height="14" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />

      {/* Angle brackets floating over the screen */}
      <g stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M150 80 l-14 13 14 13" />
        <path d="M168 80 l14 13 -14 13" />
      </g>

      {/* Stand */}
      <path d="M104 168 l-6 30 h44 l-6 -30" fill="var(--surface)" {...STROKE} />
      <rect x="82" y="198" width="76" height="12" rx="6" fill="var(--surface)" {...STROKE} />
    </svg>
  );
}

/** Chapter 02 — the desk at 1am: coffee, a book and a stray bracket. */
export function ArtDesk({ className }: ArtProps) {
  const id = useId();
  const dots = `tone-desk-${id}`;

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden fill="none">
      <defs>
        <Screentone id={dots} />
      </defs>

      {/* Steam */}
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.65">
        <path d="M96 60 c-8 -12 8 -20 0 -32" />
        <path d="M120 54 c-8 -14 8 -22 0 -36" />
        <path d="M144 60 c-8 -12 8 -20 0 -32" />
      </g>

      {/* Mug */}
      <path d="M72 96 h96 v46 a30 30 0 0 1 -30 30 h-36 a30 30 0 0 1 -30 -30 z" fill="var(--surface)" {...STROKE} />
      <path d="M72 108 h96 v34 a30 30 0 0 1 -30 30 h-36 a30 30 0 0 1 -30 -30 z" fill={`url(#${dots})`} />
      {/* Handle */}
      <path d="M168 110 a22 22 0 0 1 0 44" {...STROKE} fill="none" />
      {/* Coffee surface */}
      <ellipse cx="120" cy="96" rx="48" ry="11" fill="var(--accent)" {...STROKE} />

      {/* Book under the mug */}
      <path d="M48 186 h144 l-10 22 h-124 z" fill="var(--surface)" {...STROKE} />
      <path d="M62 196 h116" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

      {/* A semicolon that got away */}
      <g fill="var(--accent)" stroke="currentColor" strokeWidth="3">
        <circle cx="200" cy="64" r="7" />
        <circle cx="200" cy="88" r="7" />
      </g>
      <path d="M200 95 c0 10 -5 14 -10 17" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/** Chapter 03 — a browser window, the thing a project ends up living in. */
export function ArtBrowser({ className }: ArtProps) {
  const id = useId();
  const dots = `tone-browser-${id}`;

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden fill="none">
      <defs>
        <Screentone id={dots} />
      </defs>

      {/* Impact lines behind the window */}
      <g stroke="currentColor" strokeWidth="2.5" opacity="0.35" strokeLinecap="round">
        <path d="M20 200 L44 172" />
        <path d="M8 176 L34 156" />
        <path d="M220 200 L196 172" />
        <path d="M232 176 L206 156" />
      </g>

      {/* Back window, offset like a stacked panel */}
      <rect x="52" y="34" width="162" height="130" rx="5" fill="var(--surface)" {...STROKE} />

      {/* Front window */}
      <rect x="26" y="58" width="162" height="130" rx="5" fill="var(--surface)" {...STROKE} />
      <path d="M26 88 h162" {...STROKE} />
      {/* Traffic lights */}
      <circle cx="44" cy="73" r="6" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
      <circle cx="64" cy="73" r="6" stroke="currentColor" strokeWidth="3" fill="var(--surface)" />
      <circle cx="84" cy="73" r="6" stroke="currentColor" strokeWidth="3" fill="var(--surface)" />

      {/* Layout blocks inside */}
      <rect x="40" y="102" width="62" height="72" fill={`url(#${dots})`} stroke="currentColor" strokeWidth="3" />
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M116 112 h58" />
        <path d="M116 130 h44" />
        <path d="M116 148 h58" />
      </g>
      <rect x="116" y="160" width="40" height="16" rx="3" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />

      {/* Cursor */}
      <path d="M186 150 l30 30 -13 3 -6 14 z" fill="var(--surface)" {...STROKE} />
    </svg>
  );
}

/** Chapter 04 — the floating status window every anime hero gets. */
export function ArtStatus({ className }: ArtProps) {
  const id = useId();
  const dots = `tone-status-${id}`;

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden fill="none">
      <defs>
        <Screentone id={dots} />
      </defs>

      {/* Glow rays behind the panel */}
      <g stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <path d="M120 12 v16" />
        <path d="M44 34 l11 12" />
        <path d="M196 34 l-11 12" />
        <path d="M18 120 h16" />
        <path d="M222 120 h-16" />
      </g>

      {/* Panel */}
      <rect x="34" y="46" width="172" height="150" rx="6" fill="var(--surface)" {...STROKE} />
      <rect x="34" y="46" width="172" height="30" fill="var(--accent)" {...STROKE} />

      {/* Corner brackets, the HUD look */}
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M24 60 v-16 h16" />
        <path d="M216 60 v-16 h-16" />
        <path d="M24 182 v16 h16" />
        <path d="M216 182 v16 h-16" />
      </g>

      {/* Stat rows: label, then a bar filled to a different level */}
      <g>
        <path d="M50 100 h26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <rect x="86" y="92" width="104" height="16" fill={`url(#${dots})`} stroke="currentColor" strokeWidth="3" />
        <rect x="86" y="92" width="86" height="16" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
      </g>
      <g>
        <path d="M50 132 h26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <rect x="86" y="124" width="104" height="16" fill={`url(#${dots})`} stroke="currentColor" strokeWidth="3" />
        <rect x="86" y="124" width="62" height="16" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
      </g>
      <g>
        <path d="M50 164 h26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <rect x="86" y="156" width="104" height="16" fill={`url(#${dots})`} stroke="currentColor" strokeWidth="3" />
        <rect x="86" y="156" width="34" height="16" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
      </g>
    </svg>
  );
}

/** Chapter 05 — a message thrown across the page. */
export function ArtMessage({ className }: ArtProps) {
  const id = useId();
  const dots = `tone-message-${id}`;

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden fill="none">
      <defs>
        <Screentone id={dots} />
      </defs>

      {/* Trailing motion lines */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.45">
        <path d="M14 150 h52" />
        <path d="M6 168 h40" />
        <path d="M26 132 h34" />
      </g>

      {/* Paper plane */}
      <path d="M216 44 L74 108 l54 22 z" fill="var(--surface)" {...STROKE} />
      <path d="M216 44 L128 130 l14 58 z" fill={`url(#${dots})`} {...STROKE} />
      <path d="M216 44 L128 130" {...STROKE} />

      {/* An @ sign caught in the draft */}
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <circle cx="66" cy="192" r="26" fill="var(--accent)" />
        <circle cx="66" cy="192" r="9" fill="var(--surface)" />
        <path d="M75 192 v10 a10 10 0 0 0 14 -8 a23 23 0 1 0 -9 18" fill="none" />
      </g>
    </svg>
  );
}

/** Looked up by chapter id so a section can just ask for its own drawing. */
export const chapterArt: Record<string, (props: ArtProps) => React.ReactElement> = {
  inicio: ArtTerminal,
  "sobre-mi": ArtDesk,
  proyectos: ArtBrowser,
  habilidades: ArtStatus,
  contacto: ArtMessage,
};
