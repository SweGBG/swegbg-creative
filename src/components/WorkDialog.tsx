"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/site";

/** "See the craft" panel: native <dialog> (focus trap, Esc and inert background come for free). */
export default function WorkDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="work"
      aria-labelledby="work-title"
      onClose={() => {
        document.body.style.overflow = "";
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="work-in">
        <header className="work-head">
          <h2 id="work-title">Selected work</h2>
          <button className="work-x" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {projects.map((p) => (
          <article key={p.name} className="proj">
            <a className="proj-shot" href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`${p.name} website preview`} width="1100" height="688" />
              <span className="proj-live"><i /> Live</span>
            </a>
            <div className="proj-body">
              <p className="proj-kind">{p.kind}</p>
              <h3>{p.name}</h3>
              <p className="proj-blurb">{p.blurb}</p>
              <ul className="proj-tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="proj-links">
                <a className="pbtn pbtn-main" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>Visit {p.name}</span>
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                {p.repoUrl ? (
                  <a className="pbtn pbtn-ghost" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                    <span>View code</span>
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </dialog>
  );
}
