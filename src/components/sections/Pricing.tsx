"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";
import { useContact } from "../ContactDialog";

/** 04 Pricing: an introductory Start price, the rest on quote. */
export default function Pricing() {
  const { t } = useLang();
  const p = t.pricing;
  const openContact = useContact();
  return (
    <section id="priser" className="sec band">
      <Reveal className="wrap">
        <div className="split-head">
          <SectionHead kicker={p.kicker} title={p.title} />
          <p className="sub">{p.sub}</p>
        </div>
        <div className="plans">
          {p.plans.map((plan, i) => {
            const main = i === 0;
            return (
              <article key={plan.name} className={main ? "plan main" : "plan"}>
                {main ? <span className="plan-badge">{p.badge}</span> : null}
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  {plan.price ? (
                    <>
                      <span className="plan-from">{p.from}</span>
                      <b>{plan.price}</b>
                      <span className="plan-from">{p.vat}</span>
                    </>
                  ) : (
                    <b className="plan-quote">{p.quote}</b>
                  )}
                </div>
                <p className="plan-d">{plan.d}</p>
                <ul>
                  {plan.li.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <button type="button" className={main ? "plan-btn main" : "plan-btn"} onClick={() => openContact()}>
                  {plan.btn}
                </button>
              </article>
            );
          })}
        </div>
        <p className="plan-note">{p.note}</p>
      </Reveal>
    </section>
  );
}
