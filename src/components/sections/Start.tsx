"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";
import { useContact } from "../ContactDialog";
import { site } from "@/lib/site";

/** 07 Start: phone, email and the contact form (opens the shared contact dialog). */
export default function Start() {
  const { t } = useLang();
  const s = t.start;
  const openContact = useContact();
  return (
    <section id="kontakt" className="sec start">
      <Reveal className="wrap start-in">
        <div className="start-copy">
          <SectionHead kicker={s.kicker} title={s.title} sub={s.sub} />
          <button type="button" className="plan-btn main start-btn" onClick={() => openContact()}>
            {s.btn}
          </button>
        </div>
        <div className="start-card">
          <div>
            <span className="start-label">{s.call}</span>
            <a className="start-big" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
          <div>
            <span className="start-label">{s.mail}</span>
            <a className="start-mid" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <p className="start-note">{t.contact.note}</p>
        </div>
      </Reveal>
    </section>
  );
}
