import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

const STEPS = [
  { t: "Commit", d: "Your code lives in your own GitHub repo." },
  { t: "Build", d: "Type-checked and compiled on every push." },
  { t: "Preview", d: "A shareable URL for every change." },
  { t: "Production", d: "One merge and it is live on your Vercel." },
];

export default function Pipeline() {
  return (
    <section id="ship" className="sec ship">
      <Reveal className="wrap">
        <SectionHead kicker="02 — Ship" title="From commit to live in one push." sub="A simple pipeline you own end to end, so launching stops being a big event." />
        <ol className="pipe">
          <li className="pipe-line" aria-hidden="true">
            <span className="pipe-fill" />
            <span className="pipe-pkg" />
          </li>
          {STEPS.map((s, i) => (
            <li key={s.t} className="pn" style={{ ["--i" as string]: i }}>
              <span className="dot" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
                </svg>
              </span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
