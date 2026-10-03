/*
  Gold "light threads" that run along the hexagon grid of the Build section, like current in a circuit.
  The grid tile is 56x97 px (same as the CSS background), so paths follow the drawn edges exactly.
  Threads are generated from a fixed seed: random-looking, but identical on server and client.
*/
const TW = 56, TH = 97, COLS = 34, ROWS = 14, COUNT = 14;

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function thread(r: () => number) {
  const col = Math.floor(r() * COLS);
  let row = Math.floor(r() * (ROWS - 4));
  const ox = col * TW;
  const steps = 2 + Math.floor(r() * 3); // hexagons it passes through
  let d = `M${ox + 28} ${row * TH + 1}`;
  for (let s = 0; s < steps; s++) {
    const oy = row * TH;
    // down one side of the hexagon, then the connector into the next one
    d += r() < 0.5 ? ` L${ox + 54} ${oy + 16} L${ox + 54} ${oy + 48}` : ` L${ox + 2} ${oy + 16} L${ox + 2} ${oy + 48}`;
    d += ` L${ox + 28} ${oy + 63} L${ox + 28} ${oy + 98}`;
    row++;
  }
  return d;
}

const r = rng(7);
const THREADS = Array.from({ length: COUNT }, (_, i) => ({
  d: thread(r),
  dur: (7 + r() * 7).toFixed(1),
  delay: (-r() * 14).toFixed(1),
  hue: i % 4 === 0 ? "cyan" : "gold",
}));

export default function HexThreads() {
  return (
    <svg className="hex-threads" width="100%" height="100%" aria-hidden="true" focusable="false">
      {THREADS.map((t, i) => (
        <g key={i} className={`ht ht-${t.hue}`}>
          {/* faint trace of the route */}
          <path d={t.d} className="ht-trace" />
          {/* the travelling spark */}
          <path d={t.d} pathLength={100} className="ht-spark" style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }} />
        </g>
      ))}
    </svg>
  );
}
