"use client";

import Reveal from "../Reveal";
import Words from "../Words";
import { useLang } from "@/lib/LangContext";
import { useContact } from "../ContactDialog";

export default function Cta() {
  const { t } = useLang();
  const openContact = useContact();
  return (
    <section id="contact" className="sec cta">
      <div className="blobs" aria-hidden="true"><i /><i /><i /></div>
      <Reveal className="wrap cta-in">
        <p className="kicker">{t.cta.kicker}</p>
        <h2 className="cta-h">
          <Words text={t.cta.title} />
        </h2>
        <a className="cta-btn" href="#contact" onClick={(e) => { e.preventDefault(); openContact(); }}>
          <span>{t.cta.btn}</span>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
