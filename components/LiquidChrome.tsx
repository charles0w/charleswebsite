"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import SectionBreak from "./SectionBreak";

/* ════════════════════════════════════════════════════════════════
   CHARLES OW — "LIQUID CHROME" (Revamp A)
   Faithful React port of the Claude Design handoff
   (Revamp A - Liquid Chrome.dc.html). Cinematic editorial:
   a WebGL liquid-metal field floods the hero, the name is cast
   from it letter by letter, and the fleet reads as a magazine
   index with expanding case studies. All values lifted from the
   prototype; the WebGL shader is ported verbatim.
   ════════════════════════════════════════════════════════════════ */

const MONO = "var(--mono)";
const CHROME_GRAD = "linear-gradient(100deg,#f4f5f8,#b9bdc7 20%,#7e818a 40%,#eef0f4 56%,#9fa3ad 72%,#f4f5f8)";

function chromeText(gradient: string, dur: number): CSSProperties {
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

/* ── data ── */
type Status = "live" | "dev" | "research";
type Project = {
  id: string;
  name: string;
  tag: string;
  status: Status;
  blurb: string;
  stackList: string[];
  metrics: { value: string; label: string }[];
};

const PROJECTS: Project[] = [
  { id: "ceo-os", name: "CEO OS", tag: "Fleet-control dashboard for autonomous agents", status: "live",
    blurb: "A fleet-control command center where autonomous AI agents self-report run status and get graded by an independent eval layer. The console I actually run the operation from.",
    stackList: ["Next.js", "Vercel Postgres", "Vercel KV", "Eval layer"],
    metrics: [{ value: "12", label: "LIVE MODULES" }, { value: "24/7", label: "SELF-REPORTING" }, { value: "eval", label: "GRADED RUNS" }] },
  { id: "jarvis", name: "CEO — Jarvis", tag: "Personal AI chief-of-staff", status: "live",
    blurb: "A personal AI chief-of-staff that reads and writes my Obsidian \"second brain,\" manages GitHub, and runs Claude Code — behind a Git safety layer so the model proposes and I commit.",
    stackList: ["FastAPI", "React Native", "Claude API", "Git safety layer"],
    metrics: [{ value: "2nd", label: "BRAIN R/W" }, { value: "git", label: "SAFETY LAYER" }, { value: "mobile", label: "ON THE GO" }] },
  { id: "trading", name: "AI Trading Bot", tag: "LLM-as-analyst options research", status: "dev",
    blurb: "An options-research pipeline using an LLM as the analyst layer over deterministic signals — gated by a benchmark before any live capital is ever deployed.",
    stackList: ["Python", "LLM analyst", "Deterministic signals", "Benchmark gate"],
    metrics: [{ value: "gate", label: "BENCH BEFORE LIVE" }, { value: "LLM", label: "ANALYST ONLY" }, { value: "opts", label: "RESEARCH" }] },
  { id: "redcross", name: "SAAS × Red Cross", tag: "Election-risk ML model", status: "research",
    blurb: "An election-risk machine-learning model combining GDELT data streams, SARGE, and word-embedding sentiment to forecast instability signals.",
    stackList: ["GDELT", "SARGE", "Word embeddings", "Sentiment"],
    metrics: [{ value: "GDELT", label: "DATA STREAMS" }, { value: "NLP", label: "EMBEDDINGS" }, { value: "risk", label: "FORECAST" }] },
  { id: "evals", name: "Evals Toolkit", tag: "Reusable LLM-evaluation kit", status: "live",
    blurb: "A reusable LLM-evaluation kit with a provider-aware judge and reliability scoring — distilled from my AI-evals research into something I drop into every project.",
    stackList: ["Provider-aware judge", "Reliability scoring", "Reusable kit"],
    metrics: [{ value: "multi", label: "PROVIDERS" }, { value: "score", label: "RELIABILITY" }, { value: "reuse", label: "DROP-IN" }] },
  { id: "polymarket", name: "Polymarket Copy Trader", tag: "Smart-wallet copy w/ thesis gate", status: "dev",
    blurb: "Smart-wallet copy-trading gated by an independent LLM event thesis — a two-signal intersection rule means a trade only fires when the wallet and the thesis agree.",
    stackList: ["Smart-wallet tracking", "LLM event thesis", "Intersection rule"],
    metrics: [{ value: "2-sig", label: "INTERSECTION" }, { value: "thesis", label: "LLM GATE" }, { value: "auto", label: "COPY" }] },
  { id: "bizsites", name: "Berkeley Biz Websites", tag: "Auto-generate + cold-sell sites", status: "live",
    blurb: "Finds local businesses with no website, auto-generates a site for each, and cold-emails to sell it. Dozens of demo sites generated end-to-end.",
    stackList: ["Lead finder", "Site generator", "Cold-email engine"],
    metrics: [{ value: "dozens", label: "SITES GEN'D" }, { value: "auto", label: "OUTREACH" }, { value: "$", label: "REVENUE" }] },
  { id: "shopify", name: "Shopify Arbitrage", tag: "AI-run dropshipping store", status: "live",
    blurb: "An AI-run dropshipping store: Claude writes the listings and fulfillment runs end-to-end, so the storefront operates with minimal human touch.",
    stackList: ["Claude listings", "Auto-fulfillment", "Shopify"],
    metrics: [{ value: "AI", label: "LISTINGS" }, { value: "e2e", label: "FULFILLMENT" }, { value: "auto", label: "OPERATIONS" }] },
  { id: "tcg", name: "TCGAuto + Card Arb", tag: "Marketplace tooling + arbitrage", status: "live",
    blurb: "A Chrome extension that auto-fills TCGPlayer / ShipStation from a CSV, plus a tool that finds undervalued Pokémon and One Piece cards across marketplaces.",
    stackList: ["Chrome extension", "CSV automation", "Arbitrage finder"],
    metrics: [{ value: "CSV", label: "AUTO-FILL" }, { value: "multi", label: "MARKETPLACES" }, { value: "edge", label: "UNDERVALUED" }] },
];

const TIMELINE = [
  { year: "2025–", org: "ICONIQ Capital", role: "Production AI/ML — growth-ops pipelines & LLM tooling" },
  { year: "2024", org: "Autodesk", role: "AI/ML engineering internship" },
  { year: "2024", org: "Intertie", role: "Applied ML internship" },
  { year: "2023", org: "Athena AI", role: "Early AI engineering internship" },
];

const SOCIALS = [
  { label: "GITHUB", href: "https://github.com/charles0w" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/charles-ow" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/charles0uch/" },
];

const STATS = [
  { value: "9", label: "MODULES IN THE FLEET" },
  { value: "ICONIQ", label: "AI/ML BY DAY" },
  { value: "'27", label: "UC BERKELEY DS+CS" },
  { value: "24/7", label: "AGENTS SELF-REPORTING" },
];

const OBSESSIONS = ["GYM", "CONTENT CREATION", "GAMING", "CARS", "MOTORCYCLES", "ART / DESIGN"];
const MARQUEE_ITEMS = [...OBSESSIONS, ...OBSESSIONS];

const MANIFESTO =
  "I build AI that actually ships — growth-ops pipelines and LLM tooling at ICONIQ Capital by day, a fleet of autonomous AI products by night.";
const MANIFESTO_WORDS = MANIFESTO.split(" ");

const NAME_LETTERS = "CHARLES OW".split("").map((ch, i) => ({
  ch: ch === " " ? " " : ch,
  minWidth: ch === " " ? "0.35em" : "0",
  delay: `${0.9 + i * 0.09}s`,
  bgPos: `${6 + i * 9.5}% ${38 + (i % 3) * 11}%`,
}));

const statusColor = (s: Status) =>
  s === "live" ? "oklch(0.74 0.13 150)" : s === "dev" ? "oklch(0.8 0.12 80)" : "oklch(0.7 0.07 250)";
const statusLabel = (s: Status) => (s === "live" ? "LIVE" : s === "dev" ? "IN DEV" : "RESEARCH");

/* ── WebGL liquid-metal shader (ported verbatim) ── */
const VERT = `attribute vec2 aP; void main(){ gl_Position = vec4(aP, 0.0, 1.0); }`;
const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uTexRes;
uniform float uT;
uniform vec2 uM;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  uv.y = 1.0 - uv.y;
  float ra = uRes.x / uRes.y;
  float rt = uTexRes.x / uTexRes.y;
  vec2 s = (ra > rt) ? vec2(1.0, rt / ra) : vec2(ra / rt, 1.0);
  vec2 tuv = 0.5 + (uv - 0.5) * s;
  float t = uT;
  tuv = 0.5 + (tuv - 0.5) * (0.88 + 0.06 * sin(t * 0.11));
  tuv += vec2(0.03 * sin(t * 0.16), 0.036 * cos(t * 0.12));
  tuv += (uM - 0.5) * vec2(0.05, 0.035);
  float amp = 0.085 + 0.045 * sin(t * 0.21 + 1.7);
  amp *= 1.0 + 1.1 * smoothstep(0.45, 0.0, distance(uv, uM));
  vec2 w = vec2(
    fbm(tuv * 2.7 + vec2(t * 0.16, t * 0.13)),
    fbm(tuv * 2.7 + vec2(5.2 - t * 0.11, -t * 0.15))
  );
  vec2 w2 = vec2(
    fbm(tuv * 5.5 + w * 2.0 + vec2(1.3, t * 0.24)),
    fbm(tuv * 5.5 + w * 2.0 + vec2(-t * 0.2, 4.1))
  );
  vec2 duv = tuv + (w - 0.5) * amp + (w2 - 0.5) * amp * 0.55;
  duv = clamp(duv, 0.002, 0.998);
  vec3 c = texture2D(uTex, duv).rgb;
  vec3 c2 = texture2D(uTex, clamp(duv + (w2 - 0.5) * 0.03, 0.002, 0.998)).rgb;
  c = max(c, c2 * 0.85);
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  c = pow(c, vec3(0.88));
  c *= 0.82 + 0.55 * smoothstep(0.5, 0.95, lum);
  float band = smoothstep(0.25, 1.0, sin(duv.x * 6.0 + duv.y * 9.0 + t * 0.85));
  c += c * band * 0.3;
  float band2 = smoothstep(0.5, 1.0, sin(duv.y * 11.0 - duv.x * 4.0 - t * 0.6 + 2.3));
  c += c * band2 * 0.18;
  c += (hash(gl_FragCoord.xy + fract(t) * 61.7) - 0.5) * 0.028;
  gl_FragColor = vec4(c, 1.0);
}`;

export default function LiquidChrome() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const heroWrapRef = useRef<HTMLDivElement>(null);
  const heroNameRef = useRef<HTMLDivElement>(null);
  const fallbackImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const manifestoRef = useRef<HTMLSpanElement>(null);

  /* ── scroll parallax + manifesto word-fill + section reveal ── */
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      const vh = window.innerHeight;
      if (heroWrapRef.current) heroWrapRef.current.style.transform = `translateY(${st * 0.32}px)`;
      if (heroNameRef.current) {
        heroNameRef.current.style.opacity = String(Math.max(0, 1 - st / (vh * 0.62)));
        heroNameRef.current.style.transform = `translateY(${st * 0.18}px)`;
      }
      if (manifestoRef.current) {
        const r = manifestoRef.current.getBoundingClientRect();
        const prog = Math.max(0, Math.min(1, (vh * 0.82 - r.top) / (vh * 0.7)));
        const words = manifestoRef.current.querySelectorAll<HTMLElement>("span[data-w]");
        const cut = Math.floor(prog * words.length);
        words.forEach((w, i) => { w.style.color = i <= cut ? "#e6e8ee" : "#3d4047"; });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          (en.target as HTMLElement).style.opacity = "1";
          (en.target as HTMLElement).style.transform = "none";
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(46px)";
      el.style.transition = "opacity 1s cubic-bezier(.2,.8,.2,1), transform 1s cubic-bezier(.2,.8,.2,1)";
      io.observe(el);
    });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  /* ── WebGL liquid-metal field (falls back to the CSS entrance image) ── */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    const mk = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(sh)); return null; }
      return sh;
    };
    const vs = mk(gl.VERTEX_SHADER, VERT);
    const fs = mk(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aP = gl.getAttribLocation(prog, "aP");
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTexRes = gl.getUniformLocation(prog, "uTexRes");
    const uT = gl.getUniformLocation(prog, "uT");
    const uM = gl.getUniformLocation(prog, "uM");

    const m = { x: 0.5, y: 0.42 };
    const ms = { x: 0.5, y: 0.42 };
    const onMouse = (e: MouseEvent) => { m.x = e.clientX / window.innerWidth; m.y = e.clientY / window.innerHeight; };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
    };
    window.addEventListener("resize", resize);

    let raf = 0;
    const img = new Image();
    img.onload = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      const start = performance.now();
      const loop = (now: number) => {
        resize();
        ms.x += (m.x - ms.x) * 0.055;
        ms.y += (m.y - ms.y) * 0.055;
        gl.uniform2f(uRes, cv.width, cv.height);
        gl.uniform2f(uTexRes, img.width, img.height);
        gl.uniform1f(uT, (now - start) / 1000);
        gl.uniform2f(uM, ms.x, ms.y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      // hand off from the CSS entrance image to the live shader
      window.setTimeout(() => {
        cv.style.opacity = "0.6";
        const fb = fallbackImgRef.current;
        if (fb) {
          fb.style.transition = "opacity 1.8s ease";
          window.setTimeout(() => { fb.style.animation = "none"; fb.style.opacity = "0"; }, 300);
        }
      }, 2200);
    };
    img.src = "/chrome-flow.avif";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "relative", background: "#030304" }}>
      {/* fixed vignette */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(215,218,226,0.05), transparent 60%)" }} />

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 1 }}>
        <div ref={heroWrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={fallbackImgRef} src="/chrome-flow.avif" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transformOrigin: "center", mixBlendMode: "screen", opacity: 0.48, animation: "liquidIn 2.8s cubic-bezier(.2,.8,.2,1) both, liquidBg 18s ease-in-out 2.8s infinite" }} />
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: "screen", opacity: 0, transition: "opacity 1.6s ease" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 74% 56% at 50% 48%, rgba(3,3,4,0.88), rgba(3,3,4,0.3) 55%, transparent 80%)" }} />
        </div>

        <div ref={heroNameRef} style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
          <div style={{ position: "relative", fontSize: "clamp(52px, 11.5vw, 190px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 0.9, whiteSpace: "nowrap" }}>
            {/* base chrome-gradient letters */}
            <div>
              {NAME_LETTERS.map((l, i) => (
                <span key={i} style={{
                  display: "inline-block", minWidth: l.minWidth,
                  backgroundImage: "linear-gradient(100deg,#e8eaf0,#9ea3ad 22%,#5f636c 42%,#dfe2ea 58%,#8a8e99 74%,#e8eaf0)",
                  backgroundSize: "220% auto", WebkitBackgroundClip: "text", backgroundClip: "text",
                  WebkitTextFillColor: "transparent", color: "transparent",
                  animation: `letterIn 1.3s cubic-bezier(.2,.85,.25,1) ${l.delay} both, chromeSheen 7s linear 2.4s infinite`,
                  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.7))",
                }}>{l.ch}</span>
              ))}
            </div>
            {/* liquid-metal letters cast from the flowing texture (screen-blended) */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, mixBlendMode: "screen", pointerEvents: "none" }}>
              {NAME_LETTERS.map((l, i) => (
                <span key={i} style={{
                  display: "inline-block", minWidth: l.minWidth,
                  backgroundImage: "url('/chrome-flow.avif')", backgroundSize: "420% auto", backgroundPosition: l.bgPos,
                  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent",
                  animation: `letterIn 1.3s cubic-bezier(.2,.85,.25,1) ${l.delay} both, textFlow 9s ease-in-out 2.4s infinite`,
                }}>{l.ch}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 34, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, animation: "subIn 1s ease 2.4s both" }}>
            <span style={{ width: 44, height: 1, background: "linear-gradient(90deg,transparent,#4a505c)" }} />
            <span style={{ fontFamily: MONO, fontSize: "clamp(10px,1.1vw,13px)", letterSpacing: "0.42em", color: "#84868f" }}>BERKELEY · BUILDER · AI THAT SHIPS</span>
            <span style={{ width: 44, height: 1, background: "linear-gradient(90deg,#4a505c,transparent)" }} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "5vh", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, animation: "subIn 1s ease 3s both" }}>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.4em", color: "#54565e" }}>SCROLL</span>
          <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(180deg,#84868f,transparent)", animation: "cueBob 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* MANIFESTO */}
      <section data-reveal style={{ position: "relative", zIndex: 1, padding: "22vh 7vw", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.4em", color: "#54565e", marginBottom: 36 }}>00 / MANIFESTO</div>
        <p style={{ fontSize: "clamp(28px, 4.2vw, 62px)", lineHeight: 1.18, fontWeight: 500, letterSpacing: "-0.02em", color: "#3d4047", maxWidth: 1100 }}>
          <span ref={manifestoRef}>
            {MANIFESTO_WORDS.map((w, i) => (
              <span key={i} data-w style={{ color: "#3d4047", transition: "color .35s ease" }}>{w}{i < MANIFESTO_WORDS.length - 1 ? " " : ""}</span>
            ))}
          </span>
        </p>
        <div style={{ marginTop: "8vh", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderTop: "1px solid #1a1a1f", borderBottom: "1px solid #1a1a1f", borderLeft: "1px solid #1a1a1f" }}>
          {STATS.map((st) => (
            <div key={st.label} style={{ background: "#030304", padding: "34px 28px", borderRight: "1px solid #1a1a1f", borderBottom: "1px solid #1a1a1f", marginBottom: -1 }}>
              <div style={{ fontSize: "clamp(30px,3vw,44px)", fontWeight: 700, letterSpacing: "-0.02em", ...chromeText("linear-gradient(100deg,#f4f5f8,#b9bdc7 25%,#84878f 45%,#eef0f4 62%,#f4f5f8)", 8) }}>{st.value}</div>
              <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 10, letterSpacing: "0.28em", color: "#54565e" }}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION BREAK — chapter divider (Forever AI Components #282 "Block Reveal", chrome-recolored) */}
      <div data-reveal style={{ position: "relative", zIndex: 1, padding: "6vh 7vw 12vh", maxWidth: 1500, margin: "0 auto" }}>
        <SectionBreak label="INTERLUDE" lines={["Build", "Ship", "Repeat"]} ariaLabel="Build. Ship. Repeat." />
      </div>

      {/* WORK — editorial index */}
      <section data-reveal style={{ position: "relative", zIndex: 1, padding: "8vh 7vw 14vh", maxWidth: 1500, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: "4vh" }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.4em", color: "#54565e" }}>01 / THE FLEET</div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: "#54565e" }}>select a module to open its case study</div>
        </div>
        <div style={{ borderTop: "1px solid #1a1a1f" }}>
          {PROJECTS.map((p, i) => {
            const open = expandedId === p.id;
            return (
              <div key={p.id} style={{ borderBottom: "1px solid #1a1a1f" }}>
                <div
                  onClick={() => setExpandedId((cur) => (cur === p.id ? null : p.id))}
                  style={{ display: "flex", alignItems: "center", gap: "clamp(16px,3vw,44px)", padding: "clamp(20px,3.4vh,36px) 8px", cursor: "pointer", transition: "background .3s, padding-left .3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, rgba(215,218,226,0.03), transparent 70%)"; e.currentTarget.style.paddingLeft = "26px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "8px"; }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 12, color: "#454a52", width: 30, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{
                    fontSize: "clamp(26px, 4.4vw, 66px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1, transition: "all .3s",
                    ...(open
                      ? { backgroundImage: CHROME_GRAD, backgroundSize: "220% auto", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }
                      : { color: "#6f747d", WebkitTextFillColor: "#6f747d", backgroundImage: "none" }),
                  }}>{p.name}</span>
                  <span style={{ marginLeft: "auto", textAlign: "right", flexShrink: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 13, color: "#7a8089" }}>{p.tag}</span>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 7, marginTop: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor(p.status), boxShadow: `0 0 7px ${statusColor(p.status)}` }} />
                      <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: statusColor(p.status) }}>{statusLabel(p.status)}</span>
                    </span>
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 20, color: "#54565e", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .35s" }}>↓</span>
                </div>
                <div style={{ maxHeight: open ? 640 : 0, overflow: "hidden", transition: "max-height .55s cubic-bezier(.2,.85,.25,1)" }}>
                  <div style={{ padding: "6px 8px 44px calc(30px + clamp(16px,3vw,44px))", display: "grid", gridTemplateColumns: "minmax(280px, 1.4fr) minmax(220px, 1fr)", gap: "clamp(24px,4vw,64px)", alignItems: "start" }}>
                    <div>
                      <p style={{ fontSize: "clamp(16px,1.5vw,20px)", lineHeight: 1.65, color: "#b6bcc6", fontWeight: 300, maxWidth: 640 }}>{p.blurb}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 24 }}>
                        {p.stackList.map((s) => (
                          <span key={s} style={{ fontFamily: MONO, fontSize: 11, color: "#9aa0aa", border: "1px solid #26262d", borderRadius: 8, padding: "6px 12px", background: "rgba(255,255,255,0.02)" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 1, background: "#1a1a1f", border: "1px solid #1a1a1f", borderRadius: 12, overflow: "hidden" }}>
                      {p.metrics.map((m) => (
                        <div key={m.label} style={{ background: "#08080a", padding: "16px 20px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                          <span style={{ fontSize: 20, fontWeight: 700, color: "#eceef3" }}>{m.value}</span>
                          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: "#6b7280" }}>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section data-reveal style={{ position: "relative", zIndex: 1, borderTop: "1px solid #1a1a1f", padding: "16vh 7vw", maxWidth: 1500, margin: "0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.4em", color: "#54565e", marginBottom: "6vh" }}>02 / THE OPERATOR</div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(300px, 1.3fr) minmax(260px, 1fr)", gap: "clamp(32px, 6vw, 100px)", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "clamp(30px, 3.6vw, 54px)", lineHeight: 1.2, fontWeight: 500, letterSpacing: "-0.02em", ...chromeText("linear-gradient(100deg,#f4f5f8,#b9bdc7 22%,#84878f 42%,#eef0f4 58%,#9fa3ad 74%,#f4f5f8)", 9) }}>&quot;The LLM is the analyst, not the executor.&quot;</div>
            <p style={{ marginTop: 30, fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: "#9aa0aa", fontWeight: 300, maxWidth: 560 }}>
              UC Berkeley Data Science + CS, class of &apos;27. Every project ships behind a validation gate — benchmarks before capital, evals before deploys, Git safety layers before autonomy.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.3em", color: "#54565e", marginBottom: 20 }}>TRAJECTORY</div>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 20, padding: "16px 0", borderBottom: "1px solid #16181d" }}>
                <span style={{ fontFamily: MONO, fontSize: 12, color: "#6b7280", width: 60, flexShrink: 0, paddingTop: 3 }}>{t.year}</span>
                <span>
                  <span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "#eceef3" }}>{t.org}</span>
                  <span style={{ display: "block", marginTop: 3, fontSize: 13, color: "#7a8089", lineHeight: 1.5 }}>{t.role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section data-reveal style={{ position: "relative", zIndex: 1, borderTop: "1px solid #1a1a1f", padding: "18vh 7vw 10vh", textAlign: "center", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/chrome-star.jpg" alt="" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "min(90vh, 80vw)", mixBlendMode: "screen", opacity: 0.4, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.4em", color: "#54565e" }}>03 / TRANSMIT</div>
          <a href="mailto:charles_ow@berkeley.edu" style={{ display: "inline-block", marginTop: "4vh", fontSize: "clamp(30px, 5.6vw, 92px)", fontWeight: 700, letterSpacing: "-0.03em", textDecoration: "none", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.7))", ...chromeText(CHROME_GRAD, 6) }}>charles_ow@berkeley.edu</a>
          <div style={{ marginTop: "6vh", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.16em", color: "#9aa0aa", textDecoration: "none", border: "1px solid #26262d", borderRadius: 24, padding: "11px 22px", transition: "all .25s", background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#f4f5f8"; e.currentTarget.style.borderColor = "#4a505c"; e.currentTarget.style.boxShadow = "0 0 24px -6px rgba(215,218,226,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9aa0aa"; e.currentTarget.style.borderColor = "#26262d"; e.currentTarget.style.boxShadow = "none"; }}
              >{s.label} ↗</a>
            ))}
          </div>
        </div>
      </section>

      {/* OBSESSIONS MARQUEE */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid #1a1a1f", padding: "26px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 32s linear infinite" }}>
          {MARQUEE_ITEMS.map((m, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 22, paddingRight: 22, fontFamily: MONO, fontSize: 12, letterSpacing: "0.3em", color: "#454a52", whiteSpace: "nowrap" }}>{m}<span style={{ color: "#26262d" }}>✦</span></span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: "relative", zIndex: 1, padding: "22px 7vw 30px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: "#36373d" }}>
        <span>© 2026 CHARLES OW</span>
        <span>DIRECTION A — LIQUID CHROME</span>
      </div>
    </div>
  );
}
