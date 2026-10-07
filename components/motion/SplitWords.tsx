import { Fragment } from "react";

export type Segment = string | { text: string; className?: string } | { br: true; className?: string };

/**
 * Splits text into masked words for the "words" reveal. Renders on the server;
 * the parent element carries data-reveal="words". Real spaces stay between words
 * so the text reads and wraps naturally.
 */
export function SplitWords({ segments, start = 0 }: { segments: Segment[] | string; start?: number }) {
  const list: Segment[] = typeof segments === "string" ? [segments] : segments;
  let i = start;
  return (
    <>
      {list.map((seg, s) => {
        if (typeof seg !== "string" && "br" in seg) return <br key={s} className={seg.className} />;
        const text = typeof seg === "string" ? seg : seg.text;
        const cls = typeof seg === "string" ? undefined : seg.className;
        const words = text.split(/\s+/).filter(Boolean);
        return (
          <Fragment key={s}>
            {words.map((w, wi) => (
              <Fragment key={wi}>
                <span className="split-w">
                  <span className={cls} style={{ "--i": i++ } as React.CSSProperties}>
                    {w}
                  </span>
                </span>
                {wi < words.length - 1 || s < list.length - 1 ? " " : null}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </>
  );
}
