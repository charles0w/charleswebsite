"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("nav-chrome", window.scrollY > 48);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    gsap.from(navRef.current, { opacity: 0, y: -12, duration: 0.6, ease: "power2.out", delay: 0.15 });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: open ? "var(--bg)" : "transparent" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Wordmark + chrome monogram chip */}
        <Link
          href="/"
          className="sheen flex items-center gap-2.5"
          style={{ textDecoration: "none", borderRadius: 8, padding: "2px 2px" }}
          aria-label="Charles Ow — home"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="grid place-items-center"
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              border: "1px solid var(--line-2)",
              background: "linear-gradient(150deg, #17181c 0%, #000 58%), #000",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="url(#nav-mono-chrome)" />
              <defs>
                <linearGradient
                  id="nav-mono-chrome"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="12"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#f4f5f8" />
                  <stop offset="0.5" stopColor="#9a9ea9" />
                  <stop offset="1" stopColor="#d7dae2" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span
            className="chrome-text chrome-text-anim"
            style={{
              fontFamily: "var(--sans)",
              fontWeight: 700,
              fontSize: "1.6rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            CEO
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="mono"
              style={{
                fontSize: "11.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--txt-mid)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--txt-mid)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA — wrapped so `hidden` controls visibility (btn-chrome sets its own display) */}
        <div className="hidden md:block">
          <a
            href="mailto:charles_ow@berkeley.edu"
            className="sheen btn-chrome"
            style={{ fontSize: "10.5px", padding: "8px 16px", letterSpacing: "0.14em" }}
          >
            <Mail size={13} strokeWidth={1.75} aria-hidden />
            Say Hello
          </a>
        </div>

        {/* Mobile menu toggle — animated silver bars → X */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 items-end cursor-pointer bg-transparent"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: 22,
              background: "var(--silver)",
              transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-px transition-all duration-200"
            style={{ width: 15, background: "var(--silver-2)", opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-px transition-all duration-300"
            style={{
              width: 22,
              background: "var(--silver)",
              transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? 360 : 0,
          borderBottom: open ? "1px solid var(--line)" : "1px solid transparent",
          background: "rgba(6,6,8,0.92)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
        }}
      >
        <div className="px-6 py-5 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="mono flex items-center justify-between py-3"
              style={{
                fontSize: "12.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--txt)",
                textDecoration: "none",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {l.label}
              <span aria-hidden style={{ color: "var(--txt-dim)" }}>→</span>
            </a>
          ))}
          <a
            href="mailto:charles_ow@berkeley.edu"
            onClick={() => setOpen(false)}
            className="sheen btn-chrome mt-4 w-full"
            style={{ fontSize: "11px", padding: "12px 16px", letterSpacing: "0.14em" }}
          >
            <Mail size={14} strokeWidth={1.75} aria-hidden />
            Say Hello
          </a>
        </div>
      </div>
    </nav>
  );
}
