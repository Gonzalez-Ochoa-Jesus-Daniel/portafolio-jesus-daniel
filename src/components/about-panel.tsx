import Image from "next/image";
import type { CSSProperties } from "react";
import { ArtDesk } from "./manga-art";
import { PixelSprite } from "./pixel-sprite";
import { OBJECTS } from "@/lib/pixel-data";
import { about, experience, formacion, type Experience } from "@/lib/about";

const delay = (seconds: number) =>
  ({ "--reveal-delay": `${seconds}s` }) as CSSProperties;

/** A small heading that labels each block of the chapter. */
function BlockLabel({ kana, children }: { kana: string; children: string }) {
  return (
    <h3
      data-reveal
      className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-ink-soft uppercase"
    >
      <span className="font-display text-sm text-accent">{kana}</span>
      {children}
      <span className="h-px flex-1 bg-ink/15" />
    </h3>
  );
}

function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <article
      data-reveal="panel"
      style={delay(index * 0.12)}
      className={`panel relative flex flex-col gap-5 p-6 sm:p-7 ${
        item.featured ? "shadow-[6px_6px_0_var(--accent)]" : ""
      }`}
    >
      <header className="flex items-start gap-4">
        {/* The company's own logo, framed in ink like everything else here.
            The tile stays light in both themes so dark marks keep their
            contrast. */}
        <span className="grid size-16 shrink-0 place-items-center overflow-hidden border-2 border-ink bg-[#f7f5f1] p-1.5 shadow-[3px_3px_0_var(--ink)]">
          <Image
            src={item.logo}
            alt={item.logoAlt}
            className="h-full w-full object-contain"
            sizes="64px"
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h4 className="font-display text-2xl leading-none font-bold">
              {item.company}
            </h4>
            {item.featured && (
              <span className="border-2 border-ink bg-surface px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] uppercase">
                Experiencia en empresa
              </span>
            )}
          </div>
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
            {item.role} · {item.area}
          </p>
        </div>
      </header>

      <p className="max-w-[52ch] leading-relaxed text-ink-soft">
        {item.detail}
      </p>

      <div>
        <p className="mb-2.5 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
          Lo que me llevé
        </p>
        <ul className="flex flex-wrap gap-2">
          {item.learned.map((skill) => (
            <li
              key={skill}
              className="border-2 border-ink bg-surface px-2.5 py-1 font-mono text-[11px] shadow-[2px_2px_0_var(--ink)]"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* A pixel object perched on the corner of the card. */}
      <div
        aria-hidden
        className="float-loop pointer-events-none absolute -top-5 -right-4 hidden sm:block"
        style={
          { "--dur": "5.6s", "--lag": `${index * 0.6}s`, "--tilt": "7deg" } as CSSProperties
        }
      >
        <PixelSprite
          frame={OBJECTS[item.object]}
          className="h-9 w-auto drop-shadow-[2px_2px_0_var(--ink)]"
        />
      </div>
    </article>
  );
}

export function AboutPanel() {
  return (
    <div className="mt-12 space-y-20">
      {/* ---- Block 1: who he is ---- */}
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 24)}
              data-reveal
              style={delay(index * 0.08)}
              className="max-w-[52ch] text-lg leading-[1.75] text-ink-soft"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-[17rem]">
          <div
            data-reveal="panel"
            style={delay(0.2)}
            className="panel screentone grid aspect-square place-items-center p-7 text-ink"
          >
            <ArtDesk className="h-full w-full" />
          </div>
          <div
            aria-hidden
            className="float-loop absolute -right-5 -bottom-5"
            style={{ "--dur": "5.2s", "--tilt": "9deg" } as CSSProperties}
          >
            <PixelSprite
              frame={OBJECTS.llaves}
              className="h-7 w-auto drop-shadow-[2px_2px_0_var(--ink)]"
            />
          </div>
        </div>
      </div>

      {/* ---- Block 2: experience, the headline ---- */}
      <div className="space-y-8">
        <BlockLabel kana="職歴">Dónde he trabajado</BlockLabel>
        <div className="grid gap-7 lg:grid-cols-2">
          {experience.map((item, index) => (
            <ExperienceCard key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* ---- Block 3: education, kept light ---- */}
      <div className="space-y-8">
        <BlockLabel kana="学歴">Formación</BlockLabel>
        <ol className="grid gap-5 sm:grid-cols-3">
          {formacion.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={delay(index * 0.1)}
              className={`panel flex flex-col gap-2 px-5 py-5 ${
                step.current ? "shadow-[4px_4px_0_var(--accent)]" : ""
              }`}
            >
              <span
                aria-hidden
                className={`grid size-7 place-items-center border-2 border-ink font-mono text-[10px] ${
                  step.current
                    ? "bg-accent text-on-accent"
                    : "bg-surface text-ink"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display text-lg leading-snug font-bold text-balance">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-ink-soft">
                {step.place}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
