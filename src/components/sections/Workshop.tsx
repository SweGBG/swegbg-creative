"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";

const s = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const ICONS = [
  <svg key="pen" {...s}><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
  <svg key="cal" {...s}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M9 16l2 2 4-4" /></svg>,
  <svg key="film" {...s}><rect x="2" y="5" width="15" height="14" rx="2" /><path d="M17 10l5-3v10l-5-3z" /></svg>,
];

/** 01 The workshop: the three crafts SweGBG offers. */
export default function Workshop() {
  const { t } = useLang();
  const w = t.workshop;
  return (
    <section id="verkstaden" className="sec">
      <Reveal className="wrap">
        <div className="split-head">
          <SectionHead kicker={w.kicker} title={w.title} />
          <p className="sub">{w.sub}</p>
        </div>
        <div className="ws-grid">
          {w.cards.map((c, i) => (
            <article key={c.t} className="ws-card" style={{ ["--i" as string]: i }}>
              <div className="ws-top">{ICONS[i]}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
              <ul>
                {c.li.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
