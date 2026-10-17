"use client";

import AgencyMark, { SwegbgMark } from "@/components/AgencyMark";
import { LangLinks } from "@/components/LangSwitch";
import LabButton from "@/components/LabButton";
import { useContact } from "@/components/ContactDialog";
import { useLang } from "@/lib/LangContext";
import type { Lang } from "@/lib/i18n";

/** Top bar on the search landing pages: logo home, SV/EN links to the counterpart page, contact. */
export default function LandingNav({ lang, sv, en }: { lang: Lang; sv: string; en: string }) {
  const { t } = useLang();
  const openContact = useContact();
  return (
    <div className="wrap nav">
      <a className="logo" href={lang === "sv" ? "/" : "/en"} aria-label="SweGBG Agency">
        <span className="logo-dot" aria-hidden="true" />
        <SwegbgMark className="logo-mark" />
        <AgencyMark className="logo-mark logo-agency" />
      </a>
      <div className="nav-r">
        <LabButton />
        <LangLinks lang={lang} sv={sv} en={en} />
        <a
          className="call"
          href="#kontakt"
          onClick={(e) => {
            e.preventDefault();
            openContact();
          }}
        >
          {t.nav.start}
        </a>
      </div>
    </div>
  );
}
