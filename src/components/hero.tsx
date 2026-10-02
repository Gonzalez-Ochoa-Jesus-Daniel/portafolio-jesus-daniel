import type { CSSProperties } from "react";
import { PixelAvatar } from "./pixel-avatar";
import { SplitText } from "./split-text";

/** Little 2D bits that drift around the character. */
const doodads = [
  { text: "{ }", pos: "-left-9 top-6", dur: "4.6s", lag: "0.1s", tilt: "-10deg" },
  { text: "</>", pos: "-right-8 top-24", dur: "5.2s", lag: "0.6s", tilt: "8deg" },
  { text: "★", pos: "-left-6 bottom-28", dur: "4s", lag: "1.1s", tilt: "12deg" },
  { text: "♥", pos: "-right-6 bottom-10", dur: "5.6s", lag: "0.35s", tilt: "-6deg" },
  { text: ";", pos: "left-1/2 -top-10", dur: "4.3s", lag: "0.8s", tilt: "6deg" },
];

/**
 * Chapter 01. Every animation here is CSS, so this screen paints and animates
 * before any JavaScript arrives — a portfolio should never greet a recruiter
 * with an empty page.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="chapter-glow relative flex min-h-[88svh] items-center overflow-hidden px-6 py-20 sm:px-10"
    >
      {/* Texture layers: halftone shading plus speed lines behind everything. */}
      <div
        aria-hidden
        className="screentone pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden
        className="speedlines anim-speed pointer-events-none absolute top-1/2 -right-1/4 h-[120vmax] w-[120vmax]"
      />

      {/* Chapter marker, sitting in the gutter like a printed page number. */}
      <div
        aria-hidden
        className="vertical-jp anim-rise absolute top-1/2 left-4 hidden -translate-y-1/2 font-display text-sm text-ink-faint xl:block"
        style={{ animationDelay: "0.5s" }}
      >
        第一話
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.2fr_1fr]">
        {/* ---- Left: the title block ---- */}
        <div>
          <p
            className="anim-rise mb-7 inline-flex items-center border-2 border-ink bg-accent px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-on-accent uppercase shadow-[3px_3px_0_var(--ink)]"
            style={{ animationDelay: "0.1s" }}
          >
            Capítulo 01 — Inicio
          </p>

          <h1 className="font-display leading-[0.95] font-extrabold tracking-tight">
            <span className="block text-[clamp(2.5rem,8.5vw,5.25rem)]">
              <SplitText text="Jesús Daniel" delay={0.3} />
            </span>
            <span className="mt-1 block text-[clamp(1.4rem,4.2vw,2.5rem)] font-bold text-ink-soft">
              <SplitText text="González Ochoa" delay={0.8} />
            </span>
          </h1>

          <p
            className="anim-rise mt-5 font-display text-2xl text-ink-soft sm:text-3xl"
            style={{ animationDelay: "1.15s" }}
          >
            Desarrollador <span className="ink-mark text-ink">en formación</span>
          </p>

          <p
            className="anim-rise mt-6 max-w-[46ch] text-base leading-relaxed text-ink-soft sm:text-lg"
            style={{ animationDelay: "1.3s" }}
          >
            A punto de egresar y con muchas ganas de construir. Aprendo haciendo
            cosas reales, y aquí te muestro las que ya salieron del papel.
          </p>

          <div
            className="anim-rise mt-9 flex flex-wrap gap-4"
            style={{ animationDelay: "1.45s" }}
          >
            <a
              href="#proyectos"
              className="border-2 border-ink bg-accent px-6 py-3 font-mono text-sm text-on-accent shadow-[4px_4px_0_var(--ink)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Ver proyectos →
            </a>
            <a
              href="#contacto"
              className="border-2 border-ink bg-surface px-6 py-3 font-mono text-sm shadow-[4px_4px_0_var(--ink)] transition-colors duration-200 hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* ---- Right: the character, framed as a panel ---- */}
        <div className="anim-panel relative mx-auto w-full max-w-[15.5rem] sm:max-w-[19rem]">
          <div className="panel relative aspect-[3/4] w-full overflow-hidden">
            <div
              aria-hidden
              className="screentone absolute inset-0 bg-accent-soft"
            />
            {/* Ground line, so he is standing in the panel and not floating. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-9 h-0.5 bg-ink/15"
            />
            <div className="relative grid h-full place-items-end justify-items-center px-8 pb-6">
              <PixelAvatar className="h-[86%] w-auto" />
            </div>
          </div>

          {/* Floating 2D bits */}
          {doodads.map((item) => (
            <span
              key={item.text}
              aria-hidden
              className={`float-loop pointer-events-none absolute ${item.pos} font-mono text-xl font-bold text-accent [-webkit-text-stroke:2px_var(--ink)]`}
              style={
                {
                  "--dur": item.dur,
                  "--lag": item.lag,
                  "--tilt": item.tilt,
                } as CSSProperties
              }
            >
              {item.text}
            </span>
          ))}

          <span
            aria-hidden
            className="sfx anim-impact pointer-events-none absolute -top-5 -right-2 text-3xl sm:-top-6 sm:-right-4 sm:text-5xl"
            style={{ animationDelay: "1s" }}
          >
            ドン
          </span>

          <div className="panel absolute -bottom-7 -left-4 max-w-[13rem] px-3.5 py-3 shadow-[4px_4px_0_var(--accent)] sm:-left-7 sm:max-w-[15rem]">
            <p className="font-display text-sm leading-snug">
              「Todavía no sé todo, pero aprendo rápido.」
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="anim-rise absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase"
        style={{ animationDelay: "1.8s" }}
      >
        <span className="anim-drift block">scroll ↓</span>
      </div>
    </section>
  );
}
