"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "9+", label: "Projects shipped" },
  { value: "3yr", label: "Coding & building" },
  { value: "Cal", label: "UC Berkeley" },
  { value: "1", label: "Car club founded" },
];

const skills = [
  "Python", "TypeScript", "React / Next.js", "FastAPI",
  "Claude API", "GSAP", "Chrome Extensions", "Options Trading",
];

const statement =
  "I build things that actually ship. From AI research tools to automotive club websites — if there's a problem, I'm already writing the solution.";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordsRef.current.length) {
        gsap.fromTo(
          wordsRef.current,
          { opacity: 0.08, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "center 38%",
              scrub: 1.2,
            },
          }
        );
      }

      gsap.from(statsRef.current!.children, {
        opacity: 0,
        y: 28,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
      });

      gsap.from(skillsRef.current!.children, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: skillsRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = statement.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--bg)",
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(26,140,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: scrub text */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-8"
              style={{ color: "var(--accent)" }}
            >
              About Me
            </p>
            <h2
              className="font-black leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { if (el) wordsRef.current[i] = el; }}
                  className="inline-block mr-[0.26em]"
                  style={{ opacity: 0.08 }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <p
              className="mt-8 text-base leading-relaxed max-w-lg"
              style={{ color: "var(--muted)" }}
            >
              Based at UC Berkeley, I study and build in parallel — AI trading
              systems, browser extensions, website automation pipelines, and
              whatever else needs to exist. On weekends, I help run Redline,
              the car club I co-founded on campus.
            </p>

            {/* Skills */}
            <div className="mt-10">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--muted-dim)" }}
              >
                Stack
              </p>
              <div ref={skillsRef} className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: stats bento */}
          <div>
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-3"
              style={{ gridAutoFlow: "dense" }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-6 flex flex-col justify-between"
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    minHeight: "140px",
                  }}
                >
                  <span
                    className="font-black text-4xl md:text-5xl tracking-tight"
                    style={{ color: "var(--accent)" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-xs font-medium uppercase tracking-[0.15em] mt-3"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="mailto:charles_ow@berkeley.edu"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
              style={{ color: "var(--accent)" }}
            >
              charles_ow@berkeley.edu &#8594;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
