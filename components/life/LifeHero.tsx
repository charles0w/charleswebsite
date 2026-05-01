"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LifeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(tagRef.current, { y: 20, opacity: 0, duration: 0.8, delay: 0.2 })
        .from(headRef.current!.children, { y: 80, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.4")
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

      gsap.to([headRef.current, subRef.current, tagRef.current], {
        opacity: 0,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "35% top",
          end: "85% top",
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
      style={{ height: "80svh", minHeight: "560px", background: "var(--bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(26,140,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 0%, transparent 20%, transparent 75%, var(--bg) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div ref={tagRef} className="mb-6 flex items-center gap-3">
          <span className="block w-8 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs font-semibold tracking-[0.28em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Cars &middot; Cards &middot; Finance
          </span>
          <span className="block w-8 h-px" style={{ background: "var(--accent)" }} />
        </div>

        <div
          ref={headRef}
          className="overflow-hidden"
          style={{ maxWidth: "min(92vw, 1000px)" }}
        >
          <h1
            className="font-black text-white leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            <span className="block">Beyond</span>
            <span className="block">the Code.</span>
          </h1>
        </div>

        <p
          ref={subRef}
          className="mt-8 text-base md:text-lg max-w-md leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          The obsessions, hobbies, and side projects that don&rsquo;t live on
          GitHub — but shape everything I build.
        </p>
      </div>
    </section>
  );
}
