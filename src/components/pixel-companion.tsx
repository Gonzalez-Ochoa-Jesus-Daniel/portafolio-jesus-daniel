"use client";

import { useEffect, useState } from "react";
import { useActiveChapter } from "./chapter-provider";
import { PixelSprite } from "./pixel-sprite";
import { buildCharacter, poses, PROPS } from "@/lib/pixel-data";

/**
 * A small pixel Jesús Daniel who follows the reader down the page.
 *
 * While you scroll he walks; when you stop he settles into whatever the
 * current chapter has him doing — nursing a coffee, hunched over a laptop,
 * holding up a level-up sparkle. He stays out of the way in the corner and is
 * decorative only, so screen readers skip him entirely.
 */
export function PixelCompanion() {
  const activeId = useActiveChapter();
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    let stopTimer = 0;

    const onScroll = () => {
      setWalking(true);
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => setWalking(false), 220);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(stopTimer);
    };
  }, []);

  const pose = poses[activeId] ?? poses.inicio;
  // He shows up once you have left the opening panel behind.
  const onStage = activeId !== "inicio";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-4 left-4 z-40 hidden items-end gap-2 transition-all duration-500 sm:flex sm:bottom-6 sm:left-6 ${
        onStage
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="relative">
        {/* Speech bubble, only while he is standing still. */}
        <div
          className={`panel absolute bottom-full left-1 mb-2 w-max max-w-[11rem] px-2.5 py-1.5 transition-all duration-300 ${
            walking ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <p className="font-mono text-[10px] leading-tight whitespace-nowrap">
            {pose.line}
          </p>
        </div>

        {/* The character. Two step frames swap while walking; standing still
            he breathes and blinks, and hops when he reaches a new chapter. */}
        <div key={activeId} className="pixel-hop">
          <div className={walking ? "pixel-step" : "pixel-bob relative"}>
            {walking ? (
              <>
                <PixelSprite
                  frame={buildCharacter(pose.face, "stepA")}
                  className="h-16 w-auto sm:h-20"
                />
                <PixelSprite
                  frame={buildCharacter(pose.face, "stepB")}
                  className="pixel-step-alt absolute inset-0 h-16 w-auto sm:h-20"
                />
              </>
            ) : (
              <>
                <PixelSprite
                  frame={buildCharacter(pose.face, "idle", true)}
                  className="h-16 w-auto sm:h-20"
                />
                <PixelSprite
                  frame={buildCharacter(pose.face, "idle")}
                  className="pixel-blink absolute inset-0 h-16 w-auto sm:h-20"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Whatever he is holding this chapter. */}
      {pose.prop && !walking && (
        <div className="float-loop mb-1" style={{ ["--dur" as string]: "3.2s" }}>
          <PixelSprite
            frame={PROPS[pose.prop]}
            className="h-8 w-auto sm:h-10"
          />
        </div>
      )}
    </div>
  );
}
