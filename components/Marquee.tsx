/* Scrolling ticker strip between Hero and Work */

const items = [
  "AI TOOLS",
  "NEXT.JS",
  "OPTIONS TRADING",
  "CHROME EXTENSIONS",
  "GSAP ANIMATIONS",
  "CAR MEETS",
  "BERKELEY",
  "PYTHON",
  "CARD ARBITRAGE",
  "FULL-STACK",
];

/* tiny car silhouette separator */
function CarSep() {
  return (
    <svg
      width="32" height="14" viewBox="0 0 32 14" fill="none"
      style={{ opacity: 0.32, flexShrink: 0 }}
      aria-hidden
    >
      <path
        d="M 1 9 C 1 7 3 5 5 4.5 L 8 4 C 9.5 3.5 11 2.5 12 1.5 L 15 0.5 C 16 0.2 20 0.2 21 0.5 L 23.5 2 C 24.5 3 25.5 4 27 5.5 L 30 7.5 C 31 8.5 31 9 31 9 L 26.5 9 Q 24 6 21.5 9 L 10.5 9 Q 8 6 5.5 9 Z"
        stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M 8 11 A 2.5 2.5 0 1 0 3 11 A 2.5 2.5 0 1 0 8 11" stroke="var(--pencil)" strokeWidth="0.9"/>
      <path d="M 27 11 A 2.5 2.5 0 1 0 22 11 A 2.5 2.5 0 1 0 27 11" stroke="var(--pencil)" strokeWidth="0.9"/>
    </svg>
  );
}

function Row({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-1.5">
      <div className={`flex whitespace-nowrap items-center ${reverse ? "marquee-rev" : "marquee-fwd"}`} style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-caveat)",
                color: i % 3 === 1 ? "var(--blue-ink)" : "var(--pencil)",
                opacity: i % 3 === 1 ? 0.75 : 0.45,
              }}
            >
              {item}
            </span>
            {i % 4 === 0 ? <CarSep /> : (
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "var(--pencil)", opacity: 0.28 }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderTop: "1px solid var(--sketch-border)",
        borderBottom: "1px solid var(--sketch-border)",
        background: "var(--paper-3)",
        paddingBlock: "8px",
      }}
    >
      <Row />
      <Row reverse />
    </div>
  );
}
