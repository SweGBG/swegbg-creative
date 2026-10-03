"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";

const HEIGHTS = [12, 26, 44, 66, 92];
const STATS = [100, 0, 3];

export default function Founder() {
  const { t } = useLang();
  return (
    <section id="grow" className="sec grow">
      <Reveal className="wrap">
        <SectionHead kicker={t.grow.kicker} title={t.grow.title} sub={t.grow.sub} />
        <div className="grow-grid">
          <div className="stats">
            {STATS.map((n, i) => (
              <div key={i} className="stat" style={{ ["--to" as string]: n }}>
                <span className="num" aria-hidden="true" />
                <span className="sr">{n}</span>
                <small>{t.grow.stats[i]}</small>
              </div>
            ))}
          </div>
          <figure className="chart" aria-label={t.grow.chartAria}>
            <div className="bars">
              {HEIGHTS.map((h, i) => (
                <div key={i} className="bar" style={{ ["--h" as string]: `${h}%`, ["--i" as string]: i }}>
                  <span>{t.grow.bars[i]}</span>
                </div>
              ))}
            </div>
            <figcaption>{t.grow.caption}</figcaption>
          </figure>
        </div>
      </Reveal>
    </section>
  );
}
