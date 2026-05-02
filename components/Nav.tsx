"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("nav-paper", window.scrollY > 48);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    gsap.from(navRef.current, { opacity: 0, y: -12, duration: 0.6, ease: "power2.out", delay: 0.15 });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  const isLife = pathname?.startsWith("/life");

  const links = isLife
    ? [
        { label: "Portfolio", href: "/" },
        { label: "Cars", href: "/life#cars" },
        { label: "Cards", href: "/life#cards" },
        { label: "Finance", href: "/life#finance" },
      ]
    : [
        { label: "Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Life", href: "/life" },
      ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{ background: "transparent" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Signature logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "2rem",
            color: "var(--ink)",
            textDecoration: "none",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          CEO
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "var(--font-caveat)",
                fontSize: "1.1rem",
                color: "var(--ink-mid)",
                textDecoration: "none",
                transition: "color 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-mid)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:charles_ow@berkeley.edu"
          className="hidden md:flex items-center gap-1.5 btn-ink"
          style={{ fontSize: "0.95rem", padding: "7px 18px" }}
        >
          say hello ✉
        </a>

        {/* Mobile hamburger */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
          <span className="block w-6 h-0.5" style={{ background: "var(--ink)" }} />
          <span className="block w-4 h-0.5" style={{ background: "var(--blue-ink)" }} />
        </div>
      </div>
    </nav>
  );
}
