"use client";

import { useLang } from "@/lib/LangContext";



function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className={`mq${reverse ? " rev" : ""}`}>
      <div className="mq-track">
        {list.map((t, i) => (
          <span key={i} className="chip" aria-hidden={i >= items.length ? true : undefined}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const { t } = useLang();
  return (
    <section className="sec mqs" aria-label={t.marquee.aria}>
      <Row items={t.marquee.a} />
      <Row items={t.marquee.b} reverse />
    </section>
  );
}
