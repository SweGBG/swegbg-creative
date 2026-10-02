"use client";

/** Card with a spotlight that follows the pointer (sets --mx/--my, CSS does the rest). */
export default function SpotCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={`card ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </article>
  );
}
