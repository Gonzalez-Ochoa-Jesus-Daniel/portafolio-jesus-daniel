/**
 * Skills, grouped by how well he actually knows them.
 *
 * Every entry here is evidence-based: it appears in the Bolsa de Trabajo
 * source or in this portfolio. Levels are a first proposal for Jesús Daniel
 * to correct — being honest about what is still being learned reads far
 * better to a recruiter than claiming everything.
 */
export type SkillLevel = 1 | 2 | 3;

export type SkillGroup = {
  id: string;
  title: string;
  /** Katakana label for the panel header. */
  kana: string;
  level: SkillLevel;
  levelLabel: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "domino",
    title: "Lo domino",
    kana: "得意",
    level: 3,
    levelLabel: "Sólido",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML y CSS",
      "Tailwind CSS",
      "Diseño de interfaces",
      "Prototipado",
      "Git",
    ],
  },
  {
    id: "experiencia",
    title: "Tengo experiencia",
    kana: "経験",
    level: 2,
    levelLabel: "Intermedio",
    skills: [
      "Next.js",
      "TanStack Query",
      "Zustand",
      "Vite",
      "React Router",
      "Consumo de APIs REST",
      "Trabajo en equipo con Git",
      "Backend con .NET",
    ],
  },
  {
    id: "aprendiendo",
    title: "Lo estoy aprendiendo",
    kana: "勉強",
    level: 1,
    levelLabel: "En progreso",
    skills: ["Pruebas automatizadas", "Accesibilidad web"],
  },
];
