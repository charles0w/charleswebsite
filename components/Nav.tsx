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
      navRef.current.classList.toggle("nav-glass", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    gsap.from(navRef.current, { opacity: 0, y: -16, duration: 0.7, ease: "power3.out", delay: 0.1 });

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: "transparent" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex flex-col gap-0.5">
            <span className="font-black tracking-[-0.02em] text-lg text-white uppercase leading-none">
              Charles Ow
            </span>
            <div
              className="h-px accent-bar rounded-full"
              style={{ background: "var(--accent)", width: "100%" }}
            />
          </div>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-white"
              style={{ color: "var(--muted)" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:charles_ow@berkeley.edu"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
          style={{ background: "var(--accent)" }}
        >
          Get in Touch
        </a>

        {/* Mobile hamburger */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
          <span className="block w-6 h-px bg-white" />
          <span className="block w-4 h-px" style={{ background: "var(--accent)" }} />
        </div>
      </div>
    </nav>
  );
}
