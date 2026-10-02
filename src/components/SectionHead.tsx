import Words from "./Words";

export default function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <header className="shead">
      <p className="kicker">{kicker}</p>
      <h2>
        <Words text={title} />
      </h2>
      {sub ? <p className="sub">{sub}</p> : null}
    </header>
  );
}
