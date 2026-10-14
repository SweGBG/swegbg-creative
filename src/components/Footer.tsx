"use client";

import { useLang } from "@/lib/LangContext";
import { site } from "@/lib/site";
import { landings, landingPath, landingUi } from "@/lib/landing";

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="foot">
      <nav className="wrap foot-nav" aria-label={landingUi[lang].footerTitle}>
        <b>{landingUi[lang].footerTitle}</b>
        <ul>
          {landings.map((l) => (
            <li key={l.id}>
              <a href={landingPath(l, lang)}>{l[lang].name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="wrap foot-in">
        <span className="foot-brand">
          SWEGBG <b>AGENCY</b>
        </span>
        <span>{t.footer}</span>
        <span className="foot-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </span>
      </div>
    </footer>
  );
}
