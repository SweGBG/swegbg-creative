"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "@/lib/LangContext";

/* ---------------- open/close from anywhere ---------------- */
const ContactCtx = createContext<() => void>(() => {});
/** Returns a function that opens the contact form. Use on every "Start a project" / "Let's talk". */
export const useContact = () => useContext(ContactCtx);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  return (
    <ContactCtx.Provider value={show}>
      {children}
      <ContactDialog open={open} onClose={() => setOpen(false)} />
    </ContactCtx.Provider>
  );
}

/* ---------------- the form ---------------- */
type Status = "idle" | "sending" | "sent" | "error" | "invalid";
const EMPTY = { namn: "", email: "", foretag: "", typ: "", meddelande: "", webbplats: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { lang, t } = useLang();
  const c = t.contact;
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
      setTimeout(() => d.querySelector<HTMLInputElement>("input[name=namn]")?.focus(), 350);
    }
    if (!open && d.open) d.close();
  }, [open]);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (status === "invalid" || status === "error") setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (form.webbplats) {
      // Honeypot filled in: almost certainly a bot. Pretend it worked.
      setStatus("sent");
      return;
    }
    if (!form.namn.trim() || !EMAIL.test(form.email.trim()) || !form.meddelande.trim()) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const close = () => {
    onClose();
    if (status === "sent") setStatus("idle");
  };

  return (
    <dialog
      ref={ref}
      className="contact"
      aria-labelledby="contact-title"
      onClose={() => {
        document.body.style.overflow = "";
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      <div className="ct-in">
        <div className="ct-hex" aria-hidden="true" />
        <button className="work-x ct-x" onClick={close} aria-label={c.close}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {status === "sent" ? (
          <div className="ct-done" role="status">
            <svg className="ct-check" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="24" pathLength="1" />
              <path d="M15 27l7 7 15-16" pathLength="1" />
            </svg>
            <h2 id="contact-title">{c.sentTitle}</h2>
            <p>{c.sentText}</p>
            <div className="ct-done-btns">
              <button className="btn main" onClick={close}>{c.done}</button>
              <button className="btn ghost" onClick={() => setStatus("idle")}>{c.again}</button>
            </div>
          </div>
        ) : (
          <form className="ct-form" onSubmit={submit} noValidate>
            <header className="ct-head">
              <p className="work-kick">{c.kicker}</p>
              <h2 id="contact-title">{c.title}</h2>
              <p className="ct-sub">{c.sub}</p>
            </header>

            <div className="ct-row">
              <label className="fld" style={{ ["--i" as string]: 0 }}>
                <input name="namn" value={form.namn} onChange={set("namn")} placeholder=" " autoComplete="name" required maxLength={120} />
                <span>{c.name}</span>
              </label>
              <label className="fld" style={{ ["--i" as string]: 1 }}>
                <input name="email" type="email" value={form.email} onChange={set("email")} placeholder=" " autoComplete="email" required maxLength={200} />
                <span>{c.email}</span>
              </label>
            </div>
            <label className="fld" style={{ ["--i" as string]: 2 }}>
              <input name="foretag" value={form.foretag} onChange={set("foretag")} placeholder=" " autoComplete="organization" maxLength={120} />
              <span>{c.company}</span>
            </label>

            <fieldset className="ct-types" style={{ ["--i" as string]: 3 }}>
              <legend>{c.typeLabel}</legend>
              <div>
                {c.types.map((ty) => (
                  <button
                    key={ty}
                    type="button"
                    aria-pressed={form.typ === ty}
                    onClick={() => setForm((f) => ({ ...f, typ: f.typ === ty ? "" : ty }))}
                  >
                    {ty}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="fld" style={{ ["--i" as string]: 4 }}>
              <textarea name="meddelande" rows={4} value={form.meddelande} onChange={set("meddelande")} placeholder=" " required maxLength={5000} />
              <span>{c.message}</span>
              <em className="fld-ph">{c.messagePh}</em>
            </label>

            {/* Honeypot: hidden from people, bots fill it in */}
            <label className="hp" aria-hidden="true">
              Webbplats
              <input name="webbplats" tabIndex={-1} autoComplete="off" value={form.webbplats} onChange={set("webbplats")} />
            </label>

            <div className="ct-foot" style={{ ["--i" as string]: 5 }}>
              <button className="btn main ct-send" type="submit" disabled={status === "sending"}>
                {status === "sending" ? <i className="spin" aria-hidden="true" /> : null}
                {status === "sending" ? c.sending : c.send}
                {status !== "sending" ? (
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </button>
              <p className="ct-note">{c.note}</p>
            </div>
            <p className={`ct-msg${status === "invalid" || status === "error" ? " on" : ""}`} role="alert">
              {status === "invalid" ? c.invalid : status === "error" ? c.error : ""}
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
