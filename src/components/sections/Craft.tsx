import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import SpotCard from "../SpotCard";

export default function Craft() {
  return (
    <section id="craft" className="sec craft">
      <Reveal className="wrap">
        <SectionHead kicker="03 — Craft" title="Built around you, not around a template." />
        <div className="cards">
          <SpotCard>
            <div className="ico i-stack" aria-hidden="true"><i /><i /><i /></div>
            <h3>Custom Next.js apps</h3>
            <p>App Router, server components and a design system that matches your brand.</p>
          </SpotCard>
          <SpotCard>
            <div className="ico i-cal" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
            <h3>Booking systems</h3>
            <p>Calendars, confirmations and an admin view your team actually enjoys using.</p>
          </SpotCard>
          <SpotCard>
            <div className="ico i-eq" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <h3>Admin panels</h3>
            <p>Manage content, customers and orders without touching code.</p>
          </SpotCard>
          <SpotCard>
            <div className="ico i-gauge" aria-hidden="true"><b /></div>
            <h3>Speed and SEO</h3>
            <p>Fast pages, clean markup and structured data, so people and search engines find you.</p>
          </SpotCard>
        </div>
      </Reveal>
    </section>
  );
}
