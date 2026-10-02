type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds to wait before the first letter drops in. */
  delay?: number;
};

/**
 * Drops a headline in letter by letter, each rising out of its own clipped
 * line. Built on CSS animations rather than a motion library so the words are
 * painted by the browser on first frame — no JavaScript in the way.
 */
export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const words = text.split(" ");
  let index = 0;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap">
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-flex">
            {Array.from(word).map((char, charIndex) => {
              const letterDelay = delay + index * 0.035;
              index += 1;
              return (
                <span
                  key={`${char}-${charIndex}`}
                  className="inline-block overflow-hidden py-[0.06em]"
                >
                  <span
                    className="anim-letter"
                    style={{ animationDelay: `${letterDelay.toFixed(3)}s` }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
