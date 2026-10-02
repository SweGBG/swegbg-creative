const A = ["Next.js", "React", "TypeScript", "App Router", "Server Components", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel", "GitHub"];
const B = ["Core Web Vitals", "SEO", "Accessibility", "Booking flows", "Admin panels", "Design systems", "CSS animation", "Edge", "Analytics", "Your own infrastructure"];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className={`mq${reverse ? " rev" : ""}`}>
      <div className="mq-track">
        {list.map((t, i) => (
          <span key={i} className="chip" aria-hidden={i >= items.length ? true : undefined}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="sec mqs" aria-label="Tools and craft">
      <Row items={A} />
      <Row items={B} reverse />
    </section>
  );
}
