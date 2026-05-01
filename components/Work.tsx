"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featured = [
  {
    title: "Redline",
    type: "Website · Design",
    description:
      "Cinematic club website for UC Berkeley's automotive community — GSAP scroll animations, real photography, deployed on Vercel.",
    tags: ["Next.js", "GSAP", "Tailwind"],
    link: "https://redline-henna.vercel.app",
    accent: "#FF1A1A",
    span: "col-span-2 row-span-1",
    gradient: "linear-gradient(135deg, rgba(255,26,26,0.12) 0%, rgba(7,7,7,0) 70%)",
  },
  {
    title: "AI Trading Bot",
    type: "AI · Finance",
    description:
      "Options research pipeline using Claude Opus 4.7 as the analyst layer — deterministic signal processing with benchmark gate before live capital.",
    tags: ["Python", "Claude API", "Options"],
    link: "#",
    accent: "#1A8CFF",
    span: "col-span-1 row-span-2",
    gradient: "linear-gradient(135deg, rgba(26,140,255,0.12) 0%, rgba(7,7,7,0) 70%)",
  },
  {
    title: "CEO / Jarvis",
    type: "AI · Mobile",
    description:
      "Jarvis-style personal AI assistant that reads and writes to my second brain vault.",
    tags: ["Gemini 2.0", "FastAPI", "Expo"],
    link: "#",
    accent: "#A855F7",
    span: "col-span-1 row-span-1",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(7,7,7,0) 70%)",
  },
  {
    title: "Berkeley Biz Websites",
    type: "Startup · Automation",
    description:
      "Scrape no-website local businesses near Berkeley, auto-generate sites, cold-email to sell.",
    tags: ["Next.js", "Python", "Scraping"],
    link: "#",
    accent: "#10B981",
    span: "col-span-1 row-span-1",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(7,7,7,0) 70%)",
  },
];

const more = [
  {
    title: "TCGAuto",
    type: "Chrome Extension",
    description:
      "Autofills TCGPlayer and ShipStation from an inventory CSV — eliminates manual copy-paste for card shop owners.",
    tags: ["JavaScript", "Chrome API"],
    link: "#",
    accent: "#F59E0B",
  },
  {
    title: "SAAS × Red Cross",
    type: "Research · AI",
    description:
      "Election-risk model combining GDELT data streams, SARGE, and word-embedding sentiment analysis.",
    tags: ["Python", "NLP", "GDELT"],
    link: "#",
    accent: "#EF4444",
  },
  {
    title: "Polymarket Copy Trader",
    type: "Finance · Web3",
    description:
      "Smart-wallet copy-trading on Polymarket gated by an independent LLM event-driven thesis with a two-signal intersection rule.",
    tags: ["Python", "Web3", "LLM"],
    link: "#",
    accent: "#06B6D4",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const moreRef = useRef<HTMLDivElement[]>([]);

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

      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      });

      moreRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "var(--bg2)",
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              What I Build
            </p>
            <h2
              className="font-black leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              Projects that ship.
            </h2>
          </div>
          <a
            href="https://github.com/charles0w"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold transition-all hover:gap-3 flex items-center gap-2 whitespace-nowrap"
            style={{ color: "var(--accent)" }}
          >
            View GitHub &#8594;
          </a>
        </div>

        {/* Featured bento — 3 col × 2 row, zero voids */}
        <div
          className="grid gap-3 mb-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "240px",
            gridAutoFlow: "dense",
          }}
        >
          {featured.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className={`${p.span} proj-card relative rounded-2xl overflow-hidden cursor-pointer group`}
              style={{
                background: "var(--bg3)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Gradient accent */}
              <div className="absolute inset-0" style={{ background: p.gradient }} />

              {/* Top row */}
              <div className="relative z-10 flex items-start justify-between p-6">
                <div>
                  <span className="tag-pill" style={{ background: `${p.accent}18`, color: p.accent, borderColor: `${p.accent}30` }}>
                    {p.type}
                  </span>
                </div>
                {p.link !== "#" && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: p.accent, color: "#fff" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3
                  className="font-black text-white tracking-tight leading-tight mb-2"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "var(--muted)", maxWidth: "320px" }}
                >
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More projects — 3-col simple row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {more.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { if (el) moreRef.current[i] = el; }}
              className="proj-card rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: "var(--bg3)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between">
                <span className="tag-pill" style={{ background: `${p.accent}18`, color: p.accent, borderColor: `${p.accent}30` }}>
                  {p.type}
                </span>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={14} style={{ color: "var(--muted)" }} />
                  </a>
                )}
              </div>
              <h3 className="font-bold text-white text-lg tracking-tight">{p.title}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map((t) => (
                  <span key={t} className="tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
