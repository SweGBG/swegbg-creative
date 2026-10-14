"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { useContact } from "./ContactDialog";

/** "Varför välja oss": the ownership pitch in a popup. Can start a project or jump to the full section. */
export default function WhyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useLang();
  const o = t.own;
  const w = t.why;
  const openContact = useContact();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
  }, [open]);

  const toSection = () => {
    onClose();
    setTimeout(() => document.getElementById("agande")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  return (
    <dialog
      ref={ref}
      className="contact why"
      aria-labelledby="why-title"
      onClose={() => {
        document.body.style.overflow = "";
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="ct-in">
        <div className="ct-hex" aria-hidden="true" />
        <button className="work-x ct-x" onClick={onClose} aria-label={t.contact.close}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <header className="ct-head">
          <p className="work-kick">{t.nav.why}</p>
          <h2 id="why-title">
            {o.title[0]} <span className="why-gold">{o.title[1]}</span>
          </h2>
          <p className="ct-sub">{o.sub}</p>
        </header>
        <div className="why-vs">
          <div className="own-col rent">
            <b>{o.rentT}</b>
            <ul>{o.rent.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="own-col mine">
            <b>{o.ownT}</b>
            <ul>{o.ownL.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
        <p className="own-motto why-motto">{o.motto}</p>
        <div className="ct-done-btns why-btns">
          <button
            className="btn main"
            onClick={() => {
              onClose();
              setTimeout(openContact, 120);
            }}
          >
            {t.nav.start}
          </button>
          <button className="btn ghost" onClick={toSection}>{w.more}</button>
        </div>
      </div>
    </dialog>
  );
}
