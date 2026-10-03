"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "./i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx>({ lang: "sv", setLang: () => {}, t: dict.sv });

const KEY = "swegbg-lang";

/** Swedish by default; the visitor's choice is remembered in localStorage. */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sv");

  // Read the saved choice after mount (avoids a hydration mismatch).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "sv" || saved === "en") setLangState(saved);
    } catch {
      /* private mode etc. */
    }
  }, []);

  // Keep <html lang> in sync for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* noop */
    }
  };

  return <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
