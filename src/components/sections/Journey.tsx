import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const CARDS = [
  { n: "01", t: "Idea", d: "We talk through what you want to build and who it is for. No jargon." },
  { n: "02", t: "Prototype", d: "A clickable first version fast, so you can feel it before it is finished." },
  { n: "03", t: "Launch", d: "Your domain, your hosting, your analytics. Live and measured." },
  { n: "04", t: "Grow", d: "New features, new pages, new ideas. The foundation is ready for them." },
];

export default function Journey() {
  return (
    <section id="journey" className="sec journey">
      <Reveal className="wrap">
        <SectionHead kicker="05 — Journey" title="From spark to launch." />
      </Reveal>
      <div className="wrap stack">
        {CARDS.map((c, i) => (
          <article key={c.n} className="sc" style={{ ["--i" as string]: i }}>
            <span className="big-n" aria-hidden="true">{c.n}</span>
            <div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
            <span className="orb" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
