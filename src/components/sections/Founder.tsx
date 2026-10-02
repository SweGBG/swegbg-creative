import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const BARS = [
  { l: "Idea", h: 12 },
  { l: "MVP", h: 26 },
  { l: "Launch", h: 44 },
  { l: "Traction", h: 66 },
  { l: "Scale", h: 92 },
];

export default function Founder() {
  return (
    <section id="grow" className="sec grow">
      <Reveal className="wrap">
        <SectionHead
          kicker="04 — Grow"
          title="Built for founders, owned by founders."
          sub="You start lean, keep full control and add features as your business grows."
        />
        <div className="grow-grid">
          <div className="stats">
            <div className="stat" style={{ ["--to" as string]: 100 }}>
              <span className="num" aria-hidden="true" />
              <span className="sr">100</span>
              <small>Lighthouse score we aim for</small>
            </div>
            <div className="stat" style={{ ["--to" as string]: 0 }}>
              <span className="num" aria-hidden="true" />
              <span className="sr">0</span>
              <small>Lock-in. The code is yours</small>
            </div>
            <div className="stat" style={{ ["--to" as string]: 3 }}>
              <span className="num" aria-hidden="true" />
              <span className="sr">3</span>
              <small>Accounts you own: GitHub, Vercel, Supabase</small>
            </div>
          </div>
          <figure className="chart" aria-label="Illustrative growth chart">
            <div className="bars">
              {BARS.map((b, i) => (
                <div key={b.l} className="bar" style={{ ["--h" as string]: `${b.h}%`, ["--i" as string]: i }}>
                  <span>{b.l}</span>
                </div>
              ))}
            </div>
            <figcaption>Illustrative</figcaption>
          </figure>
        </div>
      </Reveal>
    </section>
  );
}
