"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Options Research",
    description:
      "Claude Opus 4.7 as the analyst layer on a deterministic signal pipeline. Benchmark gate before any live capital. Currently in backtesting.",
    accent: "var(--green)",
    metric: "AI-driven",
  },
  {
    title: "Prediction Markets",
    description:
      "Polymarket copy-trading with an LLM event-driven thesis layer. Two-signal intersection rule — smart wallet signal must agree with an independent model thesis.",
    accent: "var(--teal)",
    metric: "Multi-signal",
  },
  {
    title: "Card Arbitrage",
    description:
      "Systematic inefficiencies in secondary card markets. eBay vs TCGPlayer delta tracking for Japanese pulls, sealed products, and graded slabs.",
    accent: "var(--gold)",
    metric: "Market edges",
  },
];

export default function FinanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.children, {
        opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });

      pillarsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="finance"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "var(--bg-2)",
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Green ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,217,168,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-14">
          <p className="label mb-4" style={{ color: "var(--green)" }}>
            Finance &amp; Trading
          </p>
          <h2
            className="leading-[1.05] tracking-[-0.025em] max-w-xl"
            style={{ fontFamily: "var(--sans)", fontWeight: 700, color: "var(--white)", fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
          >
            Finding edges everywhere.
          </h2>
          <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: "var(--txt-mid)" }}>
            Whether it&rsquo;s options markets, prediction markets, or trading card markets — the
            framework is the same: find systematic inefficiencies, build tools to exploit them
            faster than the market corrects, and gate everything behind rigorous validation
            before risking real capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { if (el) pillarsRef.current[i] = el; }}
              className="card edge-top p-7 flex flex-col gap-4"
              style={{ backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${p.accent} 12%, transparent) 0%, transparent 70%)` }}
            >
              <span
                className="chip self-start"
                style={{
                  color: p.accent,
                  background: `color-mix(in srgb, ${p.accent} 14%, transparent)`,
                  borderColor: `color-mix(in srgb, ${p.accent} 32%, transparent)`,
                }}
              >
                {p.metric}
              </span>
              <h3 className="font-semibold text-xl tracking-tight" style={{ color: "var(--white)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--txt-mid)" }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
