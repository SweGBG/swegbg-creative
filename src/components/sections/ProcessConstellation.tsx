"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";

/** 03 How we work: 3D constellation from first contact to the client's first order. three.js loads only when the section is near. */
export default function ProcessConstellation() {
  const { t, lang } = useLang();
  const f = t.process.flow;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    let cleanup: (() => void) | null = null;
    let cancelled = false;
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        import("@/lib/constellation")
          .then(({ mountConstellation }) => mountConstellation(stage, f, lang))
          .then((c) => (cancelled ? c() : (cleanup = c)))
          .catch(() => stage.classList.add("cst-fail"));
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(stage);
    return () => {
      cancelled = true;
      near.disconnect();
      cleanup?.();
    };
  }, [f, lang]);

  return (
    <div ref={ref} className="cst" role="img" aria-label={f.aria}>
      <div className="cst-hud" aria-hidden="true">
        <span>{f.hud}</span>
        <b className="cst-step">00 / 10</b>
      </div>
      <div className="cst-cap" aria-hidden="true">
        <small>{f.idleS}</small>
        <p>{f.idleP}</p>
      </div>
      <div className="cst-order">
        <div>
          <small>{f.orderS}</small>
          <b>{f.orderB}</b>
        </div>
        <div className="cst-r">
          <div className="cst-amt">0 kr</div>
          <button className="cst-again" type="button">{f.again}</button>
        </div>
      </div>
    </div>
  );
}
