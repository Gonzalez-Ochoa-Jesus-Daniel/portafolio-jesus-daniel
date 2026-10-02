/**
 * His story, in his own words — tidied, not invented.
 *
 * The experience block comes first on purpose: having already worked inside a
 * real company is the thing most students applying for the same internships
 * cannot claim, so it gets the most space and the strongest styling.
 */
export const about = {
  career: "Ingeniería en Desarrollo y Gestión de Software",
  paragraphs: [
    "Estoy terminando la Ingeniería en Desarrollo y Gestión de Software. Me dedico al frontend y al diseño: lo que más disfruto es llevar una idea desde el prototipo hasta verla funcionando en pantalla.",
    "Siempre me dio curiosidad cómo funcionaba la tecnología por dentro. Esa curiosidad se volvió oficio en el bachillerato técnico, cuando descubrí la programación, y desde entonces no la he soltado.",
    "Ahora busco prácticas profesionales donde pueda aportar lo que sé, aprender de un equipo con experiencia y seguir creciendo.",
  ],
};

import type { StaticImageData } from "next/image";
import codelandLogo from "@/assets/empresas/codeland.png";
import codedrilosLogo from "@/assets/empresas/codedrilos.png";

export type Experience = {
  logo: StaticImageData;
  /** Alt text for the logo — says whose it is, not what it looks like. */
  logoAlt: string;
  company: string;
  role: string;
  area: string;
  detail: string;
  /** What he took away from it. */
  learned: string[];
  /** Which pixel object sits on the card. */
  object: "terminal" | "engrane" | "basedatos" | "llaves";
  featured?: boolean;
};

export const experience: Experience[] = [
  {
    logo: codelandLogo,
    logoAlt: "Logotipo de Codeland",
    company: "Codeland",
    role: "Practicante de desarrollo",
    area: "Frontend y backend",
    detail:
      "Mis prácticas profesionales de TSU, dentro de una empresa y un equipo de verdad. Trabajé en los dos lados del producto y conocí cómo se organiza el trabajo más allá del código.",
    learned: [
      "Entorno .NET",
      "C#",
      "Frontend y backend",
      "Trabajar con un PM",
      "Documentación técnica",
    ],
    object: "terminal",
    featured: true,
  },
  {
    logo: codedrilosLogo,
    logoAlt: "Logotipo de CodeDrilos",
    company: "CodeDrilos",
    role: "Frontend y diseño",
    area: "Equipo de desarrollo",
    detail:
      "Con este equipo construimos la Bolsa de Trabajo UTTECAM, que hoy está en línea. Me encargué del frontend y del diseño, desde los primeros prototipos hasta el código final.",
    learned: [
      "React",
      "TypeScript",
      "Diseño de interfaces",
      "Prototipado",
      "Trabajo en equipo",
    ],
    object: "engrane",
  },
];

export type Milestone = {
  title: string;
  place: string;
  current?: boolean;
};

/** Education, kept compact — the experience above is the headline. */
export const formacion: Milestone[] = [
  {
    title: "Bachillerato técnico",
    place: "Aquí descubrí la programación",
  },
  {
    title: "TSU",
    place: "Primeras prácticas profesionales en Codeland",
  },
  {
    title: "Ingeniería en Desarrollo y Gestión de Software",
    place: "A punto de egresar",
    current: true,
  },
];
