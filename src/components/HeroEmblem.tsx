/*
  SweGBG emblem for the hero (replaces the sun): a gilded hexagon with an "SG" monogram in the
  same thin stroke style as the wordmark, wrapped in rotating rings and a ring of text.
  It materializes out of gold dust (Proviant effect): blurred and overexposed -> sharp,
  then the monogram draws itself, a gloss sweeps across and sparks twinkle around it.
*/
function rng(seed: number) {
  return () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
}
const r = rng(2026);
const DUST = Array.from({ length: 30 }, () => {
  const a = r() * Math.PI * 2;
  const d = 120 + r() * 160; // % of the emblem size, where each grain starts
  return { x: `${(Math.cos(a) * d).toFixed(0)}%`, y: `${(Math.sin(a) * d).toFixed(0)}%`, dl: `${(0.1 + r() * 1.3).toFixed(2)}s`, s: `${(2 + r() * 2.5).toFixed(1)}px` };
});
const SPARKS = Array.from({ length: 10 }, () => ({
  left: `${(6 + r() * 88).toFixed(0)}%`, top: `${(6 + r() * 88).toFixed(0)}%`,
  d: `${(r() * 4).toFixed(1)}s`, t: `${(3 + r() * 4).toFixed(1)}s`,
}));
// pointy-top hexagon around (200,200)
const hex = (R: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 180) * (-90 + 60 * k);
    return `${(200 + R * Math.cos(a)).toFixed(1)},${(200 + R * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
const RING_TEXT = "SWEGBG · WEB AGENCY · GÖTEBORG · EST. 2026 · ";

export default function HeroEmblem() {
  return (
    <div className="hx" aria-hidden="true">
      <span className="hx-halo" />
      <div className="hx-dust">
        {DUST.map((g, i) => (
          <i key={i} style={{ ["--x" as string]: g.x, ["--y" as string]: g.y, ["--dl" as string]: g.dl, ["--s" as string]: g.s }} />
        ))}
      </div>
      <svg className="hx-svg" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="hxGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff1c9" />
            <stop offset=".35" stopColor="#f0b347" />
            <stop offset=".7" stopColor="#c9922a" />
            <stop offset="1" stopColor="#f6d58a" />
          </linearGradient>
          <path id="hxTextPath" d="M200,48 a152,152 0 1,1 -.01,0" />
        </defs>
        {/* rings */}
        <circle className="hx-ring r1" cx="200" cy="200" r="192" />
        <circle className="hx-ring r2" cx="200" cy="200" r="178" />
        <g className="hx-text">
          <text>
            <textPath href="#hxTextPath" textLength="945" lengthAdjust="spacing">{RING_TEXT + RING_TEXT}</textPath>
          </text>
        </g>
        {/* hexagons */}
        <polygon className="hx-hex outer" points={hex(122)} />
        <polygon className="hx-hex inner" points={hex(108)} />
        {/* SG monogram, same strokes as the wordmark */}
        <g className="hx-mono" transform="translate(200 200) scale(4) translate(-19.5 -12)">
          <path pathLength={1} d="M13.1 4.5 A6.5 5 0 1 0 7.5 12 A6.5 5 0 1 1 1.9 19.5" />
          <path pathLength={1} d="M36.07 4.93 A10 10 0 1 0 39 12 H31" />
        </g>
        <circle className="hx-dot" cx="200" cy="292" r="5" />
      </svg>
      <span className="hx-gloss" />
      <div className="hx-sparks">
        {SPARKS.map((s, i) => (
          <i key={i} style={{ left: s.left, top: s.top, ["--d" as string]: s.d, ["--t" as string]: s.t }} />
        ))}
      </div>
    </div>
  );
}
