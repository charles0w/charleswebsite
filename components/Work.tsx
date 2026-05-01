"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── project data ──────────────────────────────────────────────── */

const featured = [
  {
    title: "Redline",
    type: "Website · Design",
    description:
      "Cinematic club website for UC Berkeley's automotive community — GSAP scroll animations, real photography, deployed on Vercel.",
    tags: ["Next.js", "GSAP", "Tailwind"],
    link: "https://redline-henna.vercel.app",
    previewUrl: "https://redline-henna.vercel.app",
    accent: "#FF1A1A",
    span: "col-span-2 row-span-1",
    mockup: "iframe" as const,
  },
  {
    title: "AI Trading Bot",
    type: "AI · Finance",
    description:
      "Options research pipeline using Claude Opus 4.7 as the analyst layer — deterministic signal processing with benchmark gate before live capital.",
    tags: ["Python", "Claude API", "Options"],
    link: "#",
    previewUrl: null,
    accent: "#1A8CFF",
    span: "col-span-1 row-span-2",
    mockup: "trading" as const,
  },
  {
    title: "CEO / Jarvis",
    type: "AI · Mobile",
    description:
      "Jarvis-style personal AI assistant that reads and writes to my second brain vault.",
    tags: ["Gemini 2.0", "FastAPI", "Expo"],
    link: "#",
    previewUrl: null,
    accent: "#A855F7",
    span: "col-span-1 row-span-1",
    mockup: "chat" as const,
  },
  {
    title: "Berkeley Biz Websites",
    type: "Startup · Automation",
    description:
      "Scrape no-website local businesses near Berkeley, auto-generate sites, cold-email to sell.",
    tags: ["Next.js", "Python", "Scraping"],
    link: "#",
    previewUrl: null,
    accent: "#10B981",
    span: "col-span-1 row-span-1",
    mockup: "website" as const,
  },
];

const more = [
  {
    title: "TCGAuto",
    type: "Chrome Extension",
    description: "Autofills TCGPlayer and ShipStation from an inventory CSV — eliminates manual copy-paste for card shop owners.",
    tags: ["JavaScript", "Chrome API"],
    link: "#",
    accent: "#F59E0B",
  },
  {
    title: "SAAS × Red Cross",
    type: "Research · AI",
    description: "Election-risk model combining GDELT data streams, SARGE, and word-embedding sentiment analysis.",
    tags: ["Python", "NLP", "GDELT"],
    link: "#",
    accent: "#EF4444",
  },
  {
    title: "Polymarket Copy Trader",
    type: "Finance · Web3",
    description: "Smart-wallet copy-trading on Polymarket gated by an independent LLM event-driven thesis with a two-signal intersection rule.",
    tags: ["Python", "Web3", "LLM"],
    link: "#",
    accent: "#06B6D4",
  },
];

/* ─── browser chrome ────────────────────────────────────────────── */

function BrowserChrome({ domain }: { domain: string }) {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 flex items-center gap-1.5 px-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
      style={{
        height: 28,
        background: "rgba(14,14,14,0.98)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#FF5F57" }} />
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#FFBD2E" }} />
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#28CA41" }} />
      <div
        className="ml-2 flex-1 h-[18px] rounded-md flex items-center px-2.5 overflow-hidden gap-1.5"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>🔒</span>
        <span className="text-[9px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
          {domain}
        </span>
      </div>
    </div>
  );
}

/* ─── css mockups ────────────────────────────────────────────────── */

function TradingMockup({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#040d1a" }}>
      <div
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(26,140,255,0.12)", height: 34 }}
      >
        <span className="text-[9px] font-mono font-bold" style={{ color: accent }}>CLAI / OPTIONS</span>
        <span className="text-[9px] font-mono" style={{ color: "#10B981" }}>▲ +2.4%</span>
        <span className="ml-auto text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>Live</span>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
      </div>
      <div className="px-3 pt-2">
        <svg viewBox="0 0 260 90" className="w-full" style={{ height: 90 }}>
          <defs>
            <linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points="0,85 0,72 18,68 36,74 54,58 72,52 90,60 108,44 126,36 144,48 162,32 180,24 198,34 216,18 234,12 260,8 260,85"
            fill="url(#tg1)"
          />
          <polyline
            points="0,72 18,68 36,74 54,58 72,52 90,60 108,44 126,36 144,48 162,32 180,24 198,34 216,18 234,12 260,8"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polyline
            points="0,80 18,78 36,80 54,72 72,68 90,73 108,64 126,58 144,65 162,55 180,50 198,57 216,44 234,40 260,38"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="flex gap-4 px-3 mt-1">
        {["IV: 28.4", "Δ 0.62", "θ −0.08", "γ 0.021"].map((m) => (
          <div key={m} className="flex flex-col gap-0.5">
            <span className="text-[8px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{m}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-3 mt-3">
        {[
          { label: "AAPL 190C", pnl: "+$840", col: "#10B981" },
          { label: "SPY 450P", pnl: "−$210", col: "#EF4444" },
          { label: "TSLA 250C", pnl: "+$1,200", col: "#10B981" },
        ].map((r) => (
          <div key={r.label} className="flex-1 rounded-lg p-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-[8px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{r.label}</div>
            <div className="text-[9px] font-bold font-mono mt-0.5" style={{ color: r.col }}>{r.pnl}</div>
          </div>
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2"
        style={{ background: "rgba(16,185,129,0.06)", borderTop: "1px solid rgba(16,185,129,0.1)" }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
        <span className="text-[8px] font-mono" style={{ color: "#10B981" }}>SIGNAL: BUY · Confidence 82%</span>
        <span className="ml-auto text-[8px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>Claude Opus 4.7</span>
      </div>
    </div>
  );
}

function ChatMockup({ accent }: { accent: string }) {
  const msgs = [
    { role: "user", text: "Show my schedule for today" },
    { role: "ai", text: "3 events: ECON 131 at 10am, office hours 2pm, Redline meet 6pm." },
    { role: "user", text: "Add reminder for the track day" },
    { role: "ai", text: "Done — June 14, 7am. Thunderhill. Helmet packed?" },
    { role: "user", text: "Check my Polymarket positions" },
    { role: "ai", text: "2 active: Election outcome (+$340), Tech merger (−$80)." },
  ];
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "#08080f" }}>
      <div
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(168,85,247,0.12)", height: 34 }}
      >
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
          style={{ background: `${accent}25`, color: accent }}
        >
          J
        </div>
        <span className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Jarvis</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
          <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.3)" }}>online</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 p-2.5 flex-1 overflow-hidden">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="rounded-xl px-2.5 py-1.5"
              style={{
                background: m.role === "user" ? `${accent}22` : "rgba(255,255,255,0.05)",
                fontSize: 8,
                color: m.role === "user" ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
                lineHeight: 1.45,
                maxWidth: "78%",
                border: m.role === "ai" ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div
          className="rounded-lg h-6 flex items-center px-2.5 text-[8px]"
          style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)" }}
        >
          Ask Jarvis anything...
        </div>
      </div>
    </div>
  );
}

function WebsiteMockup({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#050e0a" }}>
      <div
        className="flex items-center px-3 gap-3 flex-shrink-0"
        style={{ height: 28, background: "rgba(0,0,0,0.4)", borderBottom: `1px solid ${accent}18` }}
      >
        <div className="w-12 h-2 rounded-full" style={{ background: `${accent}60` }} />
        <div className="ml-auto flex items-center gap-2">
          {["Home", "Services", "Contact"].map((l) => (
            <span key={l} className="text-[8px]" style={{ color: "rgba(255,255,255,0.3)" }}>{l}</span>
          ))}
          <div className="w-12 h-4 rounded-full ml-1" style={{ background: accent }} />
        </div>
      </div>
      <div className="px-5 pt-4">
        <div className="w-1/2 h-1.5 rounded-full mb-1.5" style={{ background: `${accent}40` }} />
        <div className="w-5/6 h-5 rounded-lg mb-2" style={{ background: `${accent}18` }} />
        <div className="w-full h-1.5 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="w-4/5 h-1.5 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.04)" }} />
        <div className="flex gap-2">
          <div className="h-5 px-3 rounded-full flex items-center justify-center text-[8px] font-semibold" style={{ background: accent, color: "#fff", minWidth: 60 }}>Get Started</div>
          <div className="h-5 px-3 rounded-full" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", minWidth: 50 }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-5 mt-5">
        {["Website Design", "Local SEO", "Fast Deploy"].map((s) => (
          <div key={s} className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-4 h-4 rounded-md mb-1.5" style={{ background: `${accent}25` }} />
            <div className="text-[7px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── iframe preview (live site scaled down) ─────────────────────── */

function IframePreview({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {scale > 0 && (
        <iframe
          src={url}
          title="site preview"
          style={{
            width: 1440,
            height: 1080,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: "none",
            pointerEvents: "none",
            display: "block",
          }}
          loading="lazy"
        />
      )}
    </div>
  );
}

/* ─── full featured card ─────────────────────────────────────────── */

type FP = (typeof featured)[0];

function FeaturedCard({ p, onRef }: { p: FP; onRef: (el: HTMLDivElement | null) => void }) {
  const domain = p.previewUrl ? new URL(p.previewUrl).hostname : "preview";

  return (
    <div
      ref={onRef}
      className={`${p.span} relative rounded-2xl overflow-hidden cursor-pointer group`}
      style={{ background: "#0a0a0a", border: "1px solid var(--border)" }}
    >
      {/* ── preview layer (full card bg) ── */}
      {p.mockup === "iframe" && p.previewUrl ? (
        <IframePreview url={p.previewUrl} />
      ) : p.mockup === "trading" ? (
        <TradingMockup accent={p.accent} />
      ) : p.mockup === "chat" ? (
        <ChatMockup accent={p.accent} />
      ) : (
        <WebsiteMockup accent={p.accent} />
      )}

      {/* Darkening veil — lifted on hover */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          background: "rgba(6,6,6,0.55)",
          opacity: 1,
        }}
      />
      <div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "rgba(6,6,6,0)",
        }}
      />

      {/* Bottom gradient for text legibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(6,6,6,0.65) 58%, rgba(6,6,6,0.97) 100%)",
        }}
      />

      {/* Browser chrome — hover reveal */}
      <BrowserChrome domain={domain} />

      {/* External link — hover reveal */}
      {p.link !== "#" && (
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-40 opacity-0 group-hover:opacity-100 transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110"
          style={{ background: p.accent, color: "#fff", marginTop: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight size={14} />
        </a>
      )}

      {/* Content — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        <span
          className="tag-pill mb-2 inline-block"
          style={{ background: `${p.accent}20`, color: p.accent, borderColor: `${p.accent}35` }}
        >
          {p.type}
        </span>
        <h3
          className="font-black text-white tracking-tight leading-tight mb-1.5"
          style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.55rem)" }}
        >
          {p.title}
        </h3>
        <p
          className="text-xs leading-relaxed mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "rgba(255,255,255,0.55)", maxWidth: "320px" }}
        >
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── main export ────────────────────────────────────────────────── */

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const moreRef = useRef<(HTMLDivElement | null)[]>([]);

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
        if (!card) return;
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
        if (!card) return;
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
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "var(--accent)" }}>
              What I Build
            </p>
            <h2 className="font-black leading-[1.05] tracking-[-0.025em]" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
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
            gridAutoRows: "300px",
            gridAutoFlow: "dense",
          }}
        >
          {featured.map((p, i) => (
            <FeaturedCard
              key={p.title}
              p={p}
              onRef={(el) => { cardsRef.current[i] = el; }}
            />
          ))}
        </div>

        {/* More projects — 3-col row with accent-top preview band */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {more.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { moreRef.current[i] = el; }}
              className="proj-card rounded-2xl overflow-hidden flex flex-col group cursor-default"
              style={{ background: "var(--bg3)", border: "1px solid var(--border)" }}
            >
              {/* Accent band preview */}
              <div
                className="h-1.5 w-full flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${p.accent} 0%, transparent 100%)` }}
              />
              <div className="p-5 flex flex-col gap-3 flex-1">
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
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
