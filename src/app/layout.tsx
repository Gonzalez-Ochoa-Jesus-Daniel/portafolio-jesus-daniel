import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  JetBrains_Mono,
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import { ChapterProvider } from "@/components/chapter-provider";
import { PixelCompanion } from "@/components/pixel-companion";
import ClickSpark from "@/components/reactbits/click-spark";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

/* Display face: a Japanese mincho with the weight of a chapter title. */
const displayJp = Shippori_Mincho_B1({
  variable: "--font-display-jp",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

/* Body face: a Japanese gothic that also sets Spanish text cleanly. */
const bodyJp = Zen_Kaku_Gothic_New({
  variable: "--font-body-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/* Utility face for labels, tags and anything technical. */
const monoCode = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jesús Daniel González Ochoa — Portafolio",
  description:
    "Portafolio de desarrollo web de Jesús Daniel González Ochoa, próximo a egresar.",
};

/**
 * The chosen theme rides in a cookie, so the server already stamps the right
 * one onto <html>. No inline script, no flash of the wrong theme, and a reader
 * who never touched the toggle simply follows their system setting.
 */
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const stored = (await cookies()).get("theme")?.value;
  const theme = stored === "dark" || stored === "light" ? stored : undefined;

  return (
    <html
      lang="es"
      data-theme={theme}
      suppressHydrationWarning
      className={`${displayJp.variable} ${bodyJp.variable} ${monoCode.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <ChapterProvider>
          <ClickSpark
            sparkColor="--accent"
            sparkCount={10}
            sparkSize={9}
            sparkRadius={18}
            duration={420}
          >
            <SiteNav />
            {children}
            <PixelCompanion />
          </ClickSpark>
        </ChapterProvider>
      </body>
    </html>
  );
}
