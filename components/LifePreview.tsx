"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const interests = [
  {
    title: "Cars",
    sub: "Redline Car Club · Track Days · Thunderhill",
    description:
      "Founded Redline at UC Berkeley. Monthly meets, Thunderhill track days, and an annual car show that draws hundreds across the Bay.",
    accent: "#FF1A1A",
    gradient: "linear-gradient(135deg, rgba(255,26,26,0.18) 0%, rgba(7,7,7,0) 80%)",
    href: "/life#cars",
  },
  {
    title: "Trading Cards",
    sub: "Pokemon · One Piece · TCG Arbitrage",
    description:
      "Built tools to find undervalued cards on eBay and TCGPlayer. Part collector, part arbitrageur — it's all pattern recognition.",
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(7,7,7,0) 80%)",
    href: "/life#cards",
  },
  {
    title: "Finance",
    sub: "Options · Prediction Markets · Quantitative Research",
    description:
      "Building systematic edges — from AI-driven options research to Polymarket copy-trading with LLM-gated thesis validation.",
    accent: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(7,7,7,0) 80%)",
    href: "/life#finance",
  },
];

export default function LifePreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.children, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
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
        background: "var(--bg2)",
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Beyond the Code
            </p>
            <h2
              className="font-black leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              There&rsquo;s more to me.
            </h2>
          </div>
          <a
            href="/life"
            className="text-sm font-semibold transition-all hover:gap-3 flex items-center gap-2 whitespace-nowrap"
            style={{ color: "var(--accent)" }}
          >
            Full life page &#8594;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {interests.map((item, i) => (
            <a
              key={item.title}
              href={item.href}
              ref={(el) => { if (el) cardsRef.current[i] = el as unknown as HTMLDivElement; }}
              className="group rounded-2xl p-7 flex flex-col gap-4 transition-all duration-400"
              style={{
                background: "var(--bg3)",
                border: "1px solid var(--border)",
                minHeight: "260px",
                backgroundImage: item.gradient,
                textDecoration: "none",
              }}
            >
              <div>
                <h3
                  className="font-black text-white text-2xl tracking-tight mb-1"
                  style={{ color: item.accent }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs font-semibold tracking-[0.12em] uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {item.sub}
                </p>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
                {item.description}
              </p>
              <span
                className="flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3"
                style={{ color: item.accent }}
              >
                See more <ArrowRight size={13} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
