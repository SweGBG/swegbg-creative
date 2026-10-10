"use client";

import { useLang } from "@/lib/LangContext";
import { site } from "@/lib/site";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span className="foot-brand">
          SWEGBG <b>AGENCY</b>
        </span>
        <span>{t.footer}</span>
        <span className="foot-links">
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </span>
      </div>
    </footer>
  );
}
