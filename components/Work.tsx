"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── project data ─────────────────────────────────────────────── */

const featured = [
  {
    title: "Redline",
    type: "Website · Design",
    description: "Cinematic club website for UC Berkeley's automotive community — GSAP scroll animations, real photography, Vercel deployed.",
    tags: ["Next.js", "GSAP", "Tailwind"],
    link: "https://redline-henna.vercel.app",
    previewUrl: "https://redline-henna.vercel.app",
    accent: "#C44444",
    span: "col-span-2 row-span-1",
    mockup: "iframe" as const,
    rotate: "-0.6deg",
  },
  {
    title: "AI Trading Bot",
    type: "AI · Finance",
    description: "Options research pipeline — Claude Opus 4.7 as analyst layer, deterministic signal processing, benchmark gate before live capital.",
    tags: ["Python", "Claude API", "Options"],
    link: "#",
    previewUrl: null,
    accent: "#1A3A80",
    span: "col-span-1 row-span-2",
    mockup: "trading" as const,
    rotate: "0.5deg",
  },
  {
    title: "CEO / Jarvis",
    type: "AI · Mobile",
    description: "Jarvis-style personal AI assistant that reads and writes to my second brain vault.",
    tags: ["Gemini 2.0", "FastAPI", "Expo"],
    link: "#",
    previewUrl: null,
    accent: "#6B3A8A",
    span: "col-span-1 row-span-1",
    mockup: "chat" as const,
    rotate: "-0.4deg",
  },
  {
    title: "Berkeley Biz Websites",
    type: "Startup · Automation",
    description: "Scrape no-website local businesses near Berkeley, auto-generate sites, cold-email to sell.",
    tags: ["Next.js", "Python", "Scraping"],
    link: "#",
    previewUrl: null,
    accent: "#1A6B4A",
    span: "col-span-1 row-span-1",
    mockup: "website" as const,
    rotate: "0.3deg",
  },
];

const more = [
  {
    title: "TCGAuto",
    type: "Chrome Extension",
    description: "Autofills TCGPlayer and ShipStation from inventory CSV — eliminates manual copy-paste for card shop owners.",
    tags: ["JavaScript", "Chrome API"],
    link: "#",
    accent: "#9B6A1A",
  },
  {
    title: "SAAS × Red Cross",
    type: "Research · AI",
    description: "Election-risk model combining GDELT data streams, SARGE, and word-embedding sentiment analysis.",
    tags: ["Python", "NLP", "GDELT"],
    link: "#",
    accent: "#8B2020",
  },
  {
    title: "Polymarket Copy Trader",
    type: "Finance · Web3",
    description: "Smart-wallet copy-trading on Polymarket gated by an independent LLM event-driven thesis with a two-signal intersection rule.",
    tags: ["Python", "Web3", "LLM"],
    link: "#",
    accent: "#1A5A6A",
  },
];

/* ─── CSS mockup previews ──────────────────────────────────────── */

function TradingMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#040d1a" }}>
      <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: "1px solid rgba(26,140,255,0.12)", height: 28 }}>
        <span className="text-[8px] font-mono font-bold" style={{ color: "#1A8CFF" }}>CLAI / OPTIONS</span>
        <span className="text-[9px] font-mono ml-auto" style={{ color: "#10B981" }}>▲ +2.4%</span>
      </div>
      <div className="px-2 pt-1">
        <svg viewBox="0 0 260 80" className="w-full" style={{ height: 80 }}>
          <defs>
            <linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A8CFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1A8CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="0,75 0,65 25,60 50,67 75,50 100,44 125,52 150,36 175,22 200,32 225,16 250,10 260,8 260,75" fill="url(#tg1)" />
          <polyline points="0,65 25,60 50,67 75,50 100,44 125,52 150,36 175,22 200,32 225,16 250,10 260,8" fill="none" stroke="#1A8CFF" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex gap-3 px-3">
        {["IV 28.4", "Δ 0.62", "θ −0.08"].map(m => (
          <span key={m} className="text-[8px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{m}</span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5" style={{ background: "rgba(16,185,129,0.07)", borderTop: "1px solid rgba(16,185,129,0.12)" }}>
        <span className="text-[8px] font-mono" style={{ color: "#10B981" }}>■ SIGNAL: BUY · 82% confidence</span>
      </div>
    </div>
  );
}

function ChatMockup() {
  const msgs = [
    { role: "user", text: "Schedule for today?" },
    { role: "ai",   text: "ECON 131 @ 10am, office hrs 2pm, Redline meet 6pm." },
    { role: "user", text: "Add track day reminder" },
    { role: "ai",   text: "June 14, 7am — Thunderhill. Helmet packed?" },
    { role: "user", text: "Check Polymarket positions" },
    { role: "ai",   text: "2 active: Election (+$340), Tech merger (−$80)." },
  ];
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "#08080f" }}>
      <div className="flex items-center gap-2 px-3 py-1.5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(168,85,247,0.12)", height: 28 }}>
        <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: "rgba(168,85,247,0.25)", color: "#A855F7" }}>J</div>
        <span className="text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>Jarvis</span>
        <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
      </div>
      <div className="flex flex-col gap-1.5 p-2 flex-1 overflow-hidden">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="rounded-xl px-2 py-1" style={{ background: m.role === "user" ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)", fontSize: 7.5, color: m.role === "user" ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)", maxWidth: "78%", lineHeight: 1.4 }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebsiteMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#050e0a" }}>
      <div className="flex items-center px-3 gap-3 flex-shrink-0" style={{ height: 26, background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(16,185,129,0.12)" }}>
        <div className="w-10 h-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.55)" }} />
        <div className="ml-auto flex gap-2">
          {["Home","Services","Contact"].map(l => <span key={l} className="text-[7.5px]" style={{ color: "rgba(255,255,255,0.25)" }}>{l}</span>)}
          <div className="w-10 h-3.5 rounded-full ml-1" style={{ background: "#10B981" }} />
        </div>
      </div>
      <div className="px-5 pt-3">
        <div className="w-1/2 h-1.5 rounded-full mb-1.5" style={{ background: "rgba(16,185,129,0.35)" }} />
        <div className="w-5/6 h-5 rounded-md mb-2" style={{ background: "rgba(16,185,129,0.15)" }} />
        <div className="w-full h-1.5 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="w-4/5 h-1.5 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.04)" }} />
        <div className="flex gap-2">
          <div className="h-5 px-3 rounded flex items-center" style={{ background: "#10B981", minWidth: 52 }} />
          <div className="h-5 px-3 rounded" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", minWidth: 40 }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-5 mt-4">
        {[1,2,3].map(i => <div key={i} className="rounded-lg h-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }} />)}
      </div>
    </div>
  );
}

function IframePreview({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1440));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {scale > 0 && (
        <iframe src={url} title="preview" style={{ width: 1440, height: 1080, transform: `scale(${scale})`, transformOrigin: "top left", border: "none", pointerEvents: "none", display: "block" }} loading="lazy" />
      )}
    </div>
  );
}

/* ─── browser chrome ────────────────────────────────────────────── */

function BrowserChrome({ domain }: { domain: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center gap-1.5 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ height: 26, background: "rgba(14,14,14,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#FF5F57" }} />
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#FFBD2E" }} />
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#28CA41" }} />
      <div className="ml-1.5 flex-1 h-4 rounded flex items-center px-2" style={{ background: "rgba(255,255,255,0.05)" }}>
        <span className="text-[8px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>{domain}</span>
      </div>
    </div>
  );
}

/* ─── featured card ─────────────────────────────────────────────── */

type FP = (typeof featured)[0];

function FeaturedCard({ p, onRef }: { p: FP; onRef: (el: HTMLDivElement | null) => void }) {
  const domain = p.previewUrl ? new URL(p.previewUrl).hostname : "preview";
  return (
    <div
      ref={onRef}
      className={`${p.span} proj-card relative rounded-sm overflow-hidden cursor-pointer group`}
      style={{
        background: "var(--paper)",
        border: "1px solid var(--sketch-border)",
        boxShadow: "2px 3px 14px rgba(0,0,0,0.08)",
        transform: `rotate(${p.rotate})`,
      }}
    >
      {/* Tape strip at top of preview */}
      <div className="tape-strip absolute top-0 left-1/2 -translate-x-1/2 z-20 w-14" style={{ width: 56 }} />

      {/* Preview area — dark digital window in paper card */}
      <div className="relative overflow-hidden" style={{ height: "55%" }}>
        {p.mockup === "iframe" && p.previewUrl ? (
          <IframePreview url={p.previewUrl} />
        ) : p.mockup === "trading" ? (
          <TradingMockup />
        ) : p.mockup === "chat" ? (
          <ChatMockup />
        ) : (
          <WebsiteMockup />
        )}
        <BrowserChrome domain={domain} />

        {/* Hover: lift the dark veil over the preview */}
        <div className="absolute inset-0 z-10 transition-opacity duration-500" style={{ background: "rgba(0,0,0,0.38)" }} />
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(0,0,0,0)" }} />
      </div>

      {/* Paper content area */}
      <div className="p-4 relative z-10">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span
            className="sketch-tag"
            style={{ color: p.accent, borderColor: `${p.accent}45`, background: `${p.accent}10` }}
          >
            {p.type}
          </span>
          {p.link !== "#" && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: p.accent, color: "#fff" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>

        <h3
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)",
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {p.title}
        </h3>

        <p className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2.5" style={{ color: "var(--ink-mid)", maxWidth: 300, fontFamily: "var(--font-lato)" }}>
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="sketch-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Hand-drawn underline between preview and content */}
      <div className="absolute sketch-divider" style={{ left: 12, right: 12, top: "55%" }} />
    </div>
  );
}

/* ─── main export ───────────────────────────────────────────────── */

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const moreRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.children, {
        opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" } }
        );
      });
      moreRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0, y: 20, duration: 0.6, delay: i * 0.1, ease: "power3.out",
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
      style={{ paddingBlock: "clamp(5rem, 12vw, 9rem)", paddingLeft: "clamp(5rem, 10vw, 9rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      {/* Header */}
      <div ref={headRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-screen-xl mx-auto">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-caveat)", color: "var(--pencil)" }}>
            What I Build
          </p>
          <h2 className="sketch-ul leading-tight" style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(2.4rem, 5vw, 4.2rem)", color: "var(--ink)" }}>
            Projects that ship.
          </h2>
        </div>
        <a href="https://github.com/charles0w" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-caveat)", fontSize: "1.05rem", color: "var(--blue-ink)", textDecoration: "none" }}>
          View GitHub →
        </a>
      </div>

      {/* Bento grid */}
      <div className="max-w-screen-xl mx-auto grid gap-4 mb-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "300px", gridAutoFlow: "dense" }}
      >
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} p={p} onRef={(el) => { cardsRef.current[i] = el; }} />
        ))}
      </div>

      {/* More projects */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {more.map((p, i) => (
          <div
            key={p.title}
            ref={(el) => { moreRef.current[i] = el; }}
            className="proj-card rounded-sm p-5 flex flex-col gap-3"
            style={{ background: "var(--paper)", border: "1px solid var(--sketch-border)", boxShadow: "2px 3px 10px rgba(0,0,0,0.06)", transform: `rotate(${i % 2 === 0 ? "0.3deg" : "-0.3deg"})` }}
          >
            <div
              className="h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${p.accent} 0%, transparent 100%)` }}
            />
            <div className="flex items-center justify-between">
              <span className="sketch-tag" style={{ color: p.accent, borderColor: `${p.accent}45`, background: `${p.accent}10` }}>{p.type}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-caveat)", fontSize: "1.3rem", color: "var(--ink)", lineHeight: 1.2 }}>{p.title}</h3>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-lato)" }}>{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {p.tags.map((t) => <span key={t} className="sketch-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
