"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { chapters } from "@/lib/chapters";
import { useActiveChapter } from "./chapter-provider";
import { ThemeToggle } from "./theme-toggle";

const EASE = [0.22, 1, 0.36, 1] as const;

const menuList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.15 } },
};

export function SiteNav() {
  const activeId = useActiveChapter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep the page behind the full-screen menu from scrolling.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Logo: initials set in an ink block, like a chapter stamp. */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <span className="grid size-9 place-items-center border-2 border-ink bg-ink font-display text-sm font-bold text-paper">
              JD
            </span>
            <span className="hidden font-mono text-[11px] font-medium tracking-[0.16em] text-ink-soft uppercase sm:block">
              Portafolio
            </span>
          </a>

          {/* Desktop chapter links */}
          <nav className="hidden items-center md:flex" aria-label="Capítulos">
            {chapters.map((chapter) => {
              const isActive = chapter.id === activeId;
              return (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3.5 py-2.5 font-mono text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span
                    className={`mr-1.5 text-[10px] transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-ink-faint"
                    }`}
                  >
                    {chapter.number}
                  </span>
                  {chapter.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-chapter"
                      className="absolute inset-x-3 bottom-1 h-0.5 bg-accent"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center border-2 border-ink bg-surface transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:hidden"
            >
              <span className="sr-only">Menú</span>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu: a manga page turning over the content. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[60] bg-paper md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de capítulos"
          >
            <div
              aria-hidden
              className="screentone pointer-events-none absolute inset-0 opacity-60"
            />

            <div className="relative flex h-full flex-col px-5 pt-5 pb-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-ink-soft uppercase">
                  Índice
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="grid size-9 place-items-center border-2 border-ink bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <motion.nav
                variants={menuList}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="mt-auto mb-auto flex flex-col gap-1"
                aria-label="Capítulos"
              >
                {chapters.map((chapter) => (
                  <motion.a
                    key={chapter.id}
                    variants={menuItem}
                    href={`#${chapter.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span className="font-mono text-xs text-ink-faint">
                      {chapter.number}
                    </span>
                    <span className="font-display text-4xl font-bold transition-colors duration-200 group-hover:text-accent">
                      {chapter.label}
                    </span>
                  </motion.a>
                ))}
              </motion.nav>

              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">
                第一巻 — Portafolio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
