/**
 * "AGENCY" wordmark, redrawn as a vector so it stays sharp and takes the page colours.
 * Thin geometric strokes: A without crossbar (with a dot), E as three bars, open C and G.
 * Stroke colour = currentColor, the dot in the A = --glow (gold).
 */
export default function AgencyMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-1.6 0 120 24" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* A */}
        <path d="M1 22 L6.9 3.6 Q8 1.2 9.1 3.6 L15 22" />
        {/* G */}
        <path d="M37.07 4.93 A10 10 0 1 0 40 12 H32" />
        {/* E: three bars */}
        <path d="M44 3 H58 M44 12 H58 M44 21 H58" />
        {/* N */}
        <path d="M62 22 V2 L76 22 V2" />
        {/* C */}
        <path d="M97.07 4.93 A10 10 0 1 0 97.07 19.07" />
        {/* Y */}
        <path d="M102 2 L109 12 L116 2 M109 12 V22" />
      </g>
      <circle className="agency-dot" cx="6.6" cy="15.6" r="1.9" />
    </svg>
  );
}
