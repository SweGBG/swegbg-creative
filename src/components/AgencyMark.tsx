/**
 * Logo wordmark "SWEGBG AGENCY", drawn as thin geometric vector strokes
 * (A without crossbar + dot, E as three bars, open C and G, two-bowl S and B).
 * Strokes use currentColor; GBG and the dot use --glow (gold). Paths draw in once on load.
 */
const P = { pathLength: 1 } as const;

export function SwegbgMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-1.6 0 123 24" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* S */}
        <path {...P} d="M13.1 4.5 A6.5 5 0 1 0 7.5 12 A6.5 5 0 1 1 1.9 19.5" style={{ ["--d" as string]: 0 }} />
        {/* W */}
        <path {...P} d="M18 2 L22.5 22 L27 8 L31.5 22 L36 2" style={{ ["--d" as string]: 1 }} />
        {/* E */}
        <path {...P} d="M40 3 H54 M40 12 H54 M40 21 H54" style={{ ["--d" as string]: 2 }} />
      </g>
      <g className="mk-gold" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* G */}
        <path {...P} d="M75.07 4.93 A10 10 0 1 0 78 12 H70" style={{ ["--d" as string]: 3 }} />
        {/* B */}
        <path {...P} d="M83 22 V2 H89.5 A5 5 0 0 1 89.5 12 H83 M83 12 H90.5 A5 5 0 0 1 90.5 22 H83" style={{ ["--d" as string]: 4 }} />
        {/* G */}
        <path {...P} d="M116.57 4.93 A10 10 0 1 0 119.5 12 H111.5" style={{ ["--d" as string]: 5 }} />
      </g>
    </svg>
  );
}

export default function AgencyMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-1.6 0 120 24" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path {...P} d="M1 22 L6.9 3.6 Q8 1.2 9.1 3.6 L15 22" style={{ ["--d" as string]: 6 }} />
        <path {...P} d="M37.07 4.93 A10 10 0 1 0 40 12 H32" style={{ ["--d" as string]: 7 }} />
        <path {...P} d="M44 3 H58 M44 12 H58 M44 21 H58" style={{ ["--d" as string]: 8 }} />
        <path {...P} d="M62 22 V2 L76 22 V2" style={{ ["--d" as string]: 9 }} />
        <path {...P} d="M97.07 4.93 A10 10 0 1 0 97.07 19.07" style={{ ["--d" as string]: 10 }} />
        <path {...P} d="M102 2 L109 12 L116 2 M109 12 V22" style={{ ["--d" as string]: 11 }} />
      </g>
      <circle className="agency-dot" cx="6.6" cy="15.6" r="1.9" />
    </svg>
  );
}
