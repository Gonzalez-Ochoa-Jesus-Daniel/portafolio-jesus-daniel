/**
 * Two colours per chapter, not one. A single flat tint reads washed out; a
 * pair lets the page glow from two directions the way an anime key visual
 * does — a lead colour and a partner that bleeds in from the corners.
 *
 * They are pulled from the series Jesús Daniel actually watches, and run cool
 * to warm down the page, like an afternoon turning into dusk.
 */
export const accents = {
  /** Jujutsu Kaisen — Gojo's Infinity blue, with cursed violet behind it. */
  infinito: {
    color: "#5ec8f8",
    duo: "#a78bfa",
    soft: "rgba(94, 200, 248, 0.2)",
  },

  /** Jujutsu Kaisen — Hollow Purple, warmed by a domain-expansion pink. */
  hueco: {
    color: "#a98bf5",
    duo: "#ff8fd0",
    soft: "rgba(169, 139, 245, 0.2)",
  },

  /** Jujutsu Kaisen — a cursed technique going off: violet into Sukuna red. */
  maldicion: {
    color: "#c785f0",
    duo: "#ff6f9c",
    soft: "rgba(199, 133, 240, 0.2)",
  },

  /** Mashle — cream-puff pink lit by golden magic. */
  crema: {
    color: "#ff93b8",
    duo: "#ffd166",
    soft: "rgba(255, 147, 184, 0.2)",
  },

  /** Sakamoto Days / Super no Ura — a convenience-store dusk. */
  atardecer: {
    color: "#ffa955",
    duo: "#ff6f6f",
    soft: "rgba(255, 169, 85, 0.2)",
  },
} as const;

export type AccentName = keyof typeof accents;
