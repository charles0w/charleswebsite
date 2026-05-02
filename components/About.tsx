"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      style={{ paddingBlock: "clamp(5rem, 12vw, 9rem)", paddingLeft: "clamp(5rem, 10vw, 9rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left — word scrub + bio + skills */}
        <div>
          {/* Section label */}
          <p className="text-xs tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "var(--font-caveat)", color: "var(--pencil)" }}>
            About Me
          </p>

          {/* Scrub statement in Caveat */}
          <h2 style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)", lineHeight: 1.2, color: "var(--ink)" }}>
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => { if (el) wordsRef.current[i] = el; }}
                className="inline-block mr-[0.25em]"
                style={{ opacity: 0.07 }}
              >
                {word}
              </span>
            ))}
          </h2>

          <p className="mt-7 leading-relaxed text-sm max-w-md" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-lato)" }}>
            Based at UC Berkeley, I study and build in parallel — AI trading systems,
            browser extensions, website automation pipelines, and whatever else needs
            to exist. On weekends I run Redline, the car club I co-founded on campus.
          </p>

          {/* Skills as hand-drawn tags */}
          <div className="mt-8">
            <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ fontFamily: "var(--font-caveat)", color: "var(--pencil)" }}>
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="sketch-tag">{s}</span>
              ))}
            </div>
          </div>

          <a
            href="mailto:charles_ow@berkeley.edu"
            className="inline-flex items-center gap-2 mt-8 text-sm"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "1.05rem", color: "var(--blue-ink)", textDecoration: "none" }}
          >
            charles_ow@berkeley.edu →
          </a>
        </div>

        {/* Right — stats bento */}
        <div ref={rightRef}>
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-3"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="rounded-sm p-5 flex flex-col justify-between"
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--sketch-border)",
                  minHeight: 140,
                  boxShadow: "2px 3px 10px rgba(0,0,0,0.06)",
                  transform: `rotate(${["-0.4deg","0.5deg","-0.3deg","0.4deg"][i]})`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dancing)",
                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                    color: "var(--blue-ink)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] mt-3 block" style={{ color: "var(--pencil)", fontFamily: "var(--font-caveat)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Decorative doodle below stats */}
          <div className="mt-6 flex items-center gap-3 opacity-30">
            <svg width="120" height="20" viewBox="0 0 120 20">
              <path d="M 0 10 C 15 6 30 14 45 10 C 60 6 75 14 90 10 C 100 7 110 11 120 10"
                stroke="var(--pencil)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" stroke="var(--pencil)" strokeWidth="1.2" fill="none" />
              <circle cx="8" cy="8" r="2" fill="var(--pencil)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
