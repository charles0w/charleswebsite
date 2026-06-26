"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const games = [
  {
    name: "Pokemon",
    note: "Vintage holos, PSA slabs, set collection",
    accent: "var(--gold)",
    icon: "P",
  },
  {
    name: "One Piece",
    note: "OP-01 through current, Japanese pulls",
    accent: "var(--red)",
    icon: "OP",
  },
  {
    name: "Market Arbitrage",
    note: "eBay · TCGPlayer · price delta tracking",
    accent: "var(--green)",
    icon: "$",
  },
];

export default function CardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.children, {
        opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, delay: i * 0.12, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cards"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "var(--bg)",
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left text */}
          <div ref={headRef}>
            <p className="label mb-4" style={{ color: "var(--gold)" }}>
              Trading Cards
            </p>
            <h2
              className="leading-[1.05] tracking-[-0.025em]"
              style={{ fontFamily: "var(--sans)", fontWeight: 700, color: "var(--white)", fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              Part collector.
              <br />
              <span style={{ color: "var(--gold)" }}>Part arbitrageur.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed max-w-lg" style={{ color: "var(--txt-mid)" }}>
              I collect Pokemon and One Piece cards — but the interesting part is the
              market structure. Prices on eBay and TCGPlayer are systematically inefficient,
              especially for Japanese pulls and sealed products. I built tools to track those
              price deltas and find undervalued cards before the market corrects.
            </p>
            <p className="mt-4 text-base leading-relaxed max-w-lg" style={{ color: "var(--txt-mid)" }}>
              It&rsquo;s the same pattern recognition that drives the trading bot — just applied
              to cardboard instead of derivatives.
            </p>
            <a
              href="#work"
              onClick={() => window.location.href = "/#work"}
              className="mono inline-flex items-center gap-2 mt-6 text-sm font-medium uppercase tracking-[0.1em] transition-all hover:gap-3"
              style={{ color: "var(--gold)" }}
            >
              See TCGAuto &amp; Card Arbitrage <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Right: game cards */}
          <div className="flex flex-col gap-3">
            {games.map((g, i) => (
              <div
                key={g.name}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="card edge-top sheen p-6 flex items-center gap-6"
                style={{ backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${g.accent} 13%, transparent) 0%, transparent 70%)` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${g.accent} 16%, transparent)`,
                    color: g.accent,
                    border: `1px solid color-mix(in srgb, ${g.accent} 32%, transparent)`,
                  }}
                >
                  {g.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg tracking-tight" style={{ color: "var(--white)" }}>{g.name}</h3>
                  <p className="text-sm mt-0.5" style={{ color: "var(--txt-mid)" }}>{g.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
