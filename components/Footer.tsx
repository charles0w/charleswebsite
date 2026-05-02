"use client";

const links = {
  Build: [
    { label: "Projects", href: "#work" },
    { label: "GitHub", href: "https://github.com/charles0w" },
    { label: "Redline Site", href: "https://redline-henna.vercel.app" },
  ],
  Life: [
    { label: "Cars", href: "/life#cars" },
    { label: "Cards", href: "/life#cards" },
    { label: "Finance", href: "/life#finance" },
  ],
  Connect: [
    { label: "Email", href: "mailto:charles_ow@berkeley.edu" },
    { label: "Instagram", href: "https://www.instagram.com/redlineatberkeley/" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full"
      style={{
        background: "var(--paper-3)",
        borderTop: "1.5px solid var(--sketch-border)",
        paddingBlock: "clamp(4rem, 8vw, 6rem)",
        paddingLeft: "clamp(5rem, 10vw, 9rem)",
        paddingRight: "clamp(2rem, 6vw, 5rem)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Brand signature */}
          <div className="max-w-xs">
            <p style={{ fontFamily: "var(--font-dancing)", fontSize: "2.8rem", color: "var(--ink)", lineHeight: 1 }}>
              CEO
            </p>
            <div
              className="mt-1 mb-4 h-0.5 w-16 rounded-full"
              style={{ background: "var(--sketch-border)" }}
            />
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-lato)" }}>
              UC Berkeley. Builder. Gearhead.
              <br />
              Building the future one project at a time.
            </p>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-3 gap-10 md:gap-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: "var(--pencil)", fontFamily: "var(--font-caveat)" }}>
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{ fontFamily: "var(--font-caveat)", fontSize: "1rem", color: "var(--ink-mid)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-mid)")}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-5 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--sketch-border)" }}>
          <p className="text-xs" style={{ color: "var(--pencil)", fontFamily: "var(--font-caveat)" }}>
            &copy; {year} Charles Ow &mdash; Built with Next.js &amp; GSAP
          </p>
          <p className="text-xs" style={{ color: "var(--pencil)", fontFamily: "var(--font-caveat)" }}>
            charles_ow@berkeley.edu
          </p>
        </div>
      </div>
    </footer>
  );
}
