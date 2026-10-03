"use client";

import { useLang } from "@/lib/LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot">
      <div className="wrap">{t.footer}</div>
    </footer>
  );
}
