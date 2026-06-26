"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── typewriter ── */
function Typewriter({
  text, startDelay = 0, speed = 42, style = {},
}: {
  text: string; startDelay?: number; speed?: number; style?: React.CSSProperties;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const st = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(st);
  }, [mounted, text, startDelay, speed]);

  if (!mounted) return null;
  return (
    <span style={style}>
      {displayed}
      {!done && <span className="tw-cursor" />}
    </span>
  );
}

/* ── subtle silver "+" registration tick ── */
function Tick({ x, y, size = 14 }: { x: string | number; y: string | number; size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 14 14"
      aria-hidden
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none", opacity: 0.5 }}
    >
      <path d="M7 1 L7 13 M1 7 L13 7"
        stroke="var(--line-3)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BMW 3-series (E46 coupe-inspired) side-profile blueprint
   ViewBox 0 0 560 185
   Front wheel: cx=155, cy=142, r=30   arch top y=112
   Rear  wheel: cx=415, cy=142, r=30   arch top y=112
   Sill: y=150   Ground: y=172
   Arch Q-control y=74  → bezier peak at 0.25·150+0.5·74+0.25·150 = 112 ✓
   Re-skinned from graphite to a glowing chrome line-drawing.
────────────────────────────────────────────────────────────────── */
function BMWSketch({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={svgRef} viewBox="0 0 560 185" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        display: "block",
        overflow: "visible",
        filter: "drop-shadow(0 0 6px rgba(215,218,226,0.35))",
      }}
      aria-hidden>

      {/* soft chrome glow filter for the heavier strokes */}
      <defs>
        <filter id="car-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#car-glow)">
        {/* ╔══ 1. BODY OUTLINE ══╗ */}
        <path data-sketch="body"
          d="M 22 148
             C 22 132 46 114 78 106
             L 100 104
             C 122 101 148 89 165 65
             L 196 33
             C 208 24 248 20 296 20
             L 370 22
             C 384 22 397 26 406 36
             L 418 58
             C 425 72 432 84 438 96
             L 462 110
             C 474 120 482 134 482 148
             L 447 150
             Q 415 74 383 150
             L 195 150
             Q 155 74 115 150
             C 82 150 50 150 22 148 Z"
          stroke="var(--silver)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"
        />

        {/* ╔══ 2. WHEELS — outer + hub ══╗ */}
        {/* front outer */}
        <path data-sketch="wheel"
          d="M 185 142 A 30 30 0 1 0 125 142 A 30 30 0 1 0 185 142"
          stroke="var(--silver)" strokeWidth="1.9" strokeLinecap="round"/>
        {/* front hub */}
        <path data-sketch="wheel"
          d="M 167 142 A 12 12 0 1 0 143 142 A 12 12 0 1 0 167 142"
          stroke="var(--silver)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* rear outer */}
        <path data-sketch="wheel"
          d="M 445 142 A 30 30 0 1 0 385 142 A 30 30 0 1 0 445 142"
          stroke="var(--silver)" strokeWidth="1.9" strokeLinecap="round"/>
        {/* rear hub */}
        <path data-sketch="wheel"
          d="M 427 142 A 12 12 0 1 0 403 142 A 12 12 0 1 0 427 142"
          stroke="var(--silver)" strokeWidth="1.5" strokeLinecap="round"/>
      </g>

      {/* ╔══ 3. 5-SPOKE WHEELS (BMW M-style, 72° apart, top-first) ══╗ */}
      {/* front spokes */}
      <path data-sketch="spoke" d="M 155 132 L 155 112"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 164.5 138.9 L 183.6 133.3"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 160.9 150.1 L 171.6 164.7"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 149.1 150.1 L 138.4 164.7"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 145.5 138.9 L 126.4 133.3"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      {/* rear spokes (cx=415, same offsets +260) */}
      <path data-sketch="spoke" d="M 415 132 L 415 112"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 424.5 138.9 L 443.6 133.3"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 420.9 150.1 L 431.6 164.7"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 409.1 150.1 L 398.4 164.7"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>
      <path data-sketch="spoke" d="M 405.5 138.9 L 386.4 133.3"
        stroke="var(--silver-2)" strokeWidth="1.3" strokeLinecap="round"/>

      {/* ╔══ 4. GLASS — windshield + rear window w/ Hofmeister kink ══╗ */}
      {/* windshield */}
      <path data-sketch="glass"
        d="M 163 67
           L 196 35
           L 296 22
           L 298 42
           C 268 50 228 58 208 68 Z"
        stroke="var(--silver)" strokeWidth="1.5" opacity="0.85" strokeLinecap="round" strokeLinejoin="round"/>
      {/* rear window — Hofmeister kink at bottom-rear corner */}
      <path data-sketch="glass"
        d="M 298 42
           L 298 24
           L 370 24
           C 384 24 397 28 406 38
           L 416 58
           L 396 54
           C 383 52 368 58 342 62
           L 298 60 Z"
        stroke="var(--silver)" strokeWidth="1.5" opacity="0.85" strokeLinecap="round" strokeLinejoin="round"/>

      {/* ╔══ 5. INTERIOR glimpse ══╗ */}
      {/* steering wheel (through lower windshield) */}
      <path data-sketch="interior"
        d="M 220 63 A 13 8 0 1 0 246 63 A 13 8 0 1 0 220 63"
        stroke="var(--silver)" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
      {/* driver seat back */}
      <path data-sketch="interior"
        d="M 282 68 C 286 60 294 56 302 60 L 302 68"
        stroke="var(--silver)" strokeWidth="1" opacity="0.42" strokeLinecap="round"/>
      {/* driver headrest */}
      <path data-sketch="interior"
        d="M 284 58 C 285 51 298 51 299 58"
        stroke="var(--silver)" strokeWidth="1" opacity="0.42" strokeLinecap="round"/>
      {/* rear seat hint */}
      <path data-sketch="interior"
        d="M 358 62 C 362 54 372 51 380 56 L 380 62"
        stroke="var(--silver)" strokeWidth="0.9" opacity="0.34" strokeLinecap="round"/>

      {/* ╔══ 6. DETAILS ══╗ */}
      {/* body crease / character line */}
      <path data-sketch="detail"
        d="M 195 108 C 258 103 324 101 390 104"
        stroke="var(--silver)" strokeWidth="1.2" opacity="0.8" strokeLinecap="round"/>
      {/* side mirror */}
      <path data-sketch="detail"
        d="M 178 68 L 168 62 L 169 56 L 180 58 Z"
        stroke="var(--silver)" strokeWidth="1.3" opacity="0.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* BMW headlight (L-shaped LED strip) */}
      <path data-sketch="detail"
        d="M 76 116 C 84 110 98 107 114 106"
        stroke="var(--silver)" strokeWidth="2.2" strokeLinecap="round"/>
      {/* angel eye ring hint */}
      <path data-sketch="detail"
        d="M 80 114 A 7 5 0 1 0 80 113"
        stroke="var(--silver)" strokeWidth="1.1" opacity="0.8" strokeLinecap="round"/>
      {/* door handle */}
      <path data-sketch="detail"
        d="M 268 100 L 295 100"
        stroke="var(--silver)" strokeWidth="1.9" opacity="0.8" strokeLinecap="round"/>
      {/* rear taillight strip */}
      <path data-sketch="detail"
        d="M 480 124 L 478 148"
        stroke="var(--silver)" strokeWidth="2.8" strokeLinecap="round"/>
      {/* exhaust left */}
      <path data-sketch="detail"
        d="M 460 152 L 474 153"
        stroke="var(--silver)" strokeWidth="2.2" opacity="0.8" strokeLinecap="round"/>
      {/* exhaust right (dual tip) */}
      <path data-sketch="detail"
        d="M 460 156 L 472 157"
        stroke="var(--silver)" strokeWidth="2" opacity="0.8" strokeLinecap="round"/>

      {/* ╔══ 7. WHEEL-WELL CROSS-HATCH + CAST SHADOW ══╗ */}
      {/* front wheel well hatching */}
      <path data-sketch="shadow" d="M 120 138 L 134 118" stroke="var(--silver)" strokeWidth="0.9" opacity="0.22" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 128 145 L 148 118" stroke="var(--silver)" strokeWidth="0.8" opacity="0.18" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 140 149 L 165 118" stroke="var(--silver)" strokeWidth="0.8" opacity="0.15" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 154 150 L 182 120" stroke="var(--silver)" strokeWidth="0.7" opacity="0.12" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 170 150 L 193 127" stroke="var(--silver)" strokeWidth="0.7" opacity="0.10" strokeLinecap="round"/>
      {/* rear wheel well hatching */}
      <path data-sketch="shadow" d="M 386 138 L 400 118" stroke="var(--silver)" strokeWidth="0.9" opacity="0.22" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 394 145 L 414 118" stroke="var(--silver)" strokeWidth="0.8" opacity="0.18" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 406 149 L 432 118" stroke="var(--silver)" strokeWidth="0.8" opacity="0.15" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 420 150 L 444 120" stroke="var(--silver)" strokeWidth="0.7" opacity="0.12" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 434 150 L 447 132" stroke="var(--silver)" strokeWidth="0.7" opacity="0.10" strokeLinecap="round"/>
      {/* ground shadow lines */}
      <path data-sketch="shadow" d="M 50 163 L 210 159"  stroke="var(--silver)" strokeWidth="1"   opacity="0.24" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 80 166 L 320 163"  stroke="var(--silver)" strokeWidth="0.9" opacity="0.18" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 140 168 L 430 166" stroke="var(--silver)" strokeWidth="0.8" opacity="0.15" strokeLinecap="round"/>
      <path data-sketch="shadow" d="M 220 170 L 480 169" stroke="var(--silver)" strokeWidth="0.8" opacity="0.12" strokeLinecap="round"/>
      {/* dimension baseline */}
      <path data-sketch="shadow"
        d="M 22 176 L 482 176 M 22 172 L 22 180 M 482 172 L 482 180"
        stroke="var(--silver)" strokeWidth="0.8" opacity="0.20" strokeLinecap="round"/>
    </svg>
  );
}

/* ── main hero ── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const carSvgRef  = useRef<SVGSVGElement>(null);
  const carWrapRef = useRef<HTMLDivElement>(null);
  const annotRef   = useRef<HTMLDivElement>(null);
  const sigTextRef = useRef<HTMLDivElement>(null);
  const penRef     = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sigDone, setSigDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const svg = carSvgRef.current;
      if (!svg) return;

      /* ── initialise every sketch path as invisible ── */
      svg.querySelectorAll("[data-sketch]").forEach((el) => {
        const geo = el as SVGGeometryElement;
        const len = geo.getTotalLength?.() ?? 400;
        gsap.set(geo, { strokeDasharray: len, strokeDashoffset: len });
      });

      const bodyEl     = svg.querySelector('[data-sketch="body"]');
      const wheelEls   = svg.querySelectorAll('[data-sketch="wheel"]');
      const spokeEls   = svg.querySelectorAll('[data-sketch="spoke"]');
      const glassEls   = svg.querySelectorAll('[data-sketch="glass"]');
      const interiorEls= svg.querySelectorAll('[data-sketch="interior"]');
      const detailEls  = svg.querySelectorAll('[data-sketch="detail"]');
      const shadowEls  = svg.querySelectorAll('[data-sketch="shadow"]');

      const tl = gsap.timeline({ delay: 0.3 });

      /* phase 1 — car draws itself (chrome blueprint forming on the grid) */
      if (bodyEl)      tl.to(bodyEl,      { strokeDashoffset: 0, duration: 1.7, ease: "none"          }, 0);
      tl.to(wheelEls,   { strokeDashoffset: 0, duration: 0.75, stagger: 0.16, ease: "power2.inOut"    }, 0.85);
      tl.to(spokeEls,   { strokeDashoffset: 0, duration: 0.22, stagger: 0.06, ease: "power1.inOut"    }, 1.55);
      tl.to(glassEls,   { strokeDashoffset: 0, duration: 0.46, stagger: 0.12, ease: "power1.inOut"    }, 2.1);
      tl.to(interiorEls,{ strokeDashoffset: 0, duration: 0.28, stagger: 0.08, ease: "power1.inOut"    }, 2.55);
      tl.to(detailEls,  { strokeDashoffset: 0, duration: 0.26, stagger: 0.055, ease: "power1.in"      }, 2.85);
      tl.to(shadowEls,  { strokeDashoffset: 0, duration: 0.32, stagger: 0.04, ease: "none"            }, 3.25);
      tl.to(annotRef.current, { opacity: 1, y: 0, duration: 0.38 }, 3.55);

      /* phase 2 — CEO wordmark writes on, silver scan-line tracks the reveal */
      tl.fromTo(sigTextRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.7, ease: "power1.inOut" },
        3.8,
      );
      tl.fromTo(penRef.current,
        { left: "0%", opacity: 0 },
        { opacity: 1, duration: 0.18, ease: "power1.out" },
        3.8,
      );
      tl.to(penRef.current, { left: "100%", duration: 1.7, ease: "power1.inOut" }, 3.8);
      tl.to(penRef.current, { opacity: 0, duration: 0.3 }, 5.42);

      /* phase 3 — content boots in */
      if (contentRef.current) {
        tl.from(Array.from(contentRef.current.children), {
          opacity: 0, y: 16, duration: 0.6, stagger: 0.16, ease: "power2.out",
        }, 5.2);
      }
      tl.call(() => setSigDone(true), [], 5.45);

      /* ── scroll parallax: car drifts up as hero scrolls away ── */
      gsap.to(carWrapRef.current, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      /* ── hero fades + lifts on deep scroll ── */
      gsap.to(sectionRef.current, {
        opacity: 0.2, y: -24, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "48% top", end: "88% top", scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingInline: "clamp(4rem, 8vw, 7rem)", paddingBlock: "8rem", background: "transparent" }}
    >
      {/* ── command-center status bar (desktop only — avoids nav overlap on mobile) ── */}
      <div
        className="absolute top-6 hidden md:flex items-center gap-3"
        style={{ left: "clamp(1.5rem, 8vw, 7rem)" }}
      >
        <span className="label mono inline-flex items-center gap-2" style={{ color: "var(--txt-mid)" }}>
          <span
            className="pulse-soft"
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--ok)", boxShadow: "0 0 8px var(--ok)",
              display: "inline-block",
            }}
          />
          SYSTEM ONLINE
        </span>
        <span aria-hidden style={{ width: 1, height: 11, background: "var(--line-2)" }} />
        <span className="label mono">BERKELEY · CA</span>
      </div>
      <span
        className="label mono tabular absolute top-6 hidden md:block"
        style={{ right: "clamp(1.5rem, 8vw, 7rem)" }}
      >
        37.8716° N · v2026
      </span>

      {/* subtle silver registration ticks (replace paper stars) */}
      <Tick x="6%" y="22%" size={16} />
      <Tick x="90%" y="30%" size={12} />
      <Tick x="88%" y="74%" size={14} />

      {/* ── BMW blueprint (centered, with scroll parallax) ── */}
      <div ref={carWrapRef} className="relative" style={{ width: "100%", maxWidth: 580 }}>
        <BMWSketch svgRef={carSvgRef} />

        {/* annotation fades in with the shadow group */}
        <div ref={annotRef} style={{
          opacity: 0, transform: "translateY(8px)",
          position: "absolute", bottom: 6, right: 0,
          pointerEvents: "none",
        }}>
          <span className="label mono" style={{ color: "var(--txt-dim)" }}>
            ~ E46 M3 · S54 (one day)
          </span>
        </div>
      </div>

      {/* ── CEO chrome wordmark ── */}
      <div
        className="relative mt-1 mb-5 select-none"
        style={{ maxWidth: "min(90vw, 700px)" }}
      >
        <div
          ref={sigTextRef}
          className="chrome-text chrome-text-anim"
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: "clamp(5rem, 14vw, 11rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            clipPath: "inset(0 100% 0 0)",
            textAlign: "center",
          }}
        >
          CEO
        </div>

        {/* silver scan-line tracks the wordmark reveal, then fades */}
        <div
          ref={penRef}
          aria-hidden
          style={{
            position: "absolute",
            top: "8%",
            bottom: "8%",
            left: "0%",
            width: 2,
            opacity: 0,
            background: "linear-gradient(180deg, transparent, var(--silver) 18%, #ffffff 50%, var(--silver) 82%, transparent)",
            boxShadow: "0 0 12px rgba(215,218,226,0.7)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── content block ── */}
      <div ref={contentRef} className="flex flex-col items-center gap-6" style={{ maxWidth: 540, textAlign: "center" }}>
        {/* typewriter subtitle with silver left-border accent */}
        <div style={{
          borderLeft: "2px solid",
          borderImage: "linear-gradient(180deg, var(--silver), transparent) 1",
          paddingLeft: "1rem",
          textAlign: "left",
          alignSelf: "flex-start",
          minHeight: "2rem",
        }}>
          {sigDone && (
            <Typewriter
              text="Berkeley. Builder. Gearhead."
              startDelay={100}
              speed={44}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "clamp(1.05rem, 2.4vw, 1.6rem)",
                letterSpacing: "-0.01em",
                color: "var(--silver)",
                lineHeight: 1.35,
              }}
            />
          )}
        </div>

        <p style={{
          fontSize: "0.95rem",
          color: "var(--txt-mid)",
          lineHeight: 1.75,
          maxWidth: "60ch",
          fontFamily: "var(--sans)",
        }}>
          UC Berkeley student. I build AI tools, launch ventures, code websites,
          and run a car club. This is my command center.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#work" className="btn-chrome sheen">
            See My Work <ArrowRight size={14} strokeWidth={2} />
          </a>
          <a href="/life" className="btn-ghost">
            My Life <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <svg width="16" height="30" viewBox="0 0 16 30" style={{ opacity: 0.6 }}>
          <path d="M8 0 L8 24" stroke="var(--silver)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 18 L8 25 L13 18" stroke="var(--silver)" strokeWidth="1.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="label mono">SCROLL</span>
      </div>

      {/* band divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "var(--line)" }} />
    </section>
  );
}
