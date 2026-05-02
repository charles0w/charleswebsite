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
  const edgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    /* Page flip: section folds down from slight angle as it enters */
    gsap.fromTo(
      ref.current,
      {
        rotateX: -6,
        transformOrigin: "top center",
        opacity: 0.6,
        y: 12,
      },
      {
        rotateX: 0,
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
        },
      }
    );

    /* Animate the top "paper edge" strip */
    if (edgeRef.current) {
      gsap.fromTo(
        edgeRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        }
      );
    }
  }, []);

  return (
    <div style={{ perspective: "1400px" }}>
      {/* Paper edge strip — visual cue of a page turning */}
      <div
        ref={edgeRef}
        style={{
          height: 6,
          background: `linear-gradient(90deg, var(--paper-3) 0%, var(--paper-2) 100%)`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />

      <div
        ref={ref}
        id={id}
        className={`sketch-section ${className}`}
      >
        {/* Page number */}
        <span className="pg-num absolute top-5 right-7 z-10">
          pg.&nbsp;{pageNum.toString().padStart(2, "0")}
        </span>

        {/* Folded corner decoration */}
        <svg
          width="40" height="40"
          viewBox="0 0 40 40"
          style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.18, pointerEvents: "none" }}
        >
          <polygon points="40,40 0,40 40,0" fill="var(--pencil)" />
          <line x1="0" y1="40" x2="40" y2="0" stroke="var(--sketch-border)" strokeWidth="1" />
        </svg>

        {children}
      </div>
    </div>
  );
}
