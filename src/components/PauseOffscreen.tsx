"use client";

import { useEffect } from "react";

/** Adds .off to sections that are out of view, so their CSS animations pause (saves battery and keeps scrolling smooth). */
export default function PauseOffscreen() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("main .sec");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("off", !e.isIntersecting)),
      { rootMargin: "120px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
