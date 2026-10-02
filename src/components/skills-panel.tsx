import type { CSSProperties } from "react";
import { PixelSprite } from "./pixel-sprite";
import { OBJECTS } from "@/lib/pixel-data";
import { skillGroups } from "@/lib/skills";

const delay = (seconds: number) =>
  ({ "--reveal-delay": `${seconds}s` }) as CSSProperties;

/** Three segments, filled to the level — the stat bar of a status window. */
function LevelBar({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {[1, 2, 3].map((segment) => (
        <span
          key={segment}
          className={`h-2.5 w-5 border-2 border-ink ${
            segment <= level ? "bg-accent" : "bg-surface"
          }`}
        />
      ))}
    </span>
  );
}

export function SkillsPanel() {
  return (
    <div className="relative mt-12 grid gap-7 md:grid-cols-3">
      {skillGroups.map((group, index) => (
        <section
          key={group.id}
          data-reveal="panel"
          style={delay(index * 0.12)}
          className="panel relative flex flex-col overflow-hidden"
        >
          {/* Header bar, like the title row of a status window. */}
          <header className="flex items-center justify-between border-b-2 border-ink bg-accent px-3 py-2">
            <h3 className="font-mono text-[11px] tracking-[0.16em] text-on-accent uppercase">
              {group.title}
            </h3>
            <span className="font-display text-[11px] text-on-accent">
              {group.kana}
            </span>
          </header>

          <div className="flex items-center justify-between gap-3 border-b-2 border-ink/10 px-3 py-2.5">
            <span className="font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">
              Nivel
            </span>
            <span className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] tracking-wider uppercase">
                {group.levelLabel}
              </span>
              <LevelBar level={group.level} />
            </span>
          </div>

          <ul className="flex flex-1 flex-wrap content-start gap-2 p-4">
            {group.skills.map((skill) => (
              <li
                key={skill}
                className="border-2 border-ink bg-surface px-2.5 py-1 font-mono text-[11px] shadow-[2px_2px_0_var(--ink)]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* A cog turning beside the stats. */}
      <div
        aria-hidden
        className="float-loop pointer-events-none absolute -right-2 -bottom-4 hidden lg:block"
        style={{ "--dur": "6s", "--tilt": "8deg" } as CSSProperties}
      >
        <PixelSprite
          frame={OBJECTS.engrane}
          className="h-10 w-auto drop-shadow-[2px_2px_0_var(--ink)]"
        />
      </div>
    </div>
  );
}
