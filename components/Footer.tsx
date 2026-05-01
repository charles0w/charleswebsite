const links = {
  Build: [
    { label: "Projects", href: "#work" },
    { label: "GitHub", href: "https://github.com/charles0w" },
    { label: "Redline Site", href: "https://redline-henna.vercel.app" },
  ],
  Life: [
    { label: "Cars", href: "/life#cars" },
    { label: "Trading Cards", href: "/life#cards" },
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
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        paddingBlock: "clamp(4rem, 8vw, 6rem)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-black text-2xl text-white tracking-tight mb-1">Charles Ow</p>
            <div className="h-px w-16 mb-5 rounded-full" style={{ background: "var(--accent)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              UC Berkeley. Builder. Gearhead.
              <br />
              Building the future one project at a time.
            </p>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-3 gap-10 md:gap-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                  style={{ color: "var(--muted-dim)" }}
                >
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm transition-colors duration-200 hover:text-white"
                        style={{ color: "var(--muted)" }}
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
        <div
          className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted-dim)" }}>
            &copy; {year} Charles Ow. Built with Next.js &amp; GSAP.
          </p>
          <p className="text-xs" style={{ color: "var(--muted-dim)" }}>
            charles_ow@berkeley.edu
          </p>
        </div>
      </div>
    </footer>
  );
}
