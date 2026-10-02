/**
 * Pixel art, stored as characters — one letter per pixel.
 *
 * Everything is editable by hand: swap a letter to move the fringe, add a row
 * to make him taller, change a colour below to restyle him. Anything painted
 * with C, G or A follows the live chapter accent, so he recolours as you read.
 */

export const PALETTE: Record<string, string> = {
  K: "#1b1b22", // outline
  H: "#2f2a3d", // hair
  S: "#f2caa6", // skin
  P: "#1b1b22", // pupil
  M: "#b5564a", // mouth
  C: "var(--accent)", // hoodie
  D: "#3a3550", // trousers
  L: "#ccd1da", // laptop shell
  G: "var(--accent)", // screen glow
  B: "#9aa0ac", // keyboard
  W: "#fffdf7", // white / steam / paper
  A: "var(--accent)", // prop fill
  T: "#2a2a36", // terminal screen
  N: "var(--accent-2)", // the chapter's partner colour
};

/* -------------------------------------------------------------------------
   The full-body character: 16 wide. Rows 6 and 8 are the face, swapped out
   to change his expression; rows 18-21 are the legs, swapped to walk.
   ------------------------------------------------------------------------- */
const TORSO = [
  ".....KKKKKK.....",
  "....KHHHHHHK....",
  "...KHHHHHHHHK...",
  "...KHHHHHHHHK...",
  "...KHSSSSSSHK...",
  "...KSSSSSSSSK...",
  "@EYES@",
  "...KSSSSSSSSK...",
  "@MOUTH@",
  "....KSSSSSSK....",
  ".....KKSSKK.....",
  "..KKKKCCCCKKKK..",
  "..KCCCCCCCCCCK..",
  "..KCCCCCCCCCCK..",
  "..KCCCCCCCCCCK..",
  "...KCCCCCCCCK...",
  "...KDDDDDDDDK...",
  "...KDDDDDDDDK...",
];

export const FACES = {
  normal: { eyes: "...KSPSSSSPSK...", mouth: "...KSSSMMSSSK..." },
  feliz: { eyes: "...KSKSSSSKSK...", mouth: "...KSSMMMMSSK..." },
  concentrado: { eyes: "...KSPPSSPPSK...", mouth: "...KSSSKKSSSK..." },
} as const;

export type FaceName = keyof typeof FACES;

/** Eyes shut — laid over any expression for a blink. */
const EYES_CLOSED = "...KSKKSSKKSK...";

const LEGS = {
  /** Standing still. */
  idle: [
    "...KDDDKKDDDK...",
    "...KDDK..KDDK...",
    "...KDDK..KDDK...",
    "...KKKK..KKKK...",
  ],
  /** Mid-stride. */
  stepA: [
    "...KDDDKKDDDK...",
    "..KDDK....KDDK..",
    "..KDDK....KDDK..",
    ".KKKK......KKKK.",
  ],
  /** Feet passing each other. */
  stepB: [
    "...KDDDKKDDDK...",
    "...KDDK..KDDK...",
    "...KDDK..KDDK...",
    "....KKKKKKKK....",
  ],
} as const;

export type LegsName = keyof typeof LEGS;

/** Assembles a full sprite from an expression, a leg position and a blink. */
export function buildCharacter(
  face: FaceName,
  legs: LegsName,
  blinking = false,
): string[] {
  const { eyes, mouth } = FACES[face];
  const body = TORSO.map((row) => {
    if (row === "@EYES@") return blinking ? EYES_CLOSED : eyes;
    if (row === "@MOUTH@") return mouth;
    return row;
  });
  return [...body, ...LEGS[legs]];
}

/* -------------------------------------------------------------------------
   Props he carries, one per chapter.
   ------------------------------------------------------------------------- */
export const PROPS = {
  /** A laptop, open and compiling. */
  laptop: [
    "..KKKKKKKK..",
    "..KLLLLLLK..",
    "..KLGGGGLK..",
    "..KLGGGGLK..",
    "..KLLLLLLK..",
    ".KKKKKKKKKK.",
    ".KBBBBBBBBK.",
    ".KKKKKKKKKK.",
  ],
  /** Coffee, still steaming. */
  taza: ["..W.W.", "KKKKKK", "KAAAAK", "KAAAAK", "KAAAAK", "KKKKKK"],
  /** A level-up sparkle. */
  estrella: [
    "...K...",
    "..KAK..",
    ".KAAAK.",
    "KAAAAAK",
    ".KAAAK.",
    "..KAK..",
    "...K...",
  ],
  /** Mail, waiting to be sent. */
  sobre: [
    "KKKKKKKKKK",
    "KWWWWWWWWK",
    "KWKWWWWKWK",
    "KWWKWWKWWK",
    "KWWWKKWWWK",
    "KKKKKKKKKK",
  ],
} as const;

export type PropName = keyof typeof PROPS;

/* -------------------------------------------------------------------------
   Programming objects that drift around a chapter's panel. Kept small and
   few — two per chapter — so the page stays readable.
   ------------------------------------------------------------------------- */
export const OBJECTS = {
  /** A terminal with a prompt typed into it. */
  terminal: [
    "KKKKKKKKKKKK",
    "KNNNNNNNNNNK",
    "KKKKKKKKKKKK",
    "KTTTTTTTTTTK",
    "KTAATTTTTTTK",
    "KTTTAATTTTTK",
    "KTAAAAAATTTK",
    "KTTTTTTTTTTK",
    "KKKKKKKKKKKK",
  ],
  /** The bug you spend all afternoon on. */
  bicho: [
    ".K.....K.",
    "..KKKKK..",
    ".KAAAAAK.",
    "KAKAAAKAK",
    ".KAAAAAK.",
    "..KKKKK..",
    ".K.....K.",
  ],
  /** A database, stacked. */
  basedatos: [
    ".KKKKKKK.",
    "KAAAAAAAK",
    ".KKKKKKK.",
    "KAAAAAAAK",
    "KAAAAAAAK",
    ".KKKKKKK.",
    "KAAAAAAAK",
    "KAAAAAAAK",
    ".KKKKKKK.",
  ],
  /** A cog, for the things that just have to work. */
  engrane: [
    "..K.K.K..",
    ".KKKKKKK.",
    "KKAAAAAKK",
    ".KAAKAAK.",
    "KKAKKKAKK",
    ".KAAKAAK.",
    "KKAAAAAKK",
    ".KKKKKKK.",
    "..K.K.K..",
  ],
  /** Curly braces. */
  llaves: [".AA.AA.", ".A...A.", "AA...AA", ".A...A.", ".AA.AA."],
} as const;

export type ObjectName = keyof typeof OBJECTS;

export type FloatingObject = {
  name: ObjectName;
  /** Tailwind position classes, relative to the chapter's panel. */
  pos: string;
  size: string;
  dur: string;
  lag: string;
  tilt: string;
};

/** Two objects per chapter, picked for what that chapter is about. */
export const chapterObjects: Record<string, FloatingObject[]> = {
  "sobre-mi": [
    { name: "llaves", pos: "-left-9 top-6", size: "h-7", dur: "5s", lag: "0s", tilt: "-8deg" },
    { name: "bicho", pos: "-right-7 bottom-10", size: "h-8", dur: "6s", lag: "0.8s", tilt: "10deg" },
  ],
  proyectos: [
    { name: "terminal", pos: "-left-10 bottom-12", size: "h-9", dur: "5.5s", lag: "0.3s", tilt: "-6deg" },
    { name: "basedatos", pos: "-right-7 top-4", size: "h-9", dur: "6.2s", lag: "1s", tilt: "7deg" },
  ],
  habilidades: [
    { name: "engrane", pos: "-right-8 top-8", size: "h-9", dur: "5.8s", lag: "0.2s", tilt: "9deg" },
    { name: "llaves", pos: "-left-8 bottom-8", size: "h-7", dur: "4.8s", lag: "0.9s", tilt: "-10deg" },
  ],
  contacto: [
    { name: "terminal", pos: "-right-9 bottom-8", size: "h-9", dur: "5.2s", lag: "0.5s", tilt: "6deg" },
    { name: "engrane", pos: "-left-8 top-6", size: "h-8", dur: "6.4s", lag: "0.1s", tilt: "-9deg" },
  ],
};

/* -------------------------------------------------------------------------
   What he is doing in each chapter.
   ------------------------------------------------------------------------- */
export type Pose = {
  face: FaceName;
  prop: PropName | null;
  line: string;
};

export const poses: Record<string, Pose> = {
  inicio: { face: "feliz", prop: null, line: "¡Hola! Pásale." },
  "sobre-mi": { face: "normal", prop: "taza", line: "Café y código." },
  proyectos: { face: "concentrado", prop: "laptop", line: "Compilando…" },
  habilidades: { face: "feliz", prop: "estrella", line: "¡Subí de nivel!" },
  contacto: { face: "feliz", prop: "sobre", line: "¡Escríbeme!" },
};

/* -------------------------------------------------------------------------
   Contact mascots — one little creature per way of reaching him. Each has a
   face so it reads as a character, and a second frame with its eyes shut so
   it can blink. Original art, not anyone's logo.
   ------------------------------------------------------------------------- */
const CORREO = [
  "..KKKKKKKKKK..",
  ".KWWWWWWWWWWK.",
  ".KWKWWWWWWKWK.",
  ".KWWKWWWWKWWK.",
  ".KWWWKWWKWWWK.",
  ".KWWWWKKWWWWK.",
  ".KWWWWWWWWWWK.",
  "@EYES@",
  ".KWWWWWWWWWWK.",
  ".KWWWMMMMWWWK.",
  ".KWWWWWWWWWWK.",
  "..KKKKKKKKKK..",
];

const BURBUJA = [
  "..KKKKKKKKK..",
  ".KAAAAAAAAAK.",
  "KAAAAAAAAAAAK",
  "@EYES@",
  "KAAAAAAAAAAAK",
  "KAAAAMMMAAAAK",
  "KAAAAAAAAAAAK",
  ".KAAAAAAAAAK.",
  "..KKKKAKKKK..",
  ".....KAK.....",
  "......K......",
];

const GATO = [
  ".KK........KK.",
  ".KHK......KHK.",
  ".KHHK....KHHK.",
  "..KHHHHHHHHK..",
  ".KHHHHHHHHHHK.",
  "@EYES@",
  "KHHHHHHHHHHHHK",
  "KHHHHMMMMHHHHK",
  "KHHHHHHHHHHHHK",
  ".KHHHHHHHHHHK.",
  "..KKKKKKKKKK..",
];

/** Swaps the "@EYES@" marker for open or shut eyes. */
function withEyes(frame: string[], open: string, shut: string, blinking: boolean) {
  return frame.map((row) => (row === "@EYES@" ? (blinking ? shut : open) : row));
}

export type Mascot = { frame: string[]; blink: string[] };

export const MASCOTS: Record<string, Mascot> = {
  correo: {
    frame: withEyes(CORREO, ".KWPWWWWWWPWK.", ".KWKWWWWWWKWK.", false),
    blink: withEyes(CORREO, ".KWPWWWWWWPWK.", ".KWKWWWWWWKWK.", true),
  },
  whatsapp: {
    frame: withEyes(BURBUJA, "KAAPAAAAAPAAK", "KAAKAAAAAKAAK", false),
    blink: withEyes(BURBUJA, "KAAPAAAAAPAAK", "KAAKAAAAAKAAK", true),
  },
  github: {
    frame: withEyes(GATO, "KHHPHHHHHHPHHK", "KHHKHHHHHHKHHK", false),
    blink: withEyes(GATO, "KHHPHHHHHHPHHK", "KHHKHHHHHHKHHK", true),
  },
};
