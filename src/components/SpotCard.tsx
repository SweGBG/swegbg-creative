"use client";

/*
  Card with a spotlight + gentle 3D tilt that follow the pointer (sets --mx/--my/--rx/--ry, CSS does the rest),
  and two pulsing corner lines. Which two corners is picked per card from a fixed shuffle,
  so it looks random but is identical on server and client.
*/
type Corner = "tl" | "tr" | "br" | "bl";
const PAIRS: Corner[][] = [["tr", "bl"], ["tl", "br"], ["tr", "br"], ["bl", "tl"], ["tl", "tr"], ["bl", "br"]];
const MAX = 7; // max tilt in degrees

export default function SpotCard({ children, className = "", index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  const corners = PAIRS[index % PAIRS.length];
  return (
    <article
      className={`card ${className}`}
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        if (e.pointerType === "mouse") {
          el.style.setProperty("--ry", `${((x / r.width) - 0.5) * 2 * MAX}deg`);
          el.style.setProperty("--rx", `${(0.5 - y / r.height) * 2 * MAX}deg`);
        }
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--rx", "0deg");
        e.currentTarget.style.setProperty("--ry", "0deg");
      }}
    >
      {corners.map((c, i) => (
        <span key={c} className={`cn cn-${c}`} style={{ ["--cd" as string]: `${(index * 0.9 + i * 1.7) % 3.4}s` }} aria-hidden="true" />
      ))}
      {children}
    </article>
  );
}
