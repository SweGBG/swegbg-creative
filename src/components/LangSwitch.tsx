"use client";

import { useLang } from "@/lib/LangContext";
import type { Lang } from "@/lib/i18n";

export function FlagSV() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
      <rect width="20" height="14" fill="#006AA7" />
      <rect x="6" width="3" height="14" fill="#FECC02" />
      <rect y="5.5" width="20" height="3" fill="#FECC02" />
    </svg>
  );
}

export function FlagEN() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
      <rect width="20" height="14" fill="#00247D" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#fff" strokeWidth="2.6" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#CF142B" strokeWidth="1.2" />
      <path d="M10,0 V14 M0,7 H20" stroke="#fff" strokeWidth="4.6" />
      <path d="M10,0 V14 M0,7 H20" stroke="#CF142B" strokeWidth="2.4" />
    </svg>
  );
}

const OPTS: { id: Lang; label: string; Flag: () => React.JSX.Element }[] = [
  { id: "sv", label: "SV", Flag: FlagSV },
  { id: "en", label: "EN", Flag: FlagEN },
];

/** SV / EN pill: flags plus code, a gold thumb slides to the active language. */
export default function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang" role="group" aria-label="Språk / Language" data-lang={lang}>
      <span className="lang-thumb" aria-hidden="true" />
      {OPTS.map(({ id, label, Flag }) => (
        <button
          key={id}
          type="button"
          lang={id}
          aria-pressed={lang === id}
          aria-label={id === "sv" ? "Svenska" : "English"}
          onClick={() => setLang(id)}
        >
          <Flag />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

/** Same pill as LangSwitch, but as links to the page's counterpart in the other language (search landing pages). */
export function LangLinks({ lang, sv, en }: { lang: Lang; sv: string; en: string }) {
  const opts = [
    { id: "sv" as const, label: "SV", href: sv, Flag: FlagSV, name: "Svenska" },
    { id: "en" as const, label: "EN", href: en, Flag: FlagEN, name: "English" },
  ];
  return (
    <div className="lang" role="group" aria-label="Språk / Language" data-lang={lang}>
      <span className="lang-thumb" aria-hidden="true" />
      {opts.map(({ id, label, href, Flag, name }) => (
        <a key={id} href={href} hrefLang={id === "sv" ? "sv-SE" : "en-US"} lang={id} aria-label={name} aria-current={lang === id ? "page" : undefined}>
          <Flag />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
