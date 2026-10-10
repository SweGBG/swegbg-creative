"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";

/** 07 FAQ: the questions people actually search for (also sent to Google as FAQPage data). */
export default function Faq() {
  const { t } = useLang();
  const f = t.faq;
  return (
    <section id="fragor" className="sec">
      <Reveal className="wrap faq">
        <SectionHead kicker={f.kicker} title={f.title} sub={f.sub} />
        <div className="faq-list">
          {f.items.map((it, i) => (
            <details key={it.q} className="faq-item" open={i === 0}>
              <summary>
                <h3>{it.q}</h3>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
