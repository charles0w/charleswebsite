"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: "Monthly Car Meet",
    date: "Every 3rd Saturday",
    location: "Berkeley Marina Parking Lot",
    tag: "Recurring",
    accent: "var(--red)",
  },
  {
    title: "Thunderhill Track Day",
    date: "June 2025",
    location: "Thunderhill Raceway, Willows CA",
    tag: "Track",
    accent: "var(--gold)",
  },
  {
    title: "Redline Auto Show",
    date: "September 2025",
    location: "UC Berkeley Campus",
    tag: "Annual",
    accent: "var(--red)",
  },
];

export default function CarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.children, {
        opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });

      gsap.from(statsRef.current!.children, {
        opacity: 0, y: 20, scale: 0.96, duration: 0.7, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cars"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "var(--bg-2)",
        paddingBlock: "clamp(5rem, 12vw, 9rem)",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Red ambient glow */}
      <div
        className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,124,124,0.10) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div ref={headRef} className="mb-14">
          <p className="label mb-4" style={{ color: "var(--red)" }}>
            Cars &amp; Automotive
          </p>
          <h2
            className="leading-[1.05] tracking-[-0.025em] max-w-xl"
            style={{ fontFamily: "var(--sans)", fontWeight: 700, color: "var(--white)", fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
          >
            Every drive should feel like it matters.
          </h2>
          <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: "var(--txt-mid)" }}>
            I co-founded Redline, UC Berkeley&rsquo;s automotive club. We run monthly car meets at the
            Berkeley Marina, track days at Thunderhill Raceway, and an annual show on campus that draws
            hundreds of enthusiasts from across the Bay Area.
          </p>
          <a
            href="https://redline-henna.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mono inline-flex items-center gap-2 mt-6 text-sm font-medium uppercase tracking-[0.1em] transition-all hover:gap-3"
            style={{ color: "var(--red)" }}
          >
            Visit Redline <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { v: "2019", l: "Founded" },
            { v: "200+", l: "Members" },
            { v: "40+", l: "Events hosted" },
            { v: "12", l: "Meets per year" },
          ].map((s) => (
            <div key={s.l} className="card edge-top p-5">
              <span className="tabular font-bold text-3xl tracking-tight block" style={{ color: "var(--red)" }}>{s.v}</span>
              <span className="label mt-2 block">{s.l}</span>
            </div>
          ))}
        </div>

        {/* Upcoming events */}
        <p className="label mb-5">Upcoming Events</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {events.map((ev, i) => (
            <div
              key={ev.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="card edge-top p-6"
            >
              <span
                className="chip mb-4"
                style={{
                  color: ev.accent,
                  background: `color-mix(in srgb, ${ev.accent} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${ev.accent} 32%, transparent)`,
                }}
              >
                {ev.tag}
              </span>
              <h3 className="font-semibold text-lg tracking-tight mb-3" style={{ color: "var(--white)" }}>{ev.title}</h3>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Calendar size={12} style={{ color: ev.accent }} />
                  <span className="text-xs" style={{ color: "var(--txt-mid)" }}>{ev.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} style={{ color: ev.accent }} />
                  <span className="text-xs" style={{ color: "var(--txt-mid)" }}>{ev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
