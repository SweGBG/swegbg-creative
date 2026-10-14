"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "./i18n";
import { seo } from "./site";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx>({ lang: "sv", setLang: () => {}, t: dict.sv });

const KEY = "swegbg-lang";
const pathFor = (l: Lang) => (l === "sv" ? "/" : "/en");
/** Only the start page swaps language in place; the search landing pages link to their counterpart instead. */
const onHome = () => ["/", "/en"].includes(window.location.pathname.replace(/(.)\/$/, "$1"));

/**
 * The URL decides the language: "/" is Swedish, "/en" is English, so Google can
 * index both. Switching swaps the text instantly and updates the address bar
 * (no reload). A visitor who chose English earlier gets it again on "/".
 */
export function LangProvider({ children, initial = "sv" }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial);

  const syncUrl = (l: Lang) => {
    const target = pathFor(l);
    if (window.location.pathname.replace(/\/$/, "") !== target.replace(/\/$/, "")) {
      window.history.replaceState(window.history.state, "", target + window.location.search + window.location.hash);
    }
  };

  // Only on the Swedish start page: honour a saved English choice.
  useEffect(() => {
    if (initial !== "sv" || !onHome()) return;
    try {
      if (localStorage.getItem(KEY) === "en") {
        setLangState("en");
        syncUrl("en");
      }
    } catch {
      /* private mode etc. */
    }
  }, [initial]);

  // Keep <html lang> in sync for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang;
    if (onHome()) document.title = seo[lang].title;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (onHome()) syncUrl(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* noop */
    }
  };

  return <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
