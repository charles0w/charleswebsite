/* Scrolling ticker strip between Hero and Work — chrome edition */

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

/* thin chrome diamond separator */
function DiamondSep() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <path
        d="M5 0.6 L9.4 5 L5 9.4 L0.6 5 Z"
        stroke="var(--silver-2)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Row({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-1">
      <div
        className={`flex whitespace-nowrap items-center ${reverse ? "marquee-rev" : "marquee-fwd"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <span
              className="mono"
              style={{
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? "var(--txt-dim)" : "var(--silver)",
              }}
            >
              {item}
            </span>
            {i % 3 === 0 ? (
              <DiamondSep />
            ) : (
              <span
                className="mono"
                style={{ color: "var(--txt-faint)", fontSize: "12px" }}
                aria-hidden
              >
                /
              </span>
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
      className="relative w-full overflow-hidden"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "var(--panel-2)",
        paddingBlock: "8px",
      }}
    >
      <Row />
      <Row reverse />

      {/* edge fade masks */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "12%",
          background: "linear-gradient(90deg, var(--panel-2), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "12%",
          background: "linear-gradient(270deg, var(--panel-2), transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
