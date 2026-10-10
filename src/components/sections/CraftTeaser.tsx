"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import WorkDialog from "../WorkDialog";
import { useLang } from "@/lib/LangContext";

/** 02 The craft: a short teaser; the demos themselves open in the "See the craft" panel. */
export default function CraftTeaser() {
  const { t } = useLang();
  const c = t.teaser;
  const [open, setOpen] = useState(false);
  return (
    <section id="hantverket" className="sec teaser">
      <Reveal className="wrap teaser-in">
        <div className="teaser-copy">
          <SectionHead kicker={c.kicker} title={c.title} sub={c.sub} />
          <button type="button" className="btn-line" onClick={() => setOpen(true)}>
            {c.btn} <span aria-hidden="true">→</span>
          </button>
        </div>
        <button type="button" className="teaser-stack" onClick={() => setOpen(true)} aria-label={c.aria}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/work-proviant.webp" alt="" width="1100" height="688" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/work-irondack.webp" alt="" width="1100" height="688" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/work-botanic.webp" alt="" width="1100" height="688" loading="lazy" />
        </button>
      </Reveal>
      <WorkDialog open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
