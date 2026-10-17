/*
  SweGBG badge for the hero (replaces the SVG emblem, which is still in HeroEmblem.tsx if we want it back):
  the round logo as a gilded medal. It materializes out of gold dust (blurred and overexposed -> sharp),
  then a light dot orbits the outer ring, a gloss crosses the disc now and then, sparks twinkle around it
  and the whole badge floats very slightly. Wrapper classes (.hx, .hx-halo, .hx-dust, .hx-sparks, .hx-cap)
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

export default function HeroBadge({ children }: { children?: React.ReactNode }) {
  return (
    <div className="hx">
      <span className="hx-halo" aria-hidden="true" />
      <div className="hx-dust" aria-hidden="true">
        {DUST.map((g, i) => (
          <i key={i} style={{ ["--x" as string]: g.x, ["--y" as string]: g.y, ["--dl" as string]: g.dl, ["--s" as string]: g.s }} />
        ))}
      </div>
      <div className="hb-float">
        <div className="hb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hb-img" src="/img/swegbg-badge.webp" alt="SweGBG Agency" width={900} height={900} decoding="async" fetchPriority="high" />
          <span className="hb-orbit" aria-hidden="true" />
          <span className="hb-sheen" aria-hidden="true" />
        </div>
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
