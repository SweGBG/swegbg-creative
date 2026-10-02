import Reveal from "../Reveal";
import SectionHead from "../SectionHead";

type Line = { text: string; kind: "cmd" | "out" };
const LINES: Line[] = [
  { kind: "cmd", text: "npx create-next-app@latest studio" },
  { kind: "out", text: "✔ TypeScript · App Router · src/ directory" },
  { kind: "cmd", text: "npm run dev" },
  { kind: "out", text: "▲ Next.js is ready on localhost:3000" },
  { kind: "cmd", text: "git push origin main" },
  { kind: "out", text: "✔ Live in production" },
];

const TREE = ["src/", "app/page.tsx", "app/layout.tsx", "components/Hero.tsx", "components/Booking.tsx", "lib/site.ts"];

export default function Build() {
  // Each command is "typed" one after another; output lines fade in after the command above them.
  let t = 0.4;
  const rows = LINES.map((l) => {
    const n = l.text.length + 2; // "$ " prefix
    const row = { ...l, n, d: t };
    t += l.kind === "cmd" ? n * 0.045 + 0.35 : 0.45;
    return row;
  });

  return (
    <section id="build" className="sec build">
      <Reveal className="wrap">
        <SectionHead
          kicker="01 — Build"
          title="Custom Next.js, typed out line by line."
          sub="No templates and no page builders. Every route, component and animation is written for your idea."
        />
        <div className="build-grid">
          <div className="term" role="img" aria-label="Terminal showing a Next.js project being created and deployed">
            <div className="term-bar">
              <i /> <i /> <i />
              <span>~/studio</span>
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
            <ul className="tree" aria-label="Project structure">
              {TREE.map((f, i) => (
                <li key={f} style={{ ["--i" as string]: i }}>
                  {f}
                </li>
              ))}
            </ul>
            <div className="preview" aria-hidden="true">
              <div className="pv-bar"><i /><i /><i /></div>
              <div className="pv-hero" />
              <div className="pv-row"><div /><div /><div /></div>
              <div className="pv-line" />
              <div className="pv-line s" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
