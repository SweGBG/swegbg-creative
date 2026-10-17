"use client";
import { site } from "@/lib/site";
import { useLang } from "@/lib/LangContext";

/** "SweGBG Lab" in the nav: a small hex badge with a live dot, opens the Lab (own tools to play with). */
export default function LabButton({ mobile = false }: { mobile?: boolean }) {
  const { t } = useLang();
  return (
    <a className={mobile ? "lab-btn lab-m" : "lab-btn"} href={site.lab} target="_blank" rel="noopener" title={t.nav.labTitle}>
      <span className="lab-hex" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M9 3h6M10 3v6l-5 9a2 2 0 001.8 3h10.4a2 2 0 001.8-3l-5-9V3" /><path d="M7.5 15h9" /></svg>
      </span>
      <span className="lab-txt">{mobile ? t.nav.labTry : t.nav.lab}</span>
      <span className="lab-dot" aria-hidden="true" />
    </a>
  );
}
