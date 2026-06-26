"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  pageNum: number;
  id?: string;
  className?: string;
}

export default function SketchPage({ children, pageNum, id, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    /* Reduced-motion: reveal immediately so content is never stuck hidden */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    /* Chrome section reveal: soft fade + slight rise as the band scrolls in */
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 86%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{ background: "transparent" }}
    >
      {/* Band separator — thin chrome hairline at the top of the section */}
      <div className="divider" />

      {/* Mono section index in the corner — signature OS detail */}
      <span
        className="label absolute z-10"
        style={{ top: "1.75rem", right: "1.75rem" }}
      >
        {pageNum.toString().padStart(2, "0")} /
      </span>

      {children}
    </section>
  );
}
