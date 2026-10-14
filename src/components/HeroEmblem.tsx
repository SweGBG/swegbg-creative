/*
  SweGBG emblem for the hero (replaces the sun): a gilded hexagonal coat of arms (crown, beaded border,
  rivets) with an "SG" monogram and a banner reading SWEGBG AGENCY, all in the wordmark's thin strokes,
  wrapped in rotating rings and a ring of text.
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

export default function HeroEmblem({ children }: { children?: React.ReactNode }) {
  return (
    <div className="hx">
      <span className="hx-halo" aria-hidden="true" />
      <div className="hx-dust" aria-hidden="true">
        {DUST.map((g, i) => (
          <i key={i} style={{ ["--x" as string]: g.x, ["--y" as string]: g.y, ["--dl" as string]: g.dl, ["--s" as string]: g.s }} />
        ))}
      </div>
      <svg className="hx-svg" viewBox="0 0 400 400" fill="none" aria-hidden="true">
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
        {/* crown on the top point: the hexagon reads as a coat of arms */}
        <g className="hx-crown">
          <path pathLength={1} d="M185 75 L182 60 L192 67 L200 55 L208 67 L218 60 L215 75 Z" />
          <circle cx="182" cy="59" r="2" /><circle cx="200" cy="54" r="2.2" /><circle cx="218" cy="59" r="2" />
        </g>
        {/* shield: gilded hexagon, beaded inner border and rivets at the corners */}
        <polygon className="hx-hex outer" points={hex(122)} />
        <polygon className="hx-hex beads" points={hex(115)} />
        <polygon className="hx-hex inner" points={hex(108)} />
        <g className="hx-rivets">
          {hex(115).split(" ").map((p) => {
            const [x, y] = p.split(",");
            return <circle key={p} cx={x} cy={y} r="2.6" />;
          })}
        </g>
        {/* SG monogram, same strokes as the wordmark */}
        <g className="hx-mono" transform="translate(200 180) scale(3.5) translate(-19.5 -12)">
          <path pathLength={1} d="M13.1 4.5 A6.5 5 0 1 0 7.5 12 A6.5 5 0 1 1 1.9 19.5" />
          <path pathLength={1} d="M36.07 4.93 A10 10 0 1 0 39 12 H31" />
        </g>
        {/* banner across the shield with "SWEGBG AGENCY", drawn in the same strokes */}
        <g className="hx-ribbon">
          <path className="rb-tail" d="M80 258 L34 258 L50 274 L34 290 L80 290 Z" />
          <path className="rb-tail" d="M320 258 L366 258 L350 274 L366 290 L320 290 Z" />
          <path className="rb-fold" d="M68 284 L80 290 L80 280 Z" />
          <path className="rb-fold" d="M332 284 L320 290 L320 280 Z" />
          <path className="rb-band" d="M68 248 Q200 238 332 248 L332 284 Q200 274 68 284 Z" />
          <path className="rb-edge" d="M74 252 Q200 242.5 326 252 M74 280 Q200 270.5 326 280" />
          <g className="hx-word" transform="translate(200 262) scale(.8) translate(-126 -12)">
            <g className="w-ink">
              <path pathLength={1} style={{ ["--d" as string]: 0 }} d="M13.1 4.5 A6.5 5 0 1 0 7.5 12 A6.5 5 0 1 1 1.9 19.5" />
              <path pathLength={1} style={{ ["--d" as string]: 1 }} d="M18 2 L22.5 22 L27 8 L31.5 22 L36 2" />
              <path pathLength={1} style={{ ["--d" as string]: 2 }} d="M40 3 H54 M40 12 H54 M40 21 H54" />
            </g>
            <g className="w-gold">
              <path pathLength={1} style={{ ["--d" as string]: 3 }} d="M75.07 4.93 A10 10 0 1 0 78 12 H70" />
              <path pathLength={1} style={{ ["--d" as string]: 4 }} d="M83 22 V2 H89.5 A5 5 0 0 1 89.5 12 H83 M83 12 H90.5 A5 5 0 0 1 90.5 22 H83" />
              <path pathLength={1} style={{ ["--d" as string]: 5 }} d="M116.57 4.93 A10 10 0 1 0 119.5 12 H111.5" />
            </g>
            <g className="w-ink" transform="translate(133 0)">
              <path pathLength={1} style={{ ["--d" as string]: 6 }} d="M1 22 L6.9 3.6 Q8 1.2 9.1 3.6 L15 22" />
              <path pathLength={1} style={{ ["--d" as string]: 7 }} d="M37.07 4.93 A10 10 0 1 0 40 12 H32" />
              <path pathLength={1} style={{ ["--d" as string]: 8 }} d="M44 3 H58 M44 12 H58 M44 21 H58" />
              <path pathLength={1} style={{ ["--d" as string]: 9 }} d="M62 22 V2 L76 22 V2" />
              <path pathLength={1} style={{ ["--d" as string]: 10 }} d="M97.07 4.93 A10 10 0 1 0 97.07 19.07" />
              <path pathLength={1} style={{ ["--d" as string]: 11 }} d="M102 2 L109 12 L116 2 M109 12 V22" />
            </g>
          </g>
        </g>
        <circle className="hx-dot" cx="200" cy="300" r="4" />
      </svg>
      <span className="hx-gloss" aria-hidden="true" />
      <div className="hx-sparks" aria-hidden="true">
        {SPARKS.map((s, i) => (
          <i key={i} style={{ left: s.left, top: s.top, ["--d" as string]: s.d, ["--t" as string]: s.t }} />
        ))}
      </div>
      {children}
    </div>
  );
}
