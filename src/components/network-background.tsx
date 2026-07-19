"use client";

const nodes = [
  { id: "a", x: 80, y: 100 },
  { id: "b", x: 260, y: 60 },
  { id: "c", x: 430, y: 140 },
  { id: "d", x: 620, y: 70 },
  { id: "e", x: 760, y: 180 },
  { id: "f", x: 180, y: 260 },
  { id: "g", x: 380, y: 300 },
  { id: "h", x: 560, y: 260 },
  { id: "i", x: 700, y: 340 },
  { id: "j", x: 100, y: 380 },
];

const edges: [string, string][] = [
  ["a", "b"],
  ["b", "c"],
  ["c", "d"],
  ["d", "e"],
  ["a", "f"],
  ["f", "g"],
  ["g", "h"],
  ["h", "i"],
  ["b", "g"],
  ["c", "h"],
  ["f", "j"],
  ["g", "j"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

export function NetworkBackground() {
  return (
    <svg
      viewBox="0 0 820 420"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55] dark:opacity-70"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(var(--signal))" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {edges.map(([from, to], i) => {
        const a = byId[from];
        const b = byId[to];
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#edge-grad)"
            strokeWidth={1}
            className="animate-dash"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={i % 3 === 0 ? 4 : 2.5}
          fill={i % 3 === 0 ? "rgb(var(--accent))" : "rgb(var(--signal))"}
          className="node-pulse"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  );
}
