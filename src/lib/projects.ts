/**
 * The real work. Everything here is verified: the stack comes from the
 * project's own source, the features from the running site. Nothing about
 * Jesús Daniel's personal role is assumed — that gets filled in by him.
 */
import type { StaticImageData } from "next/image";
import bolsaTrabajoShot from "@/assets/proyectos/bolsa-trabajo-uttecam.jpg";

export type Project = {
  slug: string;
  /** Printed like a chapter number on the panel. */
  number: string;
  title: string;
  /** Katakana label for the panel gutter. */
  kana: string;
  /** Where it came from, e.g. school or personal. */
  context: string;
  /** What he actually did on it — never assumed, always his own words. */
  role: string;
  /** Who built it. Solo work says "Proyecto individual". */
  team: string;
  year: string;
  summary: string;
  /** What makes it worth looking at, in his own terms. */
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Imported, so Next sizes it and generates a blur placeholder itself. */
  image: StaticImageData;
  imageAlt: string;
  /** Shown in the fake address bar above the screenshot. */
  host: string;
  /** Shown as a live badge on the panel. */
  status: string;
};

export const projects: Project[] = [
  {
    slug: "bolsa-trabajo-uttecam",
    number: "01",
    title: "Bolsa de Trabajo UTTECAM",
    kana: "求人",
    context: "Proyecto escolar · UTTECAM",
    role: "Frontend y diseño — del prototipo al código",
    team: "Equipo CodeDrilos",
    year: "2026",
    summary:
      "Plataforma web que conecta a estudiantes y egresados de la UTTECAM con empresas de la región de Tecamachalco. Las empresas publican vacantes, administración las valida, y los estudiantes se postulan y siguen su proceso de principio a fin.",
    highlights: [
      "Tres roles en una sola plataforma: estudiante, empresa y administración, cada uno con su propio panel.",
      "Las vacantes pasan por validación antes de publicarse, así nadie se postula a algo que no existe.",
      "Cada postulación se sigue paso a paso: postulado → CV visto → entrevista → contratado.",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "React Router",
      "API .NET",
    ],
    liveUrl: "https://uttecam-test.ant-code.org/",
    image: bolsaTrabajoShot,
    imageAlt:
      "Página principal de la Bolsa de Trabajo UTTECAM, con el campus de fondo y tarjetas de vacantes activas",
    host: "uttecam-test.ant-code.org",
    status: "En línea",
  },
];
