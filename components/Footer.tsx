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
        background: "var(--panel)",
        borderTop: "1px solid var(--line)",
        paddingBlock: "clamp(4rem, 8vw, 6rem)",
        paddingLeft: "clamp(1.5rem, 6vw, 4rem)",
        paddingRight: "clamp(1.5rem, 6vw, 4rem)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Brand signature */}
          <div className="max-w-xs">
            <p
              className="chrome-text"
              style={{
                fontFamily: "var(--sans)",
                fontWeight: 700,
                fontSize: "2.6rem",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              CEO
            </p>
            <div className="divider-glow mt-3 mb-5" style={{ width: "4rem" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--txt-mid)" }}>
              UC Berkeley. Builder. Gearhead.
              <br />
              Building the future one project at a time.
            </p>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-3 gap-10 md:gap-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="label mb-5">{group}</p>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: "14px",
                          color: "var(--txt-mid)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--txt-mid)")}
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
        <div className="divider mt-14" />
        <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="label" style={{ color: "var(--txt-dim)", whiteSpace: "normal" }}>
            &copy; {year}{" "}Charles Ow &mdash; Built with Next.js &amp; GSAP
          </p>
          <p className="label" style={{ color: "var(--txt-dim)", textTransform: "none" }}>
            charles_ow@berkeley.edu
          </p>
        </div>
      </div>
    </footer>
  );
}
