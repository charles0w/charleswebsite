"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image as ImageIcon, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── chrome / glass media frame placeholder ── */
function ArtworkSlot({
  label,
  note,
  ratio = "4/3",
  color,
}: {
  label: string;
  note: string;
  ratio?: string;
  color: string;
}) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-3 text-center"
      style={{
        aspectRatio: ratio,
        minHeight: 140,
        borderRadius: 10,
        border: "1px dashed var(--line-2)",
        background: "var(--glass)",
        overflow: "hidden",
        padding: "0 14px",
      }}
    >
      {/* inner accent glow */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120px 90px at 50% 38%, color-mix(in srgb, ${color} 16%, transparent), transparent 72%)`,
          pointerEvents: "none",
        }}
      />
      <ImageIcon size={26} strokeWidth={1.5} style={{ color: "var(--txt-dim)", position: "relative" }} />
      <span className="mono" style={{ color: "var(--txt-dim)", fontSize: "0.72rem", letterSpacing: "0.06em", position: "relative" }}>
        [ {label} ]
      </span>
      <span className="mono" style={{ color: "var(--txt-faint)", fontSize: "0.62rem", lineHeight: 1.4, position: "relative" }}>
        {note}
      </span>
    </div>
  );
}

const interests = [
  {
    title: "Cars",
    sub: "Redline Car Club · Track Days · Thunderhill",
    description:
      "Co-founded Redline at UC Berkeley. Monthly meets at the Berkeley Marina, track days at Thunderhill Raceway, annual car show.",
    color: "var(--red)",
    href: "/life#cars",
    artwork: { label: "car render", note: "drop art in /public/art/cars.jpg", ratio: "4/3" },
  },
  {
    title: "Trading Cards",
    sub: "Pokemon · One Piece · TCG Arbitrage",
    description:
      "Collector and arbitrageur. Built tools to find undervalued cards on eBay vs TCGPlayer — same pattern recognition as the trading bot.",
    color: "var(--gold)",
    href: "/life#cards",
    artwork: { label: "card render", note: "drop art in /public/art/cards.jpg", ratio: "3/4" },
  },
  {
    title: "Finance",
    sub: "Options · Prediction Markets · Quant Research",
    description:
      "Building systematic edges across markets — options research via Claude Opus 4.7, Polymarket copy-trading with LLM thesis gating.",
    color: "var(--green)",
    href: "/life#finance",
    artwork: { label: "chart render", note: "drop art in /public/art/finance.jpg", ratio: "4/3" },
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
          { opacity: 0, y: 28 },
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
      style={{
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        paddingLeft: "clamp(5rem, 10vw, 9rem)",
        paddingRight: "clamp(2rem, 6vw, 5rem)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="label mb-4 flex items-center gap-2">
              <span style={{ width: 18, height: 1, background: "var(--line-3)", display: "inline-block" }} />
              Beyond the Code
            </p>
            <h2
              className="chrome-text"
              style={{
                fontFamily: "var(--sans)",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
              }}
            >
              There&rsquo;s more to me.
            </h2>
          </div>
          <a
            href="/life"
            className="btn-ghost"
          >
            Full life page
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interests.map((item, i) => (
            <a
              key={item.title}
              href={item.href}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="card edge-top p-6 flex flex-col gap-4"
              style={{ minHeight: 360, textDecoration: "none" }}
            >
              {/* Colored top accent line */}
              <div
                className="w-full"
                style={{
                  height: 2,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  boxShadow: `0 0 12px -2px ${item.color}`,
                }}
              />

              {/* Media frame */}
              <div className="relative flex-1 min-h-0" style={{ minHeight: 140 }}>
                <ArtworkSlot
                  label={item.artwork.label}
                  note={item.artwork.note}
                  ratio={item.artwork.ratio}
                  color={item.color}
                />
              </div>

              {/* Info */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--sans)",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    letterSpacing: "-0.01em",
                    color: item.color,
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h3>
                <p className="label mb-3">{item.sub}</p>
                <p className="text-sm" style={{ color: "var(--txt-mid)", lineHeight: 1.65 }}>
                  {item.description}
                </p>
              </div>

              <span
                className="mono inline-flex items-center gap-1.5"
                style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: item.color }}
              >
                See more
                <ArrowUpRight size={13} strokeWidth={1.75} />
              </span>
            </a>
          ))}
        </div>

        {/* Note at bottom */}
        <p className="mono mt-10 text-center" style={{ color: "var(--txt-dim)", fontSize: "0.7rem", letterSpacing: "0.04em" }}>
          * media placeholders — drop your renders in /public/art/ and update the image paths
        </p>
      </div>
    </section>
  );
}
