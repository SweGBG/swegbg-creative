"use client";

import Reveal from "../Reveal";
import { useLang } from "@/lib/LangContext";
import SectionHead from "../SectionHead";

export default function Pipeline() {
  const { t } = useLang();
  return (
    <section id="ship" className="sec ship">
      <Reveal className="wrap">
        <SectionHead kicker={t.ship.kicker} title={t.ship.title} sub={t.ship.sub} />
        <ol className="pipe">
          <li className="pipe-line" aria-hidden="true">
            <span className="pipe-fill" />
            <span className="pipe-pkg" />
          </li>
          {t.ship.steps.map((s, i) => (
            <li key={i} className="pn" style={{ ["--i" as string]: i }}>
              <span className="dot" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
                </svg>
              </span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
