"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "9+",  label: "Projects shipped" },
  { value: "3yr", label: "Coding & building" },
  { value: "Cal", label: "UC Berkeley" },
  { value: "1",   label: "Car club founded" },
];

const skills = ["Python", "TypeScript", "React / Next.js", "FastAPI", "Claude API", "GSAP", "Chrome Extensions", "Options Trading"];

const statement = "I build things that actually ship. From AI research tools to automotive club websites — if there's a problem, I'm already writing the solution.";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordsRef.current.length) {
        gsap.fromTo(wordsRef.current,
          { opacity: 0.07, y: 4 },
          {
            opacity: 1, y: 0, stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "center 35%",
              scrub: 1.2,
            },
          }
        );
      }

      gsap.from(statsRef.current!.children, {
        opacity: 0, y: 20, scale: 0.94, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
      });

      gsap.from(rightRef.current!.children, {
        opacity: 0, y: 16, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const words = statement.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full"
      style={{
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        paddingLeft: "clamp(5rem, 10vw, 9rem)",
        paddingRight: "clamp(2rem, 6vw, 5rem)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left — word scrub + bio + skills */}
        <div>
          {/* Section label */}
          <p className="label mb-8 flex items-center gap-2">
            <span style={{ width: 18, height: 1, background: "var(--line-3)", display: "inline-block" }} />
            About Me
          </p>

          {/* Scrub statement — words reveal faint → bright */}
          <h2
            style={{
              fontFamily: "var(--sans)",
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "var(--white)",
              maxWidth: "20ch",
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => { if (el) wordsRef.current[i] = el; }}
                className="inline-block"
                style={{ opacity: 0.07, marginRight: "0.3em" }}
              >
                {word}
              </span>
            ))}
          </h2>

          <p
            className="mt-8 max-w-md"
            style={{ color: "var(--txt-mid)", lineHeight: 1.7, fontSize: "0.95rem" }}
          >
            Based at UC Berkeley, I study and build in parallel — AI trading systems,
            browser extensions, website automation pipelines, and whatever else needs
            to exist. On weekends I run Redline, the car club I co-founded on campus.
          </p>

          {/* Skills as chrome chips */}
          <div className="mt-9">
            <p className="label mb-4">Stack</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <a
            href="mailto:charles_ow@berkeley.edu"
            className="mono inline-flex items-center gap-1.5 mt-9 group"
            style={{ color: "var(--silver)", fontSize: "0.8rem", letterSpacing: "0.04em", textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--silver)")}
          >
            charles_ow@berkeley.edu
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </div>

        {/* Right — stats bento */}
        <div ref={rightRef}>
          <div ref={statsRef} className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="card edge-top sheen p-5 flex flex-col justify-between"
                style={{ minHeight: 140 }}
              >
                <span
                  className="chrome-text"
                  style={{
                    fontFamily: "var(--sans)",
                    fontWeight: 700,
                    fontSize: "clamp(2.1rem, 3.6vw, 3.2rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span className="label mt-3 block">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Chrome tick / coordinate decoration */}
          <div className="mt-7 flex items-center gap-3" style={{ opacity: 0.7 }}>
            <svg width="150" height="14" viewBox="0 0 150 14" fill="none" aria-hidden="true">
              <line x1="0" y1="11" x2="150" y2="11" stroke="var(--line-2)" strokeWidth="1" />
              {[0, 24, 48, 72, 96, 120, 144].map((x, i) => (
                <line
                  key={x}
                  x1={x}
                  y1={i === 2 ? 3 : 6}
                  x2={x}
                  y2="11"
                  stroke={i === 2 ? "var(--silver)" : "var(--line-3)"}
                  strokeWidth="1"
                />
              ))}
            </svg>
            <span className="label tabular">37.8719°N · 122.2585°W</span>
          </div>
        </div>
      </div>
    </section>
  );
}
