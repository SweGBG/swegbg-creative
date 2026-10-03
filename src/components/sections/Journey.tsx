"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";

export default function Journey() {
  const { t } = useLang();
  return (
    <section id="journey" className="sec journey">
      <Reveal className="wrap">
        <SectionHead kicker={t.journey.kicker} title={t.journey.title} />
      </Reveal>
      <div className="wrap stack">
        {t.journey.cards.map((c, i) => (
          <article key={i} className="sc" style={{ ["--i" as string]: i }}>
            <span className="big-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
            <span className="orb" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
