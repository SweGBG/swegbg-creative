/*
  SweGBG badge for the hero (replaces the SVG emblem, which is still in HeroEmblem.tsx if we want it back):
  the round logo, gold on transparent so it sits in the sky like the old emblem. It materializes out of gold dust (blurred and overexposed -> sharp),
  drawn in two stages (crest grows from the middle, then the ring is drawn clockwise). The banner is the old
  emblem's SVG banner (cut out of the image): it unfurls from the centre and SWEGBG AGENCY draws itself letter
  by letter, exactly like before. The outer ring with its text turns slowly (like the old ring text). Then a light circles the outer ring, a gloss crosses the gold now and then and
  sparks twinkle around it. The badge itself stays still (no floating). Wrapper classes (.hx, .hx-halo, .hx-dust, .hx-sparks, .hx-cap)
  are shared with HeroEmblem so position and size still come from --sx, --sy and --sd.
*/
function rng(seed: number) {
  return () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
}
const r = rng(2026);
const DUST = Array.from({ length: 30 }, () => {
  const a = r() * Math.PI * 2;
  const d = 120 + r() * 160; // % of the badge size, where each grain starts
  return { x: `${(Math.cos(a) * d).toFixed(0)}%`, y: `${(Math.sin(a) * d).toFixed(0)}%`, dl: `${(0.1 + r() * 1.3).toFixed(2)}s`, s: `${(2 + r() * 2.5).toFixed(1)}px` };
});
const SPARKS = Array.from({ length: 10 }, () => ({
  left: `${(2 + r() * 96).toFixed(0)}%`, top: `${(2 + r() * 96).toFixed(0)}%`,
  d: `${(r() * 4).toFixed(1)}s`, t: `${(3 + r() * 4).toFixed(1)}s`,
}));

// pointy-top hexagon around (200,200), same geometry as the logo image
const hex = (R: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 180) * (-90 + 60 * k);
    return `${(200 + R * Math.cos(a)).toFixed(1)},${(200 + R * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

export default function HeroBadge({ children }: { children?: React.ReactNode }) {
  return (
    <div className="hx">
      <span className="hx-halo" aria-hidden="true" />
      <div className="hx-dust" aria-hidden="true">
        {DUST.map((g, i) => (
          <i key={i} style={{ ["--x" as string]: g.x, ["--y" as string]: g.y, ["--dl" as string]: g.dl, ["--s" as string]: g.s }} />
        ))}
      </div>
              <div className="hb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hb-img" src="/img/swegbg-badge.webp" alt="SweGBG Agency" width={900} height={900} decoding="async" fetchPriority="high" />
          {/* the outer ring with its text, same image masked to the ring, turning slowly like the old ring text */}
          <div className="hb-ringwrap" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hb-ring" src="/img/swegbg-badge.webp" alt="" width={900} height={900} decoding="async" />
          </div>
          <svg className="hb-svg" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="hxGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff1c9" />
                <stop offset=".35" stopColor="#f0b347" />
                <stop offset=".7" stopColor="#c9922a" />
                <stop offset="1" stopColor="#f6d58a" />
              </linearGradient>
              <clipPath id="hbBandClip"><rect x="0" y="236" width="400" height="62" /></clipPath>
            </defs>
            {/* the shield's edge where the banner was cut out of the image, so it is whole before the banner unfurls */}
            <polygon className="hb-hexpatch" clipPath="url(#hbBandClip)" points={hex(122)} />
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
          </svg>
          <span className="hb-orbit" aria-hidden="true" />
          <span className="hb-sheen" aria-hidden="true" />
        </div>
      <div className="hx-sparks" aria-hidden="true">
        {SPARKS.map((s, i) => (
          <i key={i} style={{ left: s.left, top: s.top, ["--d" as string]: s.d, ["--t" as string]: s.t }} />
        ))}
      </div>
      {children}
    </div>
  );
}
