"use client";

import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { useLang } from "@/lib/LangContext";
import { useContact } from "../ContactDialog";
import HexThreads from "../HexThreads";

/*
  "Your website here": the terminal builds a site for the visitor's own business,
  and the browser next to it assembles that site piece by piece. Pure CSS animation.
*/
type Line = { text: string; kind: "cmd" | "out" };
const LINES: Line[] = [
  { kind: "cmd", text: "npx create-next-app@latest your-business" },
  { kind: "out", text: "✔ TypeScript · App Router · src/" },
  { kind: "cmd", text: "npm run build" },
  { kind: "out", text: "✔ Compiled successfully" },
  { kind: "cmd", text: "git push origin main" },
  { kind: "out", text: "✔ Live on your-business.se" },
];
const TREE = ["your-business/", "app/page.tsx", "components/Hero.tsx", "components/Booking.tsx", "components/Contact.tsx", "lib/site.ts"];

export default function Build() {
  const { t: tx } = useLang();
  const b = tx.build;
  const openContact = useContact();
  // Each command is "typed" one after another; output lines fade in after the command above them.
  let t = 0.4;
  const rows = LINES.map((l) => {
    const n = l.text.length + 2; // "$ " prefix
    const row = { ...l, n, d: t };
    t += l.kind === "cmd" ? n * 0.045 + 0.35 : 0.45;
    return row;
  });
  const done = rows[rows.length - 1].d; // the "Live on …" line

  return (
    <section id="build" className="sec build">
      <div className="hex" aria-hidden="true">
        <i />
        <HexThreads />
      </div>
      <Reveal className="wrap">
        <SectionHead
          kicker={b.kicker}
          title={b.title}
          sub={b.sub}
        />
        <div className="build-grid">
          <div className="term" role="img" aria-label={b.termAria}>
            <div className="term-bar">
              <i /> <i /> <i />
              <span>~/your-business</span>
            </div>
            <pre className="term-body" aria-hidden="true">
              {rows.map((r, i) =>
                r.kind === "cmd" ? (
                  <span key={i} className="tl" style={{ ["--n" as string]: r.n, ["--d" as string]: `${r.d.toFixed(2)}s` }}>
                    <b>$</b> {r.text}
                  </span>
                ) : (
                  <span key={i} className="tl out" style={{ ["--d" as string]: `${r.d.toFixed(2)}s` }}>
                    {r.text}
                  </span>
                ),
              )}
              <span className="cursor" style={{ ["--d" as string]: `${t.toFixed(2)}s` }} />
            </pre>
          </div>

          <div className="build-side">
            <ul className="tree" aria-label={b.treeAria}>
              {TREE.map((f, i) => (
                <li key={f} style={{ ["--i" as string]: i }}>
                  {f}
                </li>
              ))}
            </ul>

            {/* A placeholder site that assembles itself while the terminal works, then goes live. */}
            <figure className="preview yb" aria-label={b.pvAria} style={{ ["--done" as string]: `${done.toFixed(2)}s` }}>
              <div className="pv-bar" aria-hidden="true">
                <i /><i /><i />
                <span className="pv-url">
                  <em className="dev">localhost:3000</em>
                  <em className="prod">your-business.se</em>
                </span>
                <span className="pv-live">Live</span>
              </div>
              <div className="yb-page" aria-hidden="true">
                <div className="yb-nav" style={{ ["--s" as string]: 0 }}>
                  <b><span className="yb-logo" />{b.brand}</b>
                  <span>{b.nav[0]}</span>
                  <span>{b.nav[1]}</span>
                  <span className="yb-pill">{b.nav[2]}</span>
                </div>
                <div className="yb-hero" style={{ ["--s" as string]: 1 }}>
                  <small>{b.eyebrow}</small>
                  <strong>
                    {b.heading}{" "}
                    <span className="yb-rot">
                      <span>
                        {b.kinds.map((k) => (
                          <span key={k}>{k}</span>
                        ))}
                        <span>{b.kinds[0]}</span>
                      </span>
                    </span>
                  </strong>
                  <span className="yb-cta">{b.cta}</span>
                </div>
                <div className="yb-feats">
                  {b.feats.map((f, i) => (
                    <div key={i} className="yb-feat" style={{ ["--s" as string]: 2 + i * 0.35 }}>
                      <span className="yb-ic" />
                      <b>{f.t}</b>
                      <small>{f.d}</small>
                    </div>
                  ))}
                </div>
              </div>
              <figcaption className="pv-cap">
                <span>
                  <b>{b.capTitle}</b>
                  <small>{b.capSub}</small>
                </span>
                <a href="#contact" onClick={(e) => { e.preventDefault(); openContact(); }}>
                  {b.capLink} <span aria-hidden="true">→</span>
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
