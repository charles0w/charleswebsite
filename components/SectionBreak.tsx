"use client";

import { useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════════
   SECTION BREAK — "chapter" divider
   Adapted from Forever AI Components #282 "Block Reveal"
   (infinite/text-effects/05-block-reveal.html, MIT). A chrome block
   sweeps across each line to cast the words, then retracts. Gold →
   chrome recolor; Archivo → the site's --sans.

   Reworked from the source's infinite loop into a play-once-on-scroll
   reveal — an IntersectionObserver adds `.is-in` the first time the
   block scrolls into view, and the sweep runs once and holds revealed
   (animation-fill-mode: forwards), matching the site's data-reveal
   sections. Styles live in globals.css under "SECTION BREAK"; the
   source's paired block⇄reveal clip-path keyframes and reduced-motion
   guard are preserved there.
   ════════════════════════════════════════════════════════════════ */

export default function SectionBreak({
  lines,
  label,
  ariaLabel,
}: {
  lines: string[]; // up to 3 — stagger timing compounds beyond that
  label?: string;
  ariaLabel?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);

  // Play the sweep once, the first time it scrolls into view.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stage.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3vh" }}>
      {label && <div className="label">{label}</div>}
      <div
        ref={stageRef}
        className="sbreak"
        role="img"
        aria-label={ariaLabel ?? lines.join(" ")}
      >
        {lines.slice(0, 3).map((word, i) => (
          <div className="sbreak-row" key={i}>
            <span className="sbreak-txt">{word}</span>
            <span className="sbreak-blk" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
