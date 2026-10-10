"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";

/** 03 How we work: a gold line runs through the four steps and lights each point in turn. */
export default function Process() {
  const { t } = useLang();
  const p = t.process;
  return (
    <section id="process" className="sec ship">
      <Reveal className="wrap">
        <SectionHead kicker={p.kicker} title={p.title} />
        <ol className="pipe">
          <li className="pipe-line" aria-hidden="true">
            <span className="pipe-fill" />
            <span className="pipe-pkg" />
          </li>
          {p.steps.map((s, i) => (
            <li key={s.t} className="pn" style={{ ["--i" as string]: i }}>
              <span className="dot" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
                </svg>
              </span>
              <span className="pn-n">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
