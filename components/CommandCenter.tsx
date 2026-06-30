"use client";

import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/* ════════════════════════════════════════════════════════════════
   CHARLES OW — "COMMAND CENTER"
   Faithful React port of the design handoff (Charles Ow.dc.html).
   A single-page, chrome-on-black CEO-OS console: top command bar,
   hover-expanding nav rail, one continuous scroller of sections,
   FLIP-morph project case studies, ⌘K palette, lightbox.
   All visual values are lifted directly from the prototype.
   ════════════════════════════════════════════════════════════════ */

const MONO = "var(--mono)";
const SANS = "var(--sans)";

/* ── chrome gradient text presets (stops vary per heading) ── */
const GRAD = {
  h1: "linear-gradient(100deg,#f4f5f8,#b9bdc7 20%,#7e818a 40%,#eef0f4 56%,#9fa3ad 72%,#f4f5f8)",
  h2: "linear-gradient(100deg,#f4f5f8,#b9bdc7 22%,#84878f 42%,#eef0f4 58%,#9fa3ad 74%,#f4f5f8)",
  word: "linear-gradient(100deg,#f4f5f8,#b9bdc7 22%,#84878f 42%,#eef0f4 58%,#9fa3ad 74%,#f4f5f8)",
  intro: "linear-gradient(100deg,#f4f5f8,#b9bdc7 25%,#84878f 45%,#eef0f4 62%,#f4f5f8)",
  detail: "linear-gradient(100deg,#f4f5f8,#b9bdc7 25%,#84878f 45%,#eef0f4 62%,#f4f5f8)",
};

function chrome(gradient: string, dur: number): CSSProperties {
  return {
    backgroundImage: gradient,
    backgroundSize: "220% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    animation: `chromeSheen ${dur}s linear infinite`,
  };
}

const STRIPE = (n: number) =>
  `repeating-linear-gradient(45deg,#15171c,#15171c ${n}px,#191c22 ${n}px,#191c22 ${n * 2}px)`;

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

const ACCENT = "#9aa6c4";

type Status = "live" | "dev" | "research";
type Metric = { value: string; label: string };
type Project = {
  id: string;
  name: string;
  kind: string;
  tag: string;
  status: Status;
  shot: string;
  blurb: string;
  stack: string;
  stackList: string[];
  metrics: Metric[];
};

const PROJECTS: Project[] = [
  {
    id: "ceo-os", name: "CEO OS", kind: "FLAGSHIP", tag: "Fleet-control dashboard for autonomous agents", status: "live", shot: "[ dashboard.png ]",
    blurb: "A fleet-control command center where autonomous AI agents self-report run status and get graded by an independent eval layer. The console I actually run the operation from.",
    stack: "Next.js · Vercel Postgres/KV", stackList: ["Next.js", "Vercel Postgres", "Vercel KV", "Eval layer"],
    metrics: [{ value: "12", label: "LIVE MODULES" }, { value: "24/7", label: "SELF-REPORTING" }, { value: "eval", label: "GRADED RUNS" }],
  },
  {
    id: "jarvis", name: "CEO — Jarvis", kind: "FLAGSHIP", tag: "Personal AI chief-of-staff", status: "live", shot: "[ jarvis.png ]",
    blurb: "A personal AI chief-of-staff that reads and writes my Obsidian \"second brain,\" manages GitHub, and runs Claude Code — behind a Git safety layer so the model proposes and I commit.",
    stack: "FastAPI · React Native · Claude API", stackList: ["FastAPI", "React Native", "Claude API", "Git safety layer"],
    metrics: [{ value: "2nd", label: "BRAIN R/W" }, { value: "git", label: "SAFETY LAYER" }, { value: "mobile", label: "ON THE GO" }],
  },
  {
    id: "trading", name: "AI Trading Bot", kind: "AI / ML", tag: "LLM-as-analyst options research", status: "dev", shot: "[ signals.png ]",
    blurb: "An options-research pipeline using an LLM as the analyst layer over deterministic signals — gated by a benchmark before any live capital is ever deployed.",
    stack: "Python · LLM analyst layer", stackList: ["Python", "LLM analyst", "Deterministic signals", "Benchmark gate"],
    metrics: [{ value: "gate", label: "BENCH BEFORE LIVE" }, { value: "LLM", label: "ANALYST ONLY" }, { value: "opts", label: "RESEARCH" }],
  },
  {
    id: "redcross", name: "SAAS × Red Cross", kind: "AI / ML", tag: "Election-risk ML model", status: "research", shot: "[ model.png ]",
    blurb: "An election-risk machine-learning model combining GDELT data streams, SARGE, and word-embedding sentiment to forecast instability signals.",
    stack: "GDELT · SARGE · embeddings", stackList: ["GDELT", "SARGE", "Word embeddings", "Sentiment"],
    metrics: [{ value: "GDELT", label: "DATA STREAMS" }, { value: "NLP", label: "EMBEDDINGS" }, { value: "risk", label: "FORECAST" }],
  },
  {
    id: "evals", name: "Evals Toolkit", kind: "AI / ML", tag: "Reusable LLM-evaluation kit", status: "live", shot: "[ evals.png ]",
    blurb: "A reusable LLM-evaluation kit with a provider-aware judge and reliability scoring — distilled from my AI-evals research into something I drop into every project.",
    stack: "Provider-aware judge", stackList: ["Provider-aware judge", "Reliability scoring", "Reusable kit"],
    metrics: [{ value: "multi", label: "PROVIDERS" }, { value: "score", label: "RELIABILITY" }, { value: "reuse", label: "DROP-IN" }],
  },
  {
    id: "polymarket", name: "Polymarket Copy Trader", kind: "AI / ML", tag: "Smart-wallet copy w/ thesis gate", status: "dev", shot: "[ copytrade.png ]",
    blurb: "Smart-wallet copy-trading gated by an independent LLM event thesis — a two-signal intersection rule means a trade only fires when the wallet and the thesis agree.",
    stack: "Two-signal intersection", stackList: ["Smart-wallet tracking", "LLM event thesis", "Intersection rule"],
    metrics: [{ value: "2-sig", label: "INTERSECTION" }, { value: "thesis", label: "LLM GATE" }, { value: "auto", label: "COPY" }],
  },
  {
    id: "bizsites", name: "Berkeley Biz Websites", kind: "REVENUE", tag: "Auto-generate + cold-sell sites", status: "live", shot: "[ outreach.png ]",
    blurb: "Finds local businesses with no website, auto-generates a site for each, and cold-emails to sell it. Dozens of demo sites generated end-to-end.",
    stack: "Find · generate · email", stackList: ["Lead finder", "Site generator", "Cold-email engine"],
    metrics: [{ value: "dozens", label: "SITES GEN'D" }, { value: "auto", label: "OUTREACH" }, { value: "$", label: "REVENUE" }],
  },
  {
    id: "shopify", name: "Shopify Arbitrage", kind: "REVENUE", tag: "AI-run dropshipping store", status: "live", shot: "[ store.png ]",
    blurb: "An AI-run dropshipping store: Claude writes the listings and fulfillment runs end-to-end, so the storefront operates with minimal human touch.",
    stack: "Claude listings · auto-fulfill", stackList: ["Claude listings", "Auto-fulfillment", "Shopify"],
    metrics: [{ value: "AI", label: "LISTINGS" }, { value: "e2e", label: "FULFILLMENT" }, { value: "auto", label: "OPERATIONS" }],
  },
  {
    id: "tcg", name: "TCGAuto + Card Arb", kind: "REVENUE", tag: "Marketplace tooling + arbitrage", status: "live", shot: "[ extension.png ]",
    blurb: "A Chrome extension that auto-fills TCGPlayer / ShipStation from a CSV, plus a tool that finds undervalued Pokémon and One Piece cards across marketplaces.",
    stack: "Chrome extension · CSV", stackList: ["Chrome extension", "CSV automation", "Arbitrage finder"],
    metrics: [{ value: "CSV", label: "AUTO-FILL" }, { value: "multi", label: "MARKETPLACES" }, { value: "edge", label: "UNDERVALUED" }],
  },
];

type NavItem = { id: string; label: string; num: string; cmd: string };
const NAV: NavItem[] = [
  { id: "overview", label: "Overview", num: "00", cmd: "home" },
  { id: "work", label: "Work", num: "01", cmd: "portfolio.show()" },
  { id: "about", label: "About", num: "02", cmd: "whoami" },
  { id: "life", label: "Life", num: "03", cmd: "photos" },
  { id: "art", label: "Art", num: "04", cmd: "gearhead" },
  { id: "contact", label: "Contact", num: "05", cmd: "connect" },
];

const TIMELINE = [
  { year: "2025–", org: "ICONIQ Capital", role: "Production AI/ML — growth-ops pipelines & LLM tooling" },
  { year: "2024", org: "Autodesk", role: "AI/ML engineering internship" },
  { year: "2024", org: "Intertie", role: "Applied ML internship" },
  { year: "2023", org: "Athena AI", role: "Early AI engineering internship" },
];

type Photo = { caption: string; tag: string; col: string; row: string };
const PHOTOS: Photo[] = [
  { caption: "Tahoe", tag: "01", col: "1 / 3", row: "1 / 3" },
  { caption: "Pit lane", tag: "02", col: "3 / 4", row: "1 / 2" },
  { caption: "Berkeley", tag: "03", col: "4 / 5", row: "1 / 2" },
  { caption: "Late build", tag: "04", col: "3 / 5", row: "2 / 3" },
  { caption: "On the road", tag: "05", col: "1 / 2", row: "3 / 4" },
  { caption: "The crew", tag: "06", col: "2 / 4", row: "3 / 4" },
  { caption: "Golden hour", tag: "07", col: "4 / 5", row: "3 / 4" },
  { caption: "City nights", tag: "08", col: "1 / 5", row: "4 / 5" },
];

const HOBBIES = [
  { name: "Gaming", kind: "RANKED GRINDER", tag: "FPS, strategy, and the occasional 2am ranked climb." },
  { name: "The Gym", kind: "GYM RAT", tag: "Chasing PRs — push, pull, repeat. Discipline as a default." },
  { name: "Motorcycles", kind: "TWO WHEELS", tag: "Canyon runs, garage tinkering, and the open road." },
];

const SOCIALS = [
  { label: "GitHub", handle: "@charles0w", num: "01", href: "https://github.com/charles0w" },
  { label: "LinkedIn", handle: "charles-ow", num: "02", href: "https://www.linkedin.com/in/charles-ow" },
  { label: "Instagram", handle: "@charles0uch", num: "03", href: "https://www.instagram.com/charles0uch/" },
  { label: "Email", handle: "charles_ow@berkeley.edu", num: "04", href: "mailto:charles_ow@berkeley.edu" },
];

const OBSESSIONS = ["GYM", "CONTENT CREATION", "GAMING", "CARS", "MOTORCYCLES", "ART / DESIGN"];
const GREEN = "oklch(0.74 0.13 150)";

/* ── shared section heading (eyebrow + chrome h2) ── */
function Heading({ eyebrow, title, dur = 7 }: { eyebrow: string; title: string; dur?: number }) {
  return (
    <>
      <div style={{ fontFamily: MONO, fontSize: 12, color: "#5b6068", letterSpacing: 3 }}>{eyebrow}</div>
      <h2 style={{ margin: "6px 0 0", fontSize: "clamp(34px,5vw,56px)", fontWeight: 700, letterSpacing: -1, ...chrome(GRAD.h2, dur) }}>{title}</h2>
    </>
  );
}

const statusColor = (s: Status) =>
  s === "live" ? "oklch(0.74 0.13 150)" : s === "dev" ? "oklch(0.8 0.12 80)" : "oklch(0.7 0.07 250)";
const statusLabel = (s: Status) => (s === "live" ? "LIVE" : s === "dev" ? "IN DEV" : "RESEARCH");

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */

export default function CommandCenter() {
  const [activeSection, setActiveSection] = useState("intro");
  const [railHover, setRailHover] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [subOpacity, setSubOpacity] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const introNameRef = useRef<HTMLDivElement>(null);
  const introArrowRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fromRect = useRef<DOMRect | null>(null);

  // mirrors of state read inside the (stable) scroll handler / listeners
  const activeRef = useRef(activeSection);
  const typingDoneRef = useRef(typingDone);
  const openIdRef = useRef(openId);
  useEffect(() => { activeRef.current = activeSection; }, [activeSection]);
  useEffect(() => { typingDoneRef.current = typingDone; }, [typingDone]);
  useEffect(() => { openIdRef.current = openId; }, [openId]);

  /* ── scroll-to-section (native smooth scroll on the single scroller) ── */
  const scrollTo = useCallback((id: string) => {
    const root = rootRef.current;
    setPaletteOpen(false);
    if (!root) return;
    const el = root.querySelector<HTMLElement>(`[data-sec="${id}"]`);
    if (!el) return;
    root.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }, []);

  /* ── section reveal + active tracking + progress + intro fades ── */
  const updateScroll = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const vh = root.clientHeight;
    const st = root.scrollTop;

    const max = root.scrollHeight - root.clientHeight;
    const p = max > 0 ? st / max : 0;
    if (progressRef.current) progressRef.current.style.transform = `scaleY(${p})`;

    const sections = root.querySelectorAll<HTMLElement>("[data-sec]");
    let best: string | null = null;
    let bestDist = Infinity;
    sections.forEach((el) => {
      const top = el.offsetTop - st;
      const bottom = top + el.offsetHeight;
      if (top < vh * 0.85 && bottom > 0) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
      const dist = Math.abs(top + el.offsetHeight / 2 - vh / 2);
      if (dist < bestDist) {
        bestDist = dist;
        best = el.getAttribute("data-sec");
      }
    });
    if (best && best !== activeRef.current) setActiveSection(best);

    if (introNameRef.current)
      introNameRef.current.style.opacity = String(Math.max(0, Math.min(1, 1 - st / (vh * 0.55))));
    if (introArrowRef.current)
      introArrowRef.current.style.opacity = String(
        typingDoneRef.current ? Math.max(0, Math.min(1, 1 - st / (vh * 0.4))) : 0,
      );
  }, []);

  /* ── set up sections (initial hidden state) ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>("[data-sec]");
    sections.forEach((el) => {
      el.style.transition = "opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)";
      if (el.getAttribute("data-sec") === "intro") {
        el.style.opacity = "1";
        el.style.transform = "none";
      } else {
        el.style.opacity = "0";
        el.style.transform = "translateY(42px)";
      }
    });
    updateScroll();
  }, [updateScroll]);

  /* ── typewriter intro ── */
  useEffect(() => {
    const full = "CHARLES OW";
    const start = setTimeout(() => {
      let i = 0;
      const typer = setInterval(() => {
        i++;
        setTyped(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(typer);
          setTimeout(() => {
            setSubOpacity(1);
            setTypingDone(true);
            if (introArrowRef.current) introArrowRef.current.style.opacity = "1";
          }, 260);
        }
      }, 110);
    }, 700);
    return () => clearTimeout(start);
  }, []);

  /* ── FLIP: close ── */
  const closeProject = useCallback(() => {
    const id = openIdRef.current;
    const n = detailRef.current;
    const card = id ? cardRefs.current[id] : null;
    if (n && card) {
      const to = n.getBoundingClientRect();
      const f = card.getBoundingClientRect();
      const dx = f.left - to.left;
      const dy = f.top - to.top;
      const sx = f.width / to.width;
      const sy = f.height / to.height;
      n.style.transformOrigin = "top left";
      n.style.transition = "transform .42s cubic-bezier(.4,0,.2,1), opacity .35s ease";
      n.style.transform = `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
      n.style.opacity = "0";
      setTimeout(() => setOpenId(null), 410);
    } else {
      setOpenId(null);
    }
  }, []);

  /* ── keyboard: ⌘K palette, Escape closes everything ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
        setLightbox(null);
        if (openIdRef.current) closeProject();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject]);

  /* ── FLIP: open ── */
  const openProject = (p: Project, e: React.MouseEvent) => {
    fromRect.current = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOpenId(p.id);
  };

  useLayoutEffect(() => {
    if (!openId || !fromRect.current) return;
    const n = detailRef.current;
    if (!n) return;
    const to = n.getBoundingClientRect();
    const f = fromRect.current;
    const dx = f.left - to.left;
    const dy = f.top - to.top;
    const sx = f.width / to.width;
    const sy = f.height / to.height;
    n.style.transformOrigin = "top left";
    n.style.transition = "none";
    n.style.transform = `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
    n.style.opacity = "0.5";
    n.getBoundingClientRect();
    requestAnimationFrame(() => {
      n.style.transition = "transform .5s cubic-bezier(.2,.85,.25,1), opacity .35s ease";
      n.style.transform = "none";
      n.style.opacity = "1";
    });
  }, [openId]);

  const onIntro = activeSection === "intro";
  const chromeOpacity = onIntro ? 0 : 1;
  const chromePointer: CSSProperties["pointerEvents"] = onIntro ? "none" : "auto";
  const railWidth = onIntro ? "0px" : railHover ? "210px" : "64px";
  const railLabelOpacity = railHover ? 1 : 0;

  const openProj = PROJECTS.find((p) => p.id === openId) || null;

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        background: "transparent",
        color: "#cfd2d8",
        fontFamily: SANS,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* ===== TOP COMMAND BAR ===== */}
      <div
        style={{
          position: "relative", zIndex: 3, display: "flex", alignItems: "center", gap: 14,
          padding: "12px 20px", borderBottom: "1px solid #1a1c22", background: "rgba(10,10,12,.7)",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", flexShrink: 0,
          opacity: chromeOpacity, pointerEvents: chromePointer, transition: "opacity .55s ease",
        }}
      >
        <div onClick={() => scrollTo("overview")} style={{ fontWeight: 700, fontSize: 15, letterSpacing: 1, cursor: "pointer", ...chrome(GRAD.word, 8) }}>C.OW</div>
        <div style={{ width: 1, height: 18, background: "#23262e" }} />
        <button
          onClick={() => setPaletteOpen(true)}
          style={{
            flex: 1, maxWidth: 440, display: "flex", alignItems: "center", gap: 10, background: "#101217",
            border: "1px solid #23262e", borderRadius: 8, padding: "7px 12px", color: "#5b6068",
            fontFamily: MONO, fontSize: 12, cursor: "pointer", textAlign: "left",
          }}
        >
          <span style={{ color: "#4a4f59" }}>$</span>
          <span>run command — try </span>
          <span style={{ color: "#8a9099" }}>portfolio.show()</span>
          <span style={{ marginLeft: "auto", border: "1px solid #2a2e36", borderRadius: 5, padding: "1px 6px", fontSize: 10, color: "#6b7280" }}>⌘K</span>
        </button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 11, color: "#6b7280" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, animation: "pulseDot 2.4s ease-in-out infinite", boxShadow: `0 0 8px ${GREEN}` }} />
          <span>SYSTEMS ONLINE</span>
          <span style={{ color: "#3a3f4a" }}>·</span>
          <span style={{ color: "#4a4f59" }}>v2.0</span>
        </div>
      </div>

      {/* ===== BODY: rail + scroll ===== */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flex: 1, minHeight: 0 }}>
        {/* LEFT RAIL */}
        <div
          onMouseEnter={() => setRailHover(true)}
          onMouseLeave={() => setRailHover(false)}
          style={{
            width: railWidth, flexShrink: 0, borderRight: "1px solid #1a1c22", padding: "22px 13px",
            display: "flex", flexDirection: "column", gap: 4, background: "rgba(11,12,15,.55)",
            transition: "width .32s cubic-bezier(.4,0,.2,1), opacity .55s ease", overflow: "hidden",
            zIndex: 4, opacity: chromeOpacity, pointerEvents: chromePointer,
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 10, color: "#454a52", letterSpacing: 2, padding: "0 10px 10px", whiteSpace: "nowrap", opacity: railLabelOpacity, transition: "opacity .2s" }}>NAVIGATION</div>
          {NAV.map((item) => {
            const isActive = item.id === activeSection;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                title={item.label}
                style={{
                  display: "flex", alignItems: "center", gap: 11, width: "100%",
                  background: isActive ? "#15171d" : "transparent", border: "none", borderRadius: 8,
                  padding: "10px 11px", cursor: "pointer", textAlign: "left", transition: "background .2s", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#15171d"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ width: 3, height: 16, borderRadius: 2, background: isActive ? ACCENT : "transparent", flexShrink: 0, transition: "background .25s" }} />
                <span style={{ fontFamily: MONO, fontSize: 10, color: "#5b6068", flexShrink: 0 }}>{item.num}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: isActive ? "#f0f1f5" : "#7a8089", letterSpacing: 0.3, opacity: railLabelOpacity, transition: "opacity .2s, color .2s" }}>{item.label}</span>
              </button>
            );
          })}
          <div style={{ marginTop: "auto", padding: "14px 10px 0", borderTop: "1px solid #16181d", fontFamily: MONO, fontSize: 10, lineHeight: 1.9, color: "#454a52", whiteSpace: "nowrap", opacity: railLabelOpacity, transition: "opacity .2s" }}>
            <div>UC BERKELEY · DS+CS</div>
            <div>GPA 3.85 · &apos;27</div>
            <div style={{ color: GREEN, marginTop: 6 }}>● 12 modules running</div>
          </div>
        </div>

        {/* SCROLL AREA */}
        <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
          <div ref={rootRef} data-scroll-root onScroll={updateScroll} style={{ position: "absolute", inset: 0, overflowY: "auto", scrollBehavior: "smooth" }}>

            {/* INTRO / LANDING */}
            <section data-sec="intro" style={{ minHeight: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "55%", background: "linear-gradient(90deg,transparent,rgba(190,198,214,.10) 45%,rgba(235,238,245,.22) 50%,rgba(190,198,214,.10) 55%,transparent)", animation: "introSweep 3.6s cubic-bezier(.5,0,.5,1) infinite" }} />
              </div>
              <div ref={introNameRef} style={{ position: "relative", textAlign: "center" }}>
                <div style={{ fontFamily: MONO, fontSize: "clamp(30px,7vw,78px)", fontWeight: 500, letterSpacing: 8, minHeight: "1.1em" }}>
                  <span style={chrome(GRAD.intro, 4)}>{typed}</span>
                  {!typingDone && <span style={{ display: "inline-block", width: ".5ch", color: "#cfd2d8", animation: "caretBlink 1s step-end infinite" }}>▌</span>}
                </div>
                <div style={{ marginTop: 26, fontFamily: MONO, fontSize: "clamp(10px,1.1vw,13px)", letterSpacing: 5, color: "#5b6068", opacity: subOpacity, transition: "opacity .7s ease" }}>BERKELEY · BUILDER · GYM RAT · GAMER NERD</div>
              </div>
              <div ref={introArrowRef} onClick={() => scrollTo("overview")} style={{ position: "absolute", bottom: "6vh", left: "50%", transform: "translateX(-50%)", opacity: 0, transition: "opacity .6s ease", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 4, color: "#6b7280" }}>SCROLL TO ENTER</span>
                <span style={{ display: "block", animation: "arrowBob 1.8s ease-in-out infinite" }}>
                  <span style={{ display: "block", width: 14, height: 14, borderRight: "2px solid #9aa0aa", borderBottom: "2px solid #9aa0aa", transform: "rotate(45deg)", animation: "arrowPulse 1.8s ease-in-out infinite" }} />
                </span>
              </div>
            </section>

            {/* OVERVIEW */}
            <section data-sec="overview" style={{ minHeight: "100%", padding: "6vh 6vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#5b6068", letterSpacing: 3, marginBottom: 18 }}>CHARLES OW — COMMAND CENTER</div>
              <h1 style={{ margin: 0, fontSize: "clamp(48px,8vw,116px)", lineHeight: 0.92, fontWeight: 700, letterSpacing: -2, ...chrome(GRAD.h1, 7) }}>CHARLES OW</h1>
              <p style={{ margin: "26px 0 0", maxWidth: 620, fontSize: "clamp(16px,1.5vw,20px)", lineHeight: 1.6, color: "#9aa0aa", fontWeight: 300 }}>
                I build AI that actually <span style={{ color: "#e6e8ee" }}>ships</span>. By day I engineer growth-ops pipelines and LLM tooling at <span style={{ color: "#e6e8ee" }}>ICONIQ Capital</span>; by night I run a fleet of autonomous AI products spanning commerce, trading research, and tooling.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
                {["Revenue", "Research", "Results"].map((t) => (
                  <span key={t} style={{ fontFamily: MONO, fontSize: 12, color: "#9aa0aa", border: "1px solid #23262e", borderRadius: 20, padding: "7px 15px" }}>{t}</span>
                ))}
              </div>
              <button
                onClick={() => scrollTo("work")}
                style={{ marginTop: 42, alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 12, background: "#101217", border: "1px solid #2a2e36", borderRadius: 10, padding: "14px 22px", cursor: "pointer", color: "#e6e8ee", fontFamily: SANS, fontSize: 15, fontWeight: 500, transition: "all .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4a505c"; e.currentTarget.style.background = "#15171d"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2e36"; e.currentTarget.style.background = "#101217"; }}
              >
                Enter the fleet
                <span style={{ fontFamily: MONO, color: "#6b7280" }}>↓</span>
              </button>
              <div style={{ marginTop: "8vh", display: "flex", alignItems: "center", gap: 10, fontFamily: MONO, fontSize: 11, color: "#454a52", letterSpacing: 2 }}>
                <span style={{ width: 22, height: 1, background: "#2a2e36" }} />SCROLL TO EXPLORE
              </div>
            </section>

            {/* WORK */}
            <section data-sec="work" style={{ minHeight: "100%", padding: "8vh 5vw" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 12, color: "#5b6068", letterSpacing: 3 }}>01 / WORK</div>
                  <h2 style={{ margin: "6px 0 0", fontSize: "clamp(34px,5vw,56px)", fontWeight: 700, letterSpacing: -1, ...chrome(GRAD.h2, 7) }}>THE FLEET</h2>
                </div>
                <div style={{ fontFamily: MONO, fontSize: 12, color: "#6b7280", textAlign: "right", lineHeight: 1.7 }}>
                  <div>autonomous + assisted AI products</div>
                  <div style={{ color: "#454a52" }}>click a module to expand its case study ↘</div>
                </div>
              </div>
              <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.id}
                    data-card={p.id}
                    ref={(n) => { cardRefs.current[p.id] = n; }}
                    onClick={(e) => openProject(p, e)}
                    style={{ position: "relative", background: "#0f1116", border: "1px solid #1f222a", borderRadius: 14, cursor: "pointer", overflow: "hidden", transition: "border-color .25s, transform .25s, box-shadow .25s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3a4150"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,0,0,.5)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1f222a"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ height: 118, position: "relative", background: STRIPE(7), borderBottom: "1px solid #1f222a", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,transparent 30%,rgba(180,188,205,.07) 50%,transparent 70%)" }} />
                      <span style={{ position: "absolute", left: 12, bottom: 10, fontFamily: MONO, fontSize: 9, color: "#4a4f59", letterSpacing: 1 }}>{p.shot}</span>
                      <span style={{ position: "absolute", right: 11, top: 11, fontFamily: MONO, fontSize: 9, color: "#6b7280" }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div style={{ padding: "15px 16px 17px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor(p.status), boxShadow: `0 0 7px ${statusColor(p.status)}` }} />
                        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.5, color: statusColor(p.status) }}>{statusLabel(p.status)}</span>
                        <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 9.5, color: "#454a52" }}>{p.kind}</span>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#eceef3", letterSpacing: -0.2 }}>{p.name}</div>
                      <div style={{ marginTop: 5, fontSize: 13, lineHeight: 1.5, color: "#7a8089" }}>{p.tag}</div>
                      <div style={{ marginTop: 12, fontFamily: MONO, fontSize: 10, color: "#5b6068", letterSpacing: 0.5 }}>{p.stack}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ABOUT */}
            <section data-sec="about" style={{ minHeight: "100%", padding: "8vh 5vw" }}>
              <Heading eyebrow="02 / ABOUT" title="THE OPERATOR" />
              <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "minmax(0,300px) minmax(0,1fr)", gap: 42, alignItems: "start" }}>
                <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: 16, background: STRIPE(9), border: "1px solid #1f222a", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,transparent 30%,rgba(180,188,205,.08) 50%,transparent 70%)" }} />
                  <span style={{ position: "absolute", left: 16, bottom: 14, fontFamily: MONO, fontSize: 10, color: "#5b6068", letterSpacing: 1 }}>[ portrait ]</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "clamp(17px,1.8vw,23px)", lineHeight: 1.6, color: "#b6bcc6", fontWeight: 300 }}>
                    I&apos;m a UC Berkeley <span style={{ color: "#e6e8ee" }}>Data Science + CS</span> student building AI that ships. By day I engineer growth-ops pipelines and LLM tooling at ICONIQ Capital; by night I run <span style={{ color: "#e6e8ee" }}>CEO OS</span> — a fleet of autonomous AI products across commerce, trading research, and tooling.
                  </p>
                  <div style={{ marginTop: 28, borderLeft: "2px solid oklch(0.7 0.07 250)", padding: "6px 0 6px 22px" }}>
                    <div style={{ fontSize: "clamp(20px,2.4vw,30px)", lineHeight: 1.35, fontWeight: 500, color: "#eceef3", letterSpacing: -0.3 }}>&quot;The LLM is the analyst,<br />not the executor.&quot;</div>
                    <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 11, color: "#5b6068", letterSpacing: 1 }}>— engineering philosophy</div>
                  </div>
                  <div style={{ marginTop: 34, fontFamily: MONO, fontSize: 11, color: "#5b6068", letterSpacing: 2 }}>TRAJECTORY</div>
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 0 }}>
                    {TIMELINE.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 18, padding: "14px 0", borderBottom: "1px solid #16181d" }}>
                        <div style={{ fontFamily: MONO, fontSize: 12, color: "#6b7280", width: 74, flexShrink: 0, paddingTop: 2 }}>{t.year}</div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 600, color: "#eceef3" }}>{t.org}</div>
                          <div style={{ marginTop: 3, fontSize: 13, color: "#7a8089", lineHeight: 1.5 }}>{t.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* LIFE */}
            <section data-sec="life" style={{ minHeight: "100%", padding: "8vh 5vw" }}>
              <Heading eyebrow="03 / LIFE" title="OFF THE CLOCK" />
              <p style={{ margin: "14px 0 0", maxWidth: 560, fontSize: 15, lineHeight: 1.6, color: "#7a8089" }}>The parts of life that don&apos;t fit in a repo. Click any frame to enlarge.</p>
              <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: 170, gap: 12 }}>
                {PHOTOS.map((ph) => (
                  <div
                    key={ph.tag}
                    onClick={() => setLightbox(ph)}
                    style={{ gridColumn: ph.col, gridRow: ph.row, position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", background: STRIPE(8), border: "1px solid #1f222a", transition: "transform .25s, border-color .25s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(.985)"; e.currentTarget.style.borderColor = "#3a4150"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#1f222a"; }}
                  >
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,transparent 40%,rgba(180,188,205,.06) 50%,transparent 60%)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(8,8,10,.75))" }} />
                    <span style={{ position: "absolute", left: 13, bottom: 11, fontSize: 13, fontWeight: 500, color: "#dfe2ea" }}>{ph.caption}</span>
                    <span style={{ position: "absolute", right: 11, top: 10, fontFamily: MONO, fontSize: 9, color: "#5b6068" }}>{ph.tag}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ART / OBSESSIONS */}
            <section data-sec="art" style={{ minHeight: "100%", padding: "8vh 0 0" }}>
              <div style={{ padding: "0 5vw" }}>
                <Heading eyebrow="04 / ART & HOBBIES" title="OBSESSIONS" />
              </div>
              <div style={{ padding: "0 5vw", margin: "26px 0 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: MONO, fontSize: 10, letterSpacing: 3, color: "#454a52", marginBottom: 18 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, boxShadow: `0 0 7px ${GREEN}`, animation: "pulseDot 2.4s ease-in-out infinite" }} />
                  {"// CURRENTLY OBSESSING OVER"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {OBSESSIONS.map((label, i) => (
                    <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 17px", border: "1px solid #23262e", borderRadius: 10, background: "#0d0e12", fontFamily: MONO, fontSize: 13, letterSpacing: 2, color: "#5b6068", animation: "chipScan 5.4s ease-in-out infinite", animationDelay: `${i * 0.9}s` }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />{label}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "0 5vw 8vh", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
                <div style={{ gridColumn: "1/-1", position: "relative", minHeight: 280, borderRadius: 16, overflow: "hidden", background: STRIPE(9), border: "1px solid #1f222a", display: "flex", alignItems: "flex-end", padding: 32 }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,transparent 25%,rgba(180,188,205,.08) 50%,transparent 75%)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(8,8,10,.85),transparent 60%)" }} />
                  <div style={{ position: "relative" }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: "oklch(0.65 0.2 25)", letterSpacing: 2 }}>FOUNDER · CINEMATIC GSAP SITE</div>
                    <div style={{ marginTop: 8, fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, letterSpacing: -1, color: "#f0f1f5" }}>REDLINE</div>
                    <div style={{ marginTop: 6, maxWidth: 440, fontSize: 15, lineHeight: 1.55, color: "#9aa0aa" }}>The Berkeley car club I founded — a community of builders, drivers, and gearheads. Doubles as my design showcase.</div>
                  </div>
                </div>
                {HOBBIES.map((h) => (
                  <div
                    key={h.name}
                    style={{ position: "relative", minHeight: 200, borderRadius: 14, overflow: "hidden", background: STRIPE(8), border: "1px solid #1f222a", display: "flex", alignItems: "flex-end", padding: 20, transition: "border-color .25s, transform .25s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3a4150"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1f222a"; e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 45%,rgba(8,8,10,.82))" }} />
                    <div style={{ position: "relative" }}>
                      <div style={{ fontFamily: MONO, fontSize: 10, color: "#6b7280", letterSpacing: 1.5 }}>{h.kind}</div>
                      <div style={{ marginTop: 6, fontSize: 19, fontWeight: 600, color: "#eceef3" }}>{h.name}</div>
                      <div style={{ marginTop: 5, fontSize: 13, lineHeight: 1.5, color: "#7a8089" }}>{h.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTACT */}
            <section data-sec="contact" style={{ minHeight: "100%", padding: "8vh 5vw 6vh", display: "flex", flexDirection: "column" }}>
              <Heading eyebrow="05 / CONTACT" title="LET'S CONNECT" />
              <p style={{ margin: "14px 0 0", maxWidth: 560, fontSize: 15, lineHeight: 1.6, color: "#7a8089" }}>Recruiting, building, or just want to talk shop — the channels are open.</p>
              <div style={{ marginTop: 36, borderTop: "1px solid #1a1c22" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 20, padding: "26px 8px", borderBottom: "1px solid #1a1c22", textDecoration: "none", transition: "padding .25s, background .25s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "24px"; e.currentTarget.style.background = "linear-gradient(90deg,#101217,transparent)"; (e.currentTarget.querySelector("[data-soc-label]") as HTMLElement).style.color = "#f4f5f8"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "8px"; e.currentTarget.style.background = "transparent"; (e.currentTarget.querySelector("[data-soc-label]") as HTMLElement).style.color = "#cfd2d8"; }}
                  >
                    <span style={{ fontFamily: MONO, fontSize: 12, color: "#454a52", width: 34 }}>{s.num}</span>
                    <span data-soc-label style={{ fontSize: "clamp(24px,3.4vw,40px)", fontWeight: 600, letterSpacing: -0.5, color: "#cfd2d8", transition: "color .2s" }}>{s.label}</span>
                    <span style={{ fontFamily: MONO, fontSize: 13, color: "#6b7280", marginLeft: "auto" }}>{s.handle}</span>
                    <span style={{ fontFamily: MONO, fontSize: 18, color: "#5b6068" }}>↗</span>
                  </a>
                ))}
              </div>
              <div style={{ marginTop: "auto", paddingTop: 50, fontFamily: MONO, fontSize: 11, color: "#3a3f4a", letterSpacing: 1 }}>© 2026 CHARLES OW · BUILT IN THE COMMAND CENTER</div>
            </section>
          </div>

          {/* SCROLL PROGRESS (chrome) */}
          <div style={{ position: "absolute", right: 0, top: 0, width: 2, height: "100%", background: "#13151a", zIndex: 2, pointerEvents: "none" }}>
            <div ref={progressRef} style={{ width: "100%", height: "100%", transformOrigin: "top", transform: "scaleY(0)", background: "linear-gradient(180deg,#eef0f4,#9fa3ad,#84878f)", boxShadow: "0 0 8px rgba(190,198,214,.4)" }} />
          </div>
        </div>
      </div>

      {/* ===== EXPAND-IN-PLACE PROJECT DETAIL (FLIP) ===== */}
      {openProj && (
        <>
          <div onClick={closeProject} style={{ position: "fixed", inset: 0, background: "rgba(8,8,10,.74)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 25, animation: "fadeIn .3s both" }} />
          <div ref={detailRef} style={{ position: "fixed", left: "5vw", right: "5vw", top: "9vh", bottom: "6vh", zIndex: 26, background: "#0e1015", border: "1px solid #2c313b", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 40px 120px rgba(0,0,0,.7)" }}>
            <div style={{ height: 230, position: "relative", background: STRIPE(9), flexShrink: 0, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,transparent 25%,rgba(180,188,205,.09) 50%,transparent 75%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 40%,#0e1015)" }} />
              <span style={{ position: "absolute", left: 30, bottom: 24, fontFamily: MONO, fontSize: 11, color: "#5b6068", letterSpacing: 1 }}>{openProj.shot} — full case study imagery</span>
              <button onClick={closeProject} style={{ position: "absolute", right: 20, top: 20, width: 38, height: 38, borderRadius: "50%", background: "rgba(20,22,28,.8)", border: "1px solid #2c313b", color: "#aeb4be", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1d2027"; e.currentTarget.style.borderColor = "#4a505c"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(20,22,28,.8)"; e.currentTarget.style.borderColor = "#2c313b"; e.currentTarget.style.color = "#aeb4be"; }}
              >✕</button>
            </div>
            <div style={{ padding: "8px 40px 40px", overflowY: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor(openProj.status), boxShadow: `0 0 8px ${statusColor(openProj.status)}` }} />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: statusColor(openProj.status) }}>{statusLabel(openProj.status)}</span>
                <span style={{ fontFamily: MONO, fontSize: 11, color: "#5b6068" }}>· {openProj.kind}</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(30px,4.4vw,52px)", fontWeight: 700, letterSpacing: -1, ...chrome(GRAD.detail, 7) }}>{openProj.name}</h2>
              <p style={{ margin: "20px 0 0", maxWidth: 680, fontSize: "clamp(16px,1.6vw,21px)", lineHeight: 1.6, color: "#b6bcc6", fontWeight: 300 }}>{openProj.blurb}</p>
              <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: "#1f222a", border: "1px solid #1f222a", borderRadius: 12, overflow: "hidden" }}>
                {openProj.metrics.map((m) => (
                  <div key={m.label} style={{ background: "#0f1116", padding: "18px 20px" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#eceef3", letterSpacing: -0.5 }}>{m.value}</div>
                    <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 10, color: "#6b7280", letterSpacing: 1 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 26, fontFamily: MONO, fontSize: 11, color: "#5b6068", letterSpacing: 2 }}>STACK</div>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 9 }}>
                {openProj.stackList.map((s) => (
                  <span key={s} style={{ fontFamily: MONO, fontSize: 12, color: "#9aa0aa", border: "1px solid #23262e", borderRadius: 8, padding: "7px 13px", background: "#101217" }}>{s}</span>
                ))}
              </div>
              <button onClick={closeProject} style={{ marginTop: 34, display: "inline-flex", alignItems: "center", gap: 10, background: "#15171d", border: "1px solid #2c313b", borderRadius: 10, padding: "12px 20px", cursor: "pointer", color: "#cfd2d8", fontFamily: MONO, fontSize: 12, letterSpacing: 1 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4a505c"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2c313b"; }}
              >← BACK TO FLEET</button>
            </div>
          </div>
        </>
      )}

      {/* ===== COMMAND PALETTE ===== */}
      {paletteOpen && (
        <div onClick={() => setPaletteOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(6,6,8,.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "14vh", animation: "fadeIn .18s both" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(560px,92vw)", background: "#0e1015", border: "1px solid #2c313b", borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,.7)", animation: "fadeUp .25s both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: "1px solid #1f222a" }}>
              <span style={{ fontFamily: MONO, color: "#5b6068" }}>$</span>
              <span style={{ fontFamily: MONO, fontSize: 14, color: "#9aa0aa" }}>jump to —</span>
              <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 10, color: "#5b6068", border: "1px solid #2a2e36", borderRadius: 5, padding: "2px 7px" }}>ESC</span>
            </div>
            <div style={{ padding: 8 }}>
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", background: "transparent", border: "none", borderRadius: 9, padding: "13px 14px", cursor: "pointer", textAlign: "left", transition: "background .15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#181b21"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, color: "#454a52", width: 24 }}>{item.num}</span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#cfd2d8" }}>{item.label}</span>
                  <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: "#5b6068" }}>{item.cmd}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(6,6,8,.92)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "6vh 6vw", animation: "fadeIn .22s both", cursor: "zoom-out" }}>
          <div style={{ position: "relative", width: "min(900px,90vw)", aspectRatio: "3/2", borderRadius: 14, overflow: "hidden", background: STRIPE(11), border: "1px solid #2c313b", boxShadow: "0 40px 120px rgba(0,0,0,.7)" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,transparent 30%,rgba(180,188,205,.07) 50%,transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 60%,rgba(8,8,10,.8))" }} />
            <span style={{ position: "absolute", left: 26, bottom: 22, fontSize: 20, fontWeight: 600, color: "#f0f1f5" }}>{lightbox.caption}</span>
            <span style={{ position: "absolute", left: 26, top: 22, fontFamily: MONO, fontSize: 11, color: "#6b7280", letterSpacing: 1 }}>{lightbox.tag} · [ photo placeholder ]</span>
            <span style={{ position: "absolute", right: 22, top: 18, fontFamily: MONO, fontSize: 13, color: "#9aa0aa" }}>ESC ✕</span>
          </div>
        </div>
      )}
    </div>
  );
}
