import type { AccentName } from "./accents";

export type Chapter = {
  /** Anchor id on the section element. */
  id: string;
  /** Printed chapter number, as it appears in the page gutter. */
  number: string;
  label: string;
  accent: AccentName;
  /** Katakana strip that labels the panel, the way a manga page does. */
  kana: string;
  /** The sound effect printed across the panel. */
  sfx: string;
};

/** The page reads as one chapter per section, each with its own accent. */
export const chapters: Chapter[] = [
  {
    id: "inicio",
    number: "01",
    label: "Inicio",
    accent: "infinito",
    kana: "スタート",
    sfx: "ドン",
  },
  {
    id: "sobre-mi",
    number: "02",
    label: "Sobre mí",
    accent: "hueco",
    kana: "プロフィール",
    sfx: "シーン",
  },
  {
    id: "proyectos",
    number: "03",
    label: "Proyectos",
    accent: "maldicion",
    kana: "作品",
    sfx: "バン",
  },
  {
    id: "habilidades",
    number: "04",
    label: "Habilidades",
    accent: "crema",
    kana: "スキル",
    sfx: "キラッ",
  },
  {
    id: "contacto",
    number: "05",
    label: "Contacto",
    accent: "atardecer",
    kana: "連絡",
    sfx: "ヒュン",
  },
];
