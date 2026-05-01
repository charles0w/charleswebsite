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

function Row({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div className={`flex whitespace-nowrap ${reverse ? "marquee-rev" : "marquee-fwd"}`} style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 px-5">
            <span
              className="text-xs font-bold tracking-[0.22em] uppercase"
              style={{ color: i % 2 === 0 ? "var(--muted-dim)" : "var(--accent)", opacity: i % 2 === 0 ? 0.45 : 0.7 }}
            >
              {item}
            </span>
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "var(--border)" }}
            />
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
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg2)",
        paddingBlock: "12px",
      }}
    >
      <Row />
      <Row reverse />
    </div>
  );
}
