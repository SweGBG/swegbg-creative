"use client";

import Reveal from "../Reveal";
import { useLang } from "@/lib/LangContext";

/** 05 Ownership: everything the client buys is theirs. */
export default function Ownership() {
  const { t } = useLang();
  const o = t.own;
  return (
    <section id="agande" className="sec">
      <Reveal className="wrap own">
        <div className="own-copy">
          <p className="kicker">{o.kicker}</p>
          <h2 className="own-title">
            {o.title[0]} <span>{o.title[1]}</span>
          </h2>
          <p className="sub">{o.sub}</p>
        </div>
        <div className="own-grid">
          {o.items.map((it) => (
            <div key={it.t}>
              <b>{it.t}</b>
              <span>{it.d}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
