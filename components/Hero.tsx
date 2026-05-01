"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(tagRef.current, { y: 20, opacity: 0, duration: 0.8, delay: 0.15 })
        .from(headRef.current!.children, { y: 90, opacity: 0, duration: 1.1, stagger: 0.1 }, "-=0.4")
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(ctaRef.current!.children, { y: 16, opacity: 0, duration: 0.7, stagger: 0.09 }, "-=0.4");

      // Fade out on scroll
      gsap.to([headRef.current, subRef.current, ctaRef.current, tagRef.current], {
        opacity: 0,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "80% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden dot-grid"
      style={{ height: "100svh", minHeight: "680px", background: "var(--bg)" }}
    >
      {/* Radial blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(26,140,255,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, transparent 25%, transparent 70%, var(--bg) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Eyebrow */}
        <div ref={tagRef} className="mb-6 flex items-center gap-3">
          <span className="block w-8 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs font-semibold tracking-[0.28em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            UC Berkeley &middot; Developer &middot; Entrepreneur
          </span>
          <span className="block w-8 h-px" style={{ background: "var(--accent)" }} />
        </div>

        {/* Headline */}
        <div
          ref={headRef}
          className="overflow-hidden"
          style={{ maxWidth: "min(92vw, 1100px)" }}
        >
          <h1
            className="font-black text-white leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(4rem, 10vw, 10.5rem)" }}
          >
            <span className="block">Charles</span>
            <span className="block" style={{ color: "var(--accent)" }}>
              Ow.
            </span>
          </h1>
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className="mt-8 text-base md:text-lg max-w-md leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Building AI tools, automating businesses, launching startups — and
          driving fast cars in between.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#work"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.04] hover:shadow-lg"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 0 40px rgba(26,140,255,0.3)",
            }}
          >
            See My Work
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/life"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition-all duration-300 hover:bg-white hover:text-black"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            My Life
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div
          className="w-px h-12 animate-pulse"
          style={{
            background: "linear-gradient(to bottom, rgba(26,140,255,0.8), transparent)",
          }}
        />
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-medium"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
