import type { CSSProperties } from "react";
import { chapterArt } from "./manga-art";
import { PixelSprite } from "./pixel-sprite";
import type { Chapter } from "@/lib/chapters";
import { chapterObjects, OBJECTS } from "@/lib/pixel-data";

type ChapterSectionProps = {
  chapter: Chapter;
  children: React.ReactNode;
  /**
   * "panel" is the default two-column chapter with its drawing on the right.
   * "full" hands the whole width to the children — used where the content is
   * itself the artwork, like a project screenshot.
   */
  layout?: "panel" | "full";
};

/** `--reveal-delay` staggers the entrances; the classes are gated on .js-anim. */
const delay = (seconds: number) =>
  ({ "--reveal-delay": `${seconds}s` }) as CSSProperties;

export function ChapterSection({
  chapter,
  children,
  layout = "panel",
}: ChapterSectionProps) {
  const Art = chapterArt[chapter.id];
  const objects = layout === "panel" ? (chapterObjects[chapter.id] ?? []) : [];

  return (
    <section
      id={chapter.id}
      className="chapter-glow relative overflow-hidden border-t-2 border-ink px-6 pt-24 pb-28 sm:px-10 sm:pt-28 sm:pb-32"
    >
      {/* Chapter seam: the ink gutter, broken by a small marker the way a
          printed chapter break is. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-center"
      >
        <span className="flex items-center gap-2.5 bg-paper px-4">
          <span className="size-1.5 rotate-45 border border-ink bg-accent" />
          <span className="kana font-display text-[10px] tracking-[0.3em]">
            {chapter.kana}
          </span>
          <span className="size-1.5 rotate-45 border border-ink bg-accent" />
        </span>
      </div>
      <div
        aria-hidden
        className="screentone pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Katakana running down the page gutter. */}
      <span
        aria-hidden
        className="kana vertical-jp absolute top-24 left-3 hidden text-[11px] xl:block"
      >
        {chapter.kana}
      </span>

      <div
        className={`relative mx-auto w-full max-w-6xl ${
          layout === "panel"
            ? "grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]"
            : ""
        }`}
      >
        <div>
          <p
            data-reveal
            style={delay(0)}
            className="mb-7 inline-flex items-center border-2 border-ink bg-accent px-3.5 py-2 font-mono text-[11px] tracking-[0.18em] text-on-accent uppercase shadow-[3px_3px_0_var(--ink)]"
          >
            Capítulo {chapter.number} — {chapter.label}
          </p>

          <h2
            data-reveal
            style={delay(0.1)}
            className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-tight font-bold text-balance"
          >
            {chapter.label}
          </h2>

          <div data-reveal style={delay(0.2)} className="mt-8">
            {children}
          </div>
        </div>

        {/* The drawing, framed as a manga panel with its sound effect. */}
        {layout === "panel" && (
        <div className="relative mx-auto w-full max-w-[15.5rem] sm:max-w-[19rem]">
          <div
            data-reveal="panel"
            style={delay(0.15)}
            className="panel screentone grid aspect-square place-items-center p-6 text-ink"
          >
            <Art className="h-full w-full" />
          </div>

          {/* Two programming objects drifting beside the panel. */}
          {objects.map((object) => (
            <div
              key={`${object.name}-${object.pos}`}
              aria-hidden
              className={`float-loop pointer-events-none absolute ${object.pos}`}
              style={
                {
                  "--dur": object.dur,
                  "--lag": object.lag,
                  "--tilt": object.tilt,
                } as CSSProperties
              }
            >
              <PixelSprite
                frame={OBJECTS[object.name]}
                className={`${object.size} w-auto drop-shadow-[2px_2px_0_var(--ink)]`}
              />
            </div>
          ))}

          <span
            data-reveal="impact"
            style={delay(0.45)}
            aria-hidden
            className="sfx pointer-events-none absolute -top-4 -left-2 text-3xl sm:-left-5 sm:text-5xl"
          >
            {chapter.sfx}
          </span>
        </div>
        )}
      </div>
    </section>
  );
}
