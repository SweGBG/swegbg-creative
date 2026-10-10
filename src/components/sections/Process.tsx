"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";

/** 03 How we work: four real steps, in order. */
export default function Process() {
  const { t } = useLang();
  const p = t.process;
  return (
    <section id="process" className="sec">
      <Reveal className="wrap">
        <SectionHead kicker={p.kicker} title={p.title} />
        <ol className="steps4">
          {p.steps.map((s, i) => (
            <li key={s.t} style={{ ["--i" as string]: i }}>
              <span className="step-n">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
