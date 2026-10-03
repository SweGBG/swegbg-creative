"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import SpotCard from "../SpotCard";
import { useLang } from "@/lib/LangContext";

const ICONS = [
  <div key="s" className="ico i-stack" aria-hidden="true"><i /><i /><i /></div>,
  <div key="c" className="ico i-cal" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>,
  <div key="e" className="ico i-eq" aria-hidden="true"><i /><i /><i /><i /><i /></div>,
  <div key="g" className="ico i-gauge" aria-hidden="true"><b /></div>,
];

export default function Craft() {
  const { t } = useLang();
  return (
    <section id="craft" className="sec craft">
      <Reveal className="wrap">
        <SectionHead kicker={t.craft.kicker} title={t.craft.title} />
        <div className="cards">
          {t.craft.cards.map((c, i) => (
            <SpotCard key={i} index={i}>
              {ICONS[i]}
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </SpotCard>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
