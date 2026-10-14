"use client";

import { useEffect, useRef, useState } from "react";
import { apps, projects, FEATURED_COUNT, type App, type Project } from "@/lib/site";
import { useLang } from "@/lib/LangContext";
import { useContact } from "./ContactDialog";
import type { Dict, Lang } from "@/lib/i18n";
import MorphGallery from "./ui/morph-gallery";

const host = (u: string) => new URL(u).host;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Big card for the featured (first) project. */
function Featured({ p, lang, w, flip }: { p: Project; lang: Lang; w: Dict["work"]; flip?: boolean }) {
  return (
    <article className={flip ? "proj proj-flip" : "proj"} style={{ ["--bg" as string]: (p.theme ?? ["#0c0a09", "#ff5a1f"])[0], ["--ac" as string]: (p.theme ?? ["#0c0a09", "#ff5a1f"])[1] }}>
      <a className="proj-shot" href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${w.open} ${p.name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p.image ? <img src={p.image} alt={`${p.name} ${w.preview}`} width="1100" height="688" /> : null}
        <span className="proj-live"><i /> {w.live}</span>
      </a>
      <div className="proj-body">
        <p className="proj-kind">{p.kind[lang]}</p>
        <h3>{p.name}</h3>
        <p className="proj-blurb">{p.blurb[lang]}</p>
        <ul className="proj-tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="proj-links">
          <a className="pbtn pbtn-main" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
            <span>{w.visit} {p.name}</span>
            <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

function Download() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19.5h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Desktop app card: same big layout as the featured card, plus a "3-in-1" feature list. */
function AppCard({ a, lang, w }: { a: App; lang: Lang; w: Dict["work"] }) {
  return (
    <article className="proj app" style={{ ["--bg" as string]: a.theme[0], ["--ac" as string]: a.theme[1] }}>
      <a className="proj-shot app-shot" href={a.downloadUrl} aria-label={`${w.download}: ${a.name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image} alt={`${a.name} ${w.preview}`} width="1280" height="680" loading="lazy" />
        <span className="proj-live app-pill"><i /> {w.appBadge}</span>
      </a>
      <div className="proj-body">
        <p className="proj-kind">{a.kind[lang]}</p>
        <h3>{a.name}</h3>
        <p className="proj-blurb">{a.blurb[lang]}</p>
        <ol className="app-feats">
          {a.features.map((f, i) => (
            <li key={i} style={{ ["--i" as string]: i }}>
              <b>{f.t[lang]}</b>
              <span>{f.d[lang]}</span>
            </li>
          ))}
        </ol>
        <ul className="proj-tags">
          {a.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="proj-links">
          <a className="pbtn pbtn-main pbtn-dl" href={a.downloadUrl}>
            <span>{w.download}</span>
            <Download />
          </a>
        </div>
        <p className="app-note">{w.dlNote}</p>
      </div>
    </article>
  );
}

/** Mini card: a tiny browser window with the site inside. */
function Mini({ p, i, live, lang, w, cls = "" }: { p: Project; i: number; live: boolean; lang: Lang; w: Dict["work"]; cls?: string }) {
  const [bg, ac] = p.theme ?? ["#0d1320", "#f0b347"];
  const fit = p.image ? p.imageFit ?? "shot" : "live";
  return (
    <article className={`mini${cls}`} style={{ ["--bg" as string]: bg, ["--ac" as string]: ac, ["--i" as string]: i }}>
      <a className="mini-frame" href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${w.open} ${p.name} (${host(p.liveUrl)})`}>
        <span className="mini-bar" aria-hidden="true">
          <i /><i /><i />
          <span>{host(p.liveUrl)}</span>
        </span>
        <span className={`mini-view ${fit}`}>
          {fit === "live" ? (
            <>
              <span className="mini-ph" aria-hidden="true">{p.name.charAt(0)}</span>
              {live ? (
                <iframe
                  src={p.liveUrl}
                  title={`${p.name} ${w.preview}`}
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={(e) => e.currentTarget.classList.add("on")}
                />
              ) : null}
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt="" loading="lazy" />
          )}
          <span className="mini-open" aria-hidden="true">
            {w.open} <Arrow />
          </span>
        </span>
      </a>
      <div className="mini-body">
        <div className="mini-top">
          <h4>{p.name}</h4>
          <span className="mini-badge">{w.badge}</span>
        </div>
        <p className="mini-kind">{p.kind[lang]}</p>
        <p className="mini-blurb">{p.blurb[lang]}</p>
        <ul className="mini-tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Gold dust that gathers into a materializing logo: start offset x/y and delay. */
const DUST: [string, string, string][] = [
  ["-180px", "-120px", "0s"], ["170px", "-140px", ".05s"], ["-220px", "40px", ".1s"], ["230px", "70px", ".02s"],
  ["-90px", "170px", ".12s"], ["110px", "180px", ".08s"], ["-40px", "-200px", ".15s"], ["60px", "-190px", ".04s"],
  ["-260px", "-30px", ".09s"], ["270px", "-20px", ".13s"], ["-150px", "150px", ".06s"], ["160px", "120px", ".11s"],
];

/** The featured demos as a morphing gallery: screenshots dissolve into each other, the pitch sits in a panel below. */
function Showcase({ cards, lang, w }: { cards: Project[]; lang: Lang; w: Dict["work"] }) {
  const shown = cards.filter((p) => p.image);
  // A logo project shows its dark stage in the gallery; the logo itself materializes on top.
  const items = shown.map((p) => ({ src: (p.logo ? p.stage : p.image) ?? (p.image as string), thumb: p.image, alt: p.name }));
  const [i, setI] = useState(0);
  const p = shown[i];
  if (!p) return null;
  const ac = (p.theme ?? ["#0c0a09", "#f0b347"])[1];
  return (
    <div className="mg-wrap" style={{ ["--ac" as string]: ac }}>
      <MorphGallery
        items={items}
        index={i}
        onIndexChange={setI}
        height="calc((min(980px, 100vw - 1.5rem) - 2 * clamp(1.1rem, 3vw, 2rem) - 2px) * 0.625)"
        autoplay={6500}
        duration={1400}
        thumbnails={false}
        labels={{ region: w.title, prev: w.prev, next: w.next, show: w.open }}
        overlay={(k) => {
          const q = shown[k];
          if (!q?.logo) return null;
          return (
            <div className="mg-logo">
              <span className="mg-dust" aria-hidden="true">
                {DUST.map((d, n) => (
                  <i key={n} style={{ ["--x" as string]: d[0], ["--y" as string]: d[1], ["--dl" as string]: d[2] }} />
                ))}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={q.logo} alt={q.name} />
            </div>
          );
        }}
      />
      <div className="mg-info" key={p.name}>
        <div className="mg-text">
          <p className="mg-kind">{p.kind[lang]}</p>
          <h3 className="mg-name">{p.name}</h3>
          <p className="mg-blurb">{p.blurb[lang]}</p>
          <ul className="mg-tags">
            {p.tags.slice(0, 5).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="mg-side">
          <div className="mg-cta">
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
              {w.visit} {p.name} <Arrow />
            </a>
            <small>{String(i + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}</small>
          </div>
          <ul className="mg-thumbs">
            {shown.map((q, k) => (
              <li key={q.name}>
                <button type="button" className={k === i ? "on" : ""} aria-current={k === i} aria-label={`${w.open} ${q.name}`} onClick={() => setI(k)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.image} alt="" width={72} height={45} loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** How many featured projects get big cards on phones (the rest join the mini cards). */
const MOBILE_BIG = 2;
const SUITS = ["\u2660", "\u2665", "\u2666", "\u2663"]; // ♠ ♥ ♦ ♣

/** The featured projects dealt as a fanned hand of playing cards. Picking a card shows it big below. */
function Hand({ cards, active, onPick, w, lang }: { cards: Project[]; active: number; onPick: (i: number) => void; w: Dict["work"]; lang: Lang }) {
  const mid = (cards.length - 1) / 2;
  return (
    <div className="hand-wrap">
      <div className="hand" role="tablist" aria-label={w.hand}>
        {cards.map((p, i) => {
          const [bg, ac] = p.theme ?? ["#0c0a09", "#ff5a1f"];
          const suit = SUITS[i % 4];
          const red = i % 4 === 1 || i % 4 === 2;
          return (
            <button
              key={p.name}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`pcard${active === i ? " on" : ""}${red ? " red" : ""}`}
              data-suit={suit}
              style={{ ["--o" as string]: i - mid, ["--i" as string]: i, ["--bg" as string]: bg, ["--ac" as string]: ac }}
              onClick={() => onPick(i)}
            >
              <span className="pc-corner tl" aria-hidden="true"><b>{String(i + 1).padStart(2, "0")}</b><i>{suit}</i></span>
              <span className="pc-face">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.image ? <img src={p.image} alt="" loading="lazy" /> : <span className="pc-ph">{p.name.charAt(0)}</span>}
              </span>
              <span className="pc-name">{p.name}</span>
              <span className="pc-kind">{p.kind[lang]}</span>
              <span className="pc-corner br" aria-hidden="true"><b>{String(i + 1).padStart(2, "0")}</b><i>{suit}</i></span>
            </button>
          );
        })}
      </div>
      <p className="hand-hint">{w.hand}</p>
    </div>
  );
}

/** "See the craft" panel: native <dialog> (focus trap, Esc and inert background come for free). */
export default function WorkDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { lang, t } = useLang();
  const w = t.work;
  const openContact = useContact();
  // Live mini-previews load whole websites: skip them on phones to keep the panel smooth.
  const [canLive, setCanLive] = useState(false);
  useEffect(() => {
    setCanLive(!matchMedia("(max-width: 760px), (pointer: coarse)").matches);
  }, []);
  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="work"
      aria-labelledby="work-title"
      onClose={() => {
        document.body.style.overflow = "";
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="work-in">
        <header className="work-head">
          <div>
            <p className="work-kick">{w.kicker}</p>
            <h2 id="work-title">{w.title}</h2>
          </div>
          <button className="work-x" onClick={onClose} aria-label={w.close}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {featured.length ? (
          <>
            {/* PREVIEW: the featured demos in a morphing gallery (desktop and phones) */}
            <Showcase cards={featured} lang={lang} w={w} />
          </>
        ) : null}

        {rest.length ? (
          <>
            <div className="work-bar">
              <h3>{w.more}</h3>
              <small className="work-count">{rest.length}</small>
            </div>
            <div className="minis">
              {rest.map((p, i) => (
                <Mini key={p.name} p={p} i={i} live={open && canLive} lang={lang} w={w} />
              ))}
            </div>
          </>
        ) : null}

        {apps.length ? (
          <>
            <div className="work-bar">
              <h3>{w.apps}</h3>
              <small className="work-count">{apps.length}</small>
            </div>
            {apps.map((a) => (
              <AppCard key={a.name} a={a} lang={lang} w={w} />
            ))}
          </>
        ) : null}

        <div className="work-own">
          <span>{w.own}</span>
          <button
            type="button"
            className="pbtn pbtn-main"
            onClick={() => {
              onClose();
              openContact();
            }}
          >
            <span>{w.ownBtn}</span>
            <Arrow />
          </button>
        </div>
      </div>
    </dialog>
  );
}
