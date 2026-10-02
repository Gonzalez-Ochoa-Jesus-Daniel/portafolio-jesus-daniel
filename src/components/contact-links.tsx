import type { CSSProperties } from "react";
import { PixelSprite } from "./pixel-sprite";
import { MASCOTS } from "@/lib/pixel-data";

const delay = (seconds: number) =>
  ({ "--reveal-delay": `${seconds}s` }) as CSSProperties;

type Channel = {
  mascot: keyof typeof MASCOTS;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  /** Each creature gets its own colours so they read as three characters. */
  palette: Record<string, string>;
};

const channels: Channel[] = [
  {
    mascot: "correo",
    label: "Correo",
    value: "danikwt660@gmail.com",
    href: "mailto:danikwt660@gmail.com",
    palette: { W: "#fffdf7", M: "#e0607a" },
  },
  {
    mascot: "whatsapp",
    label: "WhatsApp",
    value: "+52 249 116 3536",
    href: "https://wa.me/522491163536",
    external: true,
    palette: { A: "#5fd68c", M: "#1f6b42" },
  },
  {
    mascot: "github",
    label: "GitHub",
    value: "Gonzalez-Ochoa-Jesus-Daniel",
    href: "https://github.com/Gonzalez-Ochoa-Jesus-Daniel",
    external: true,
    palette: { H: "#9c94b5", M: "#f0a0b8" },
  },
];

/** The creature, blinking: eyes-shut frame underneath, open one on top. */
function Mascot({
  name,
  palette,
}: {
  name: keyof typeof MASCOTS;
  palette: Record<string, string>;
}) {
  const sprite = MASCOTS[name];

  return (
    <div className="pixel-bob relative h-14 w-14 shrink-0">
      <PixelSprite
        frame={sprite.blink}
        palette={palette}
        className="h-full w-full drop-shadow-[2px_2px_0_var(--ink)]"
      />
      <PixelSprite
        frame={sprite.frame}
        palette={palette}
        className="pixel-blink absolute inset-0 h-full w-full drop-shadow-[2px_2px_0_var(--ink)]"
      />
    </div>
  );
}

export function ContactLinks() {
  return (
    <ul className="mt-12 grid gap-5 sm:grid-cols-3">
      {channels.map((channel, index) => (
        <li key={channel.label} data-reveal style={delay(index * 0.1)}>
          <a
            href={channel.href}
            {...(channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="panel group flex h-full items-center gap-3.5 px-4 py-4 transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <Mascot name={channel.mascot} palette={channel.palette} />

            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                {channel.label}
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[13px] break-all">
                {channel.value}
                <span
                  aria-hidden
                  className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
