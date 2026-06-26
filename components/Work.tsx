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
    span: "md:col-span-2 md:row-span-1",
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
    span: "md:col-span-1 md:row-span-2",
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
    span: "md:col-span-1 md:row-span-1",
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
    span: "md:col-span-1 md:row-span-1",
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

/* ─── accent helpers — brighten the per-project hues so they pop on near-black ── */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lighten(hex: string, amt: number): string {
  const [r, g, b] = hexToRgb(hex);
  const L = (c: number) => Math.round(c + (255 - c) * amt);
  return `rgb(${L(r)}, ${L(g)}, ${L(b)})`;
}
function tint(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function lightenTint(hex: string, amt: number, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  const L = (c: number) => Math.round(c + (255 - c) * amt);
  return `rgba(${L(r)}, ${L(g)}, ${L(b)}, ${alpha})`;
}
/* tinted .chip override for a project type pill */
function typeChipStyle(accent: string) {
  return {
    color: lighten(accent, 0.36),
    borderColor: lightenTint(accent, 0.18, 0.4),
    background: tint(accent, 0.1),
  } as const;
}

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
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center gap-1.5 px-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ height: 26, background: "rgba(8,8,10,0.97)", borderBottom: "1px solid var(--line-2)" }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#FF5F57" }} />
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#FFBD2E" }} />
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#28CA41" }} />
      <div className="ml-1.5 flex-1 h-4 rounded flex items-center px-2" style={{ background: "var(--glass-2)" }}>
        <span className="text-[8px] truncate mono" style={{ color: "var(--txt-dim)" }}>{domain}</span>
      </div>
    </div>
  );
}

/* ─── featured card ─────────────────────────────────────────────── */

type FP = (typeof featured)[0];

function FeaturedCard({ p, index, onRef }: { p: FP; index: number; onRef: (el: HTMLDivElement | null) => void }) {
  const domain = p.previewUrl ? new URL(p.previewUrl).hostname : "preview";
  const isLive = p.link !== "#";
  return (
    <div
      ref={onRef}
      className={`${p.span} card edge-top relative overflow-hidden cursor-pointer group`}
    >
      {/* Preview area — dark digital window */}
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
        <div
          className="absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0"
          style={{ background: "linear-gradient(180deg, rgba(3,3,4,0.42), rgba(3,3,4,0.6))" }}
        />

        {/* mono index tick — command-center detail */}
        <span
          className="absolute top-1.5 left-2.5 z-20 label transition-opacity duration-300 group-hover:opacity-0"
          style={{ fontSize: 9, color: "var(--txt-mid)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* thin chrome divider between preview and content */}
      <div className="divider absolute z-20" style={{ left: 14, right: 14, top: "55%", width: "auto" }} />

      {/* Content area */}
      <div className="p-4 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="chip" style={typeChipStyle(p.accent)}>{p.type}</span>

          <span className="ml-auto flex items-center gap-1.5 label" style={{ fontSize: 8.5, letterSpacing: "0.18em" }}>
            <span
              className="w-1.5 h-1.5 rounded-full pulse-soft"
              style={{ background: isLive ? "var(--ok)" : lighten(p.accent, 0.32) }}
            />
            {isLive ? "LIVE" : "BUILD"}
          </span>

          {isLive && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.title}`}
              className="sheen opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--glass-2)", border: `1px solid ${lightenTint(p.accent, 0.2, 0.5)}`, color: lighten(p.accent, 0.36) }}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        <h3
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 600,
            fontSize: "clamp(1.1rem, 1.7vw, 1.45rem)",
            letterSpacing: "-0.01em",
            color: "var(--white)",
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          {p.title}
        </h3>

        <p
          className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3"
          style={{ color: "var(--txt-mid)", maxWidth: 320 }}
        >
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
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
      style={{
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        paddingLeft: "clamp(5rem, 10vw, 9rem)",
        paddingRight: "clamp(2rem, 6vw, 5rem)",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Header */}
      <div ref={headRef} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-screen-xl mx-auto">
        <div>
          <p className="label mb-3">What I Build</p>
          <h2
            className="leading-[1.04]"
            style={{
              fontFamily: "var(--sans)",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              letterSpacing: "-0.03em",
              color: "var(--white)",
            }}
          >
            Projects that ship.
          </h2>
          <div className="divider-glow mt-5" style={{ maxWidth: 168 }} />
        </div>
        <a
          href="https://github.com/charles0w"
          target="_blank"
          rel="noopener noreferrer"
          className="mono inline-flex items-center gap-2 transition-colors text-[13px] tracking-[0.04em] [color:var(--silver)] hover:[color:var(--white)]"
          style={{ textDecoration: "none" }}
        >
          View GitHub
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Bento grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        style={{ gridAutoRows: "300px", gridAutoFlow: "dense" }}
      >
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} p={p} index={i} onRef={(el) => { cardsRef.current[i] = el; }} />
        ))}
      </div>

      {/* More projects */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {more.map((p, i) => (
          <div
            key={p.title}
            ref={(el) => { moreRef.current[i] = el; }}
            className="card edge-top p-5 flex flex-col gap-3"
          >
            <div
              className="h-[2px] rounded-full"
              style={{ background: `linear-gradient(90deg, ${lighten(p.accent, 0.3)} 0%, transparent 92%)` }}
            />
            <div className="flex items-center justify-between">
              <span className="chip" style={typeChipStyle(p.accent)}>{p.type}</span>
            </div>
            <h3
              style={{
                fontFamily: "var(--sans)",
                fontWeight: 600,
                fontSize: "1.3rem",
                letterSpacing: "-0.01em",
                color: "var(--white)",
                lineHeight: 1.2,
              }}
            >
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--txt-mid)" }}>{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
