"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import WorkDialog from "./WorkDialog";
import LangSwitch from "./LangSwitch";
import { useLang } from "@/lib/LangContext";
import { useContact } from "./ContactDialog";

/*
  Day/night hero: a sun photo sets, a moon photo rises (25 s loop, pure CSS).
  Scroll progress is eased in JS and written straight onto ~10 elements (no inherited CSS variable),
  which keeps it smooth on phones. Never put the scroll value in React state.
*/
const SUN = { dy: -8, sc: 1, anchor: 0.2539, horizon: 0.52 };
const MOON = { dy: -25, sc: 0.55, anchor: 0.5924, maxY: 0.5, sideY: 0.4, sideX: 0.2 };
const TINTS = ["#fff", "#fff", "#fff", "#ffe9c8", "#cfe0ff"];

function Headline({ lines }: { lines: string[] }) {
  let i = 0;
  return (
    <h1 aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="h1line" aria-hidden="true">
          {line.split(" ").map((word, wi) => {
            const letters = word.split("").map((ch, k) => (
              <span key={k} className="l" style={{ ["--i" as string]: i + k }}>
                {ch}
              </span>
            ));
            i += word.length;
            // The very last word gets the old swegbg.com glitch on hover.
            const glitch = li === lines.length - 1 && wi === line.split(" ").length - 1;
            return (
              <Fragment key={wi}>
                {wi > 0 ? " " : null}
                <span className={glitch ? "w gl" : "w"} data-text={glitch ? word : undefined}>
                  {letters}
                </span>
              </Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function star(x: number, y: number, k: number, big: boolean) {
  const e = document.createElement("i");
  const sz = big ? 2.4 + Math.random() * 1.4 : 0.9 + Math.random() * 1.3;
  e.className = "st" + (k % 4 === 0 ? " tw" : "");
  e.style.cssText =
    `left:${(x * 100).toFixed(2)}%;top:${(y * 100).toFixed(2)}%;width:${sz.toFixed(1)}px;height:${sz.toFixed(1)}px;` +
    `background:${TINTS[k % TINTS.length]};--t:${(2.5 + Math.random() * 4).toFixed(1)}s;--dl:-${(Math.random() * 6).toFixed(1)}s` +
    (big ? ";box-shadow:0 0 6px 1px rgba(255,255,255,.6)" : "");
  return e;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [work, setWork] = useState(false);
  const { t } = useLang();
  const openContact = useContact();

  useEffect(() => {
    const hero = root.current;
    if (!hero) return;
    const q = <T extends HTMLElement>(s: string) => hero.querySelector(s) as T;
    const bg = q(".hero-bg"), shade = q(".shade"), sun = q(".sunbox"), moon = q(".moonbox"),
      body = q(".hero-body"), h1 = q("h1"), d2 = q(".dusk2"), fx = q("#stars"), nfx = q("#nstars"),
      sh = q(".shoots"), scene = q(".scene"), ng = q(".ng");
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

    /* ---- stars (day band + night sky) ---- */
    const buildStars = () => {
      fx.textContent = "";
      nfx.textContent = "";
      const H = hero.offsetHeight, W = hero.offsetWidth;
      const h = scene.offsetHeight, top = SUN.anchor * (H - h);
      const y0 = Math.max(0, -top / h), y1 = Math.min(SUN.horizon, (-top + H) / h);
      if (y1 > y0) {
        const f = document.createDocumentFragment();
        const n = Math.round(60 + 50 * (W / 1440));
        for (let i = 0; i < n; i++) f.appendChild(star(Math.random(), y0 + Math.random() * (y1 - y0), i, Math.random() < 0.12));
        fx.appendChild(f);
      }
      const ngH = ng.offsetHeight, ntop = MOON.anchor * (H - ngH);
      const v0 = Math.max(0, -ntop / ngH), v1 = Math.min(1, (H - ntop) / ngH);
      const n2 = Math.round(70 + 60 * (W / 1440));
      const f2 = document.createDocumentFragment();
      let k = 0, t = 0;
      while (k < n2 && t < n2 * 8) {
        t++;
        const x = Math.random(), y = v0 + Math.random() * (v1 - v0);
        if (y > MOON.maxY || (y > MOON.sideY && (x < MOON.sideX || x > 1 - MOON.sideX))) continue;
        f2.appendChild(star(x, y, k, Math.random() < 0.1));
        k++;
      }
      nfx.appendChild(f2);
    };
    buildStars();
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(buildStars, 200);
    };
    addEventListener("resize", onResize);

    /* ---- eased scroll progress ---- */
    const c01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    let cur = 0, target = 0, last = 0, raf = 0, shown = -1, idle: ReturnType<typeof setTimeout>;
    const apply = (p: number) => {
      if (Math.abs(p - shown) < 0.0004) return;
      shown = p;
      const k = 1 - p * 0.62;
      bg.style.scale = String(1 + p * 0.35);
      shade.style.opacity = String(p * 0.22);
      sun.style.translate = `0 ${p * 28 + SUN.dy}%`;
      sun.style.scale = String(k * SUN.sc);
      moon.style.translate = `0 ${p * 28 + MOON.dy}%`;
      moon.style.scale = String(k * MOON.sc);
      body.style.translate = `0 ${-p * 60}px`;
      body.style.scale = String(1 - p * 0.04);
      body.style.opacity = String(Math.max(0, 1 - p * 1.4));
      h1.style.scale = `${1 + p * 0.22} 1`;
      d2.style.opacity = String(p * 0.9);
      fx.style.opacity = String(c01((p - 0.2) * 1.4));
      sh.style.opacity = String(c01((p - 0.4) * 2));
    };
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      cur += (target - cur) * (1 - Math.exp(-dt / 0.28));
      if (Math.abs(target - cur) < 0.0005) {
        cur = target;
        apply(cur);
        raf = 0;
        return;
      }
      apply(cur);
      raf = requestAnimationFrame(tick);
    };
    const update = () => {
      target = c01(scrollY / Math.max(innerHeight * 0.9, 1));
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
      hero.classList.add("scr");
      clearTimeout(idle);
      idle = setTimeout(() => hero.classList.remove("scr"), 180);
    };
    if (!reduce) {
      addEventListener("scroll", update, { passive: true });
      addEventListener("resize", update);
      update();
    }
    const io = new IntersectionObserver((e) => hero.classList.toggle("off", !e[0].isIntersecting));
    io.observe(hero);

    return () => {
      removeEventListener("resize", onResize);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      clearTimeout(idle);
      io.disconnect();
    };
  }, []);

  return (
    <header className="hero" ref={root}>
      <div className="hero-bg">
        <div className="scene">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sky" alt="" src="/img/sky-day.webp" />
          <div className="dusk" />
          <div className="dusk2" />
          <div className="sky-fx" id="stars" />
          <div className="sunbox">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/img/sun.webp" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="fg" alt="" src="/img/fg-day.webp" />
        </div>
        <div className="ng">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nsky" alt="" src="/img/sky-night.webp" />
          <div className="nstars" id="nstars" />
          <div className="moonbox">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/img/moon.webp" />
          </div>
        </div>
        <div className="ng ngf">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/img/fg-night.webp" />
        </div>
        <div className="shade" />
      </div>

      <div className="shoots" aria-hidden="true">
        <i className="shoot" style={{ left: "14vw", top: "9vh", ["--d" as string]: "7s", ["--dl" as string]: "1s" }} />
        <i className="shoot" style={{ left: "55vw", top: "5vh", ["--d" as string]: "9s", ["--dl" as string]: "4s" }} />
        <i className="shoot" style={{ left: "30vw", top: "24vh", ["--d" as string]: "11s", ["--dl" as string]: "7s" }} />
        <i className="shoot" style={{ left: "72vw", top: "17vh", ["--d" as string]: "8s", ["--dl" as string]: "2.5s" }} />
      </div>

      <div className="shoots nt" aria-hidden="true">
        <i className="shoot" style={{ left: "10vw", top: "12vh", ["--d" as string]: "4.5s", ["--dl" as string]: "2s" }} />
        <i className="shoot" style={{ left: "60vw", top: "8vh", ["--d" as string]: "6s", ["--dl" as string]: ".5s" }} />
        <i className="shoot" style={{ left: "35vw", top: "20vh", ["--d" as string]: "5s", ["--dl" as string]: "3.5s" }} />
        <i className="shoot" style={{ left: "75vw", top: "22vh", ["--d" as string]: "7s", ["--dl" as string]: "1s" }} />
      </div>

      <div className="wrap nav">
        <a className="logo" href="#" aria-label={site.brand}>
          <span className="logo-dot" aria-hidden="true" />
          <span>SWE<b>GBG</b></span>
        </a>
        <div className="nav-r">
          <LangSwitch />
          <a className="call" href="#contact" onClick={(e) => { e.preventDefault(); openContact(); }}>
            {t.nav.start}
          </a>
        </div>
      </div>

      <div className="wrap hero-body">
        <Headline key={t.hero.lines.join()} lines={t.hero.lines} />
        <p className="lead">{t.hero.lead}</p>
        <div className="btns">
          <a
            className="btn main"
            href="#build"
            onClick={(e) => {
              e.preventDefault();
              setWork(true);
            }}
          >
            {t.hero.craft}
          </a>
          <a className="btn ghost" href="#contact" onClick={(e) => { e.preventDefault(); openContact(); }}>
            {t.hero.talk}
          </a>
        </div>
      </div>
      <WorkDialog open={work} onClose={() => setWork(false)} />
    </header>
  );
}
