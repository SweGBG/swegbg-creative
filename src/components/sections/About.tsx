"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";
import { site } from "@/lib/site";

/** 06 About: the person behind SweGBG, with the Göteborg engraving faintly behind. */
export default function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="om" className="sec band about">
      <div className="about-engrave" aria-hidden="true" />
      <Reveal className="wrap">
        <div className="about-in">
          <SectionHead kicker={a.kicker} title={a.title} />
          <p>{a.p1}</p>
          <p>
            <strong>{a.supportT}</strong> {a.support}
          </p>
          <p>{a.p3}</p>
          <div className="about-links">
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <p className="about-sign">{a.sign}</p>
        </div>
      </Reveal>
    </section>
  );
}
