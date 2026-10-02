import Reveal from "../Reveal";
import Words from "../Words";
import { site } from "@/lib/site";

export default function Cta() {
  return (
    <section id="contact" className="sec cta">
      <div className="blobs" aria-hidden="true"><i /><i /><i /></div>
      <Reveal className="wrap cta-in">
        <p className="kicker">06 — Start</p>
        <h2 className="cta-h">
          <Words text="Got a passion? Let's build it." />
        </h2>
        <a className="cta-btn" href={site.contactHref}>
          <span>Start a project</span>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
