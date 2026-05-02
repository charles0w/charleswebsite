"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── artwork placeholder slot ── */
function ArtworkSlot({
  label,
  note,
  ratio = "4/3",
  rotate = "0deg",
}: {
  label: string;
  note: string;
  ratio?: string;
  rotate?: string;
}) {
  return (
    <div
      className="artwork-slot"
      style={{ aspectRatio: ratio, transform: `rotate(${rotate})` }}
    >
      {/* Tape strip at top */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 52,
          height: 18,
          background: "var(--tape)",
          borderRadius: 2,
        }}
      />
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ opacity: 0.4 }}>
        <path d="M4 28 L12 8 L20 20 L25 14 L30 28 Z" stroke="var(--pencil)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <circle cx="24" cy="10" r="3" stroke="var(--pencil)" strokeWidth="1.2" fill="none" />
      </svg>
      <p style={{ fontSize: "0.95rem", lineHeight: 1.4, padding: "0 12px" }}>
        [ {label} ]
      </p>
      <p style={{ fontSize: "0.7rem", opacity: 0.55 }}>
        {note}
      </p>
    </div>
  );
}

const interests = [
  {
    title: "Cars",
    sub: "Redline Car Club · Track Days · Thunderhill",
    description:
      "Co-founded Redline at UC Berkeley. Monthly meets at the Berkeley Marina, track days at Thunderhill Raceway, annual car show.",
    color: "#C44444",
    href: "/life#cars",
    artwork: { label: "car sketch", note: "drop art in /public/art/cars.jpg", ratio: "4/3", rotate: "-1.5deg" },
    rotate: "-0.6deg",
  },
  {
    title: "Trading Cards",
    sub: "Pokemon · One Piece · TCG Arbitrage",
    description:
      "Collector and arbitrageur. Built tools to find undervalued cards on eBay vs TCGPlayer — same pattern recognition as the trading bot.",
    color: "#9B6A1A",
    href: "/life#cards",
    artwork: { label: "card sketch", note: "drop art in /public/art/cards.jpg", ratio: "3/4", rotate: "1deg" },
    rotate: "0.4deg",
  },
  {
    title: "Finance",
    sub: "Options · Prediction Markets · Quant Research",
    description:
      "Building systematic edges across markets — options research via Claude Opus 4.7, Polymarket copy-trading with LLM thesis gating.",
    color: "#1A6B4A",
    href: "/life#finance",
    artwork: { label: "chart sketch", note: "drop art in /public/art/finance.jpg", ratio: "4/3", rotate: "-0.8deg" },
    rotate: "-0.3deg",
  },
];

export default function LifePreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.children, {
        opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 28, rotate: 0 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="life-preview"
      className="relative w-full"
      style={{ paddingBlock: "clamp(5rem, 12vw, 9rem)", paddingLeft: "clamp(5rem, 10vw, 9rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-caveat)", color: "var(--pencil)" }}>
              Beyond the Code
            </p>
            <h2 className="sketch-ul" style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(2.4rem, 5vw, 4.2rem)", color: "var(--ink)" }}>
              There&rsquo;s more to me.
            </h2>
          </div>
          <a href="/life" style={{ fontFamily: "var(--font-caveat)", fontSize: "1.05rem", color: "var(--blue-ink)", textDecoration: "none" }}>
            Full life page →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interests.map((item, i) => (
            <a
              key={item.title}
              href={item.href}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="life-card p-6 flex flex-col gap-4"
              style={{ transform: `rotate(${item.rotate})`, minHeight: 360 }}
            >
              {/* Colored top accent line */}
              <div className="h-1.5 w-full rounded-full -mt-1 -mx-0 mb-1" style={{ background: item.color, opacity: 0.75 }} />

              {/* Artwork slot */}
              <div className="relative flex-1 min-h-0" style={{ minHeight: 140 }}>
                <ArtworkSlot
                  label={item.artwork.label}
                  note={item.artwork.note}
                  ratio={item.artwork.ratio}
                  rotate={item.artwork.rotate}
                />
              </div>

              {/* Info */}
              <div>
                <h3 style={{ fontFamily: "var(--font-caveat)", fontSize: "1.7rem", color: item.color, lineHeight: 1.1, marginBottom: 2 }}>
                  {item.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.1em] mb-3" style={{ color: "var(--pencil)", fontFamily: "var(--font-caveat)" }}>
                  {item.sub}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-lato)" }}>
                  {item.description}
                </p>
              </div>

              <span style={{ fontFamily: "var(--font-caveat)", fontSize: "1rem", color: item.color }}>
                See more →
              </span>
            </a>
          ))}
        </div>

        {/* Sketch note at bottom */}
        <p className="mt-8 text-center" style={{ fontFamily: "var(--font-caveat)", fontSize: "0.95rem", color: "var(--pencil)", opacity: 0.6 }}>
          * artwork placeholders — drop your sketches in /public/art/ and update the image paths
        </p>
      </div>
    </section>
  );
}
