import Image from "next/image";
import type { CSSProperties } from "react";
import { PixelSprite } from "./pixel-sprite";
import { OBJECTS } from "@/lib/pixel-data";
import type { Project } from "@/lib/projects";

const delay = (seconds: number) =>
  ({ "--reveal-delay": `${seconds}s` }) as CSSProperties;

/**
 * One project, laid out as a manga spread: the real screenshot framed like a
 * browser inside an ink panel on one side, the facts on the other, with a
 * status window borrowed from every anime that ever showed you your stats.
 */
export function ProjectPanel({ project }: { project: Project }) {
  return (
    <article className="relative">
      {/* Work number, printed in the gutter. */}
      <span
        aria-hidden
        className="kana vertical-jp absolute -left-8 top-2 hidden text-[11px] 2xl:block"
      >
        {project.kana}
      </span>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        {/* ---- The screenshot, framed as a browser inside a panel ---- */}
        <div data-reveal="panel" style={delay(0)} className="relative">
          <div className="panel overflow-hidden">
            {/* Browser chrome, drawn in ink */}
            <div className="flex items-center gap-2 border-b-2 border-ink bg-accent px-3 py-2">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full border-2 border-ink bg-surface" />
                <span className="size-2.5 rounded-full border-2 border-ink bg-surface" />
                <span className="size-2.5 rounded-full border-2 border-ink bg-surface" />
              </span>
              <span className="truncate font-mono text-[10px] text-on-accent">
                {project.host}
              </span>
            </div>

            <Image
              src={project.image}
              alt={project.imageAlt}
              placeholder="blur"
              className="block h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          {/* Live badge, stuck on the corner of the panel */}
          <span className="panel absolute -top-4 -right-1 flex items-center gap-1.5 px-2.5 py-1.5 sm:-right-3 font-mono text-[10px] tracking-wider uppercase shadow-[3px_3px_0_var(--accent)]">
            <span className="size-2 animate-pulse rounded-full border border-ink bg-accent" />
            {project.status}
          </span>

          {/* A terminal drifting beside the panel */}
          <div
            aria-hidden
            className="float-loop absolute -bottom-6 -left-6 hidden sm:block"
            style={{ "--dur": "5.4s", "--tilt": "-7deg" } as CSSProperties}
          >
            <PixelSprite
              frame={OBJECTS.terminal}
              className="h-9 w-auto drop-shadow-[2px_2px_0_var(--ink)]"
            />
          </div>
        </div>

        {/* ---- The facts ---- */}
        <div>
          <p
            data-reveal
            style={delay(0.05)}
            className="mb-4 inline-flex items-center border-2 border-ink bg-surface px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase shadow-[2px_2px_0_var(--ink)]"
          >
            作品 {project.number} — {project.context}
          </p>

          <h3
            data-reveal
            style={delay(0.1)}
            className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight font-bold text-balance"
          >
            {project.title}
          </h3>

          <p
            data-reveal
            style={delay(0.15)}
            className="mt-5 max-w-[52ch] text-[17px] leading-[1.75] text-ink-soft"
          >
            {project.summary}
          </p>


          {/* Status window: who built it, and what he did on it. */}
          <dl
            data-reveal
            style={delay(0.18)}
            className="panel mt-6 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b-2 border-ink bg-accent px-3 py-1.5">
              <span className="font-mono text-[10px] tracking-[0.18em] text-on-accent uppercase">
                ステータス · Ficha
              </span>
              <span className="font-mono text-[10px] text-on-accent">
                {project.year}
              </span>
            </div>

            <div className="grid sm:grid-cols-2">
              <div className="border-b-2 border-ink/10 px-3 py-2.5 sm:border-r-2">
                <dt className="font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">
                  Mi rol
                </dt>
                <dd className="mt-0.5 text-sm font-medium">{project.role}</dd>
              </div>
              <div className="px-3 py-2.5">
                <dt className="font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">
                  Equipo
                </dt>
                <dd className="mt-0.5 text-sm font-medium">{project.team}</dd>
              </div>
            </div>
          </dl>

          {/* The three things it actually does well. */}
          <ul
            data-reveal
            style={delay(0.2)}
            className="panel mt-7 divide-y-2 divide-ink/10 px-4 py-1"
          >
            {project.highlights.map((item, index) => (
              <li key={item} className="flex gap-3.5 py-4">
                <span
                  aria-hidden
                  className="mt-0.5 grid size-5 shrink-0 place-items-center border-2 border-ink bg-accent font-mono text-[10px] text-on-accent"
                >
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div data-reveal style={delay(0.25)} className="mt-6">
            <p className="mb-2.5 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
              Hecho con
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="border-2 border-ink bg-surface px-2.5 py-1 font-mono text-[11px] shadow-[2px_2px_0_var(--ink)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {project.liveUrl && (
            <div data-reveal style={delay(0.3)} className="mt-7">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border-2 border-ink bg-accent px-5 py-3 font-mono text-sm text-on-accent shadow-[4px_4px_0_var(--ink)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Verlo funcionando
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
