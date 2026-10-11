"use client";

import { useEffect, useRef, useState } from "react";
import { apps, projects, FEATURED_COUNT, type App, type Project } from "@/lib/site";
import { useLang } from "@/lib/LangContext";
import { useContact } from "./ContactDialog";
import type { Dict, Lang } from "@/lib/i18n";

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
function Mini({ p, i, live, lang, w }: { p: Project; i: number; live: boolean; lang: Lang; w: Dict["work"] }) {
  const [bg, ac] = p.theme ?? ["#0d1320", "#f0b347"];
  const fit = p.image ? p.imageFit ?? "shot" : "live";
  return (
    <article className="mini" style={{ ["--bg" as string]: bg, ["--ac" as string]: ac, ["--i" as string]: i }}>
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
          <div className="projs">
            {featured.map((p, i) => (
              <Featured key={p.name} p={p} lang={lang} w={w} flip={i % 2 === 1} />
            ))}
          </div>
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
