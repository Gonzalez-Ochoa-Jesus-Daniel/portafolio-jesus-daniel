"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { accents } from "@/lib/accents";
import { chapters } from "@/lib/chapters";

const ChapterContext = createContext<string>(chapters[0].id);

/** Id of the chapter currently crossing the middle of the viewport. */
export function useActiveChapter() {
  return useContext(ChapterContext);
}

/**
 * Tracks which chapter the reader is in and hands its accent to the document
 * root, so the whole page fades to that colour. The nav reads the same value
 * to mark the active link — one source of truth for "where am I".
 *
 * This measures on scroll rather than using IntersectionObserver: the observer
 * only fires while the page is actually being painted, so a backgrounded or
 * occluded tab could leave the page stuck on one colour. Measuring five rects
 * per scroll event is cheap and always runs.
 */
export function ChapterProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState(chapters[0].id);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const update = () => {
      // innerHeight can read 0 in a collapsed or hidden viewport; falling back
      // keeps the maths sane instead of pinning everything to chapter one.
      const viewport =
        window.innerHeight || document.documentElement.clientHeight || 800;
      const middle = viewport / 2;
      let current = sections[0].id;

      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= middle && bottom > middle) {
          current = section.id;
          break;
        }
        // Past the middle already: remember the last one we crossed.
        if (top <= middle) current = section.id;
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    // Deferred so the first measurement doesn't run inside the effect body.
    const initial = window.setTimeout(update, 0);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const chapter = chapters.find((item) => item.id === activeId);
    if (!chapter) return;
    const { color, duo, soft } = accents[chapter.accent];
    const root = document.documentElement;
    root.style.setProperty("--accent", color);
    root.style.setProperty("--accent-2", duo);
    root.style.setProperty("--accent-soft", soft);
  }, [activeId]);

  return (
    <ChapterContext.Provider value={activeId}>
      {children}
    </ChapterContext.Provider>
  );
}
